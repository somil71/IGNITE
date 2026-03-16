const Registration = require('../models/Registration.model');
const Payment = require('../models/Payment.model');
const Event = require('../models/Event.model');
const User = require('../models/User.model');
const { sendRegistrationConfirmation } = require('../services/email.service');

/**
 * PHASE 2A: createRegistration - Complete Industry Grade Implementation
 */
exports.createRegistration = async (req, res, next) => {
  try {
    // STEP 1 — INPUT EXTRACTION AND SANITIZATION
    const {
      eventId, 
      teamName, 
      teamMembers = [], 
      participantDetails, 
      collegeType, 
      paymentProofUrl, 
      transactionId, 
      paymentTimestamp // ISO string from frontend (qrShownAt)
    } = req.body;
    
    const userId = req.user._id;

    // Sanitize team members
    const sanitizedMembers = teamMembers
      .filter(m => m.name && m.name.trim() !== '')
      .map(m => ({
        name: m.name.trim(),
        email: m.email.toLowerCase().trim(),
        phone: m.phone.trim(),
        college: m.college.trim()
      }));

    // STEP 2 — EVENT VALIDATION
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (!event.isActive) return res.status(400).json({ message: 'Event registration is closed' });
    
    if (event.registrationDeadline && new Date() > new Date(event.registrationDeadline)) {
      return res.status(400).json({ message: 'Registration deadline has passed' });
    }

    if (event.maxParticipants) {
      const confirmedCount = await Registration.countDocuments({ eventId, status: 'confirmed' });
      if (confirmedCount >= event.maxParticipants) {
        return res.status(400).json({ message: 'Event is full' });
      }
    }

    // STEP 3 — DUPLICATE REGISTRATION CHECK
    const existing = await Registration.findOne({ userId, eventId });
    if (existing) {
      return res.status(400).json({ 
        message: `You are already registered for this event. Check your dashboard for Registration ID: ${existing.registrationId}` 
      });
    }

    // STEP 4 — TEAM VALIDATION
    if (event.teamSize.max > 1) {
      if (!teamName || teamName.trim() === '') {
        return res.status(400).json({ message: 'Team name is required for this event.' });
      }

      const totalParticipants = sanitizedMembers.length + 1; // +1 for leader
      if (totalParticipants < event.teamSize.min) {
        return res.status(400).json({ 
          message: `This event requires a minimum of ${event.teamSize.min} participants. You have added ${totalParticipants}. Please add ${event.teamSize.min - totalParticipants} more member(s).` 
        });
      }

      // Check for duplicate emails
      const emails = [req.user.email.toLowerCase(), ...sanitizedMembers.map(m => m.email)];
      const uniqueEmails = new Set(emails);
      if (uniqueEmails.size !== emails.length) {
        return res.status(400).json({ message: 'Duplicate emails found in team roster.' });
      }
    }

    // STEP 5 — RESOLVE TEAM MEMBER USER ACCOUNTS
    const memberEmails = sanitizedMembers.map(m => m.email);
    const existingUsers = await User.find({ email: { $in: memberEmails } }).select('_id email');
    const userMap = {};
    existingUsers.forEach(u => userMap[u.email] = u._id);

    const processedMembers = sanitizedMembers.map(m => ({
      ...m,
      userId: userMap[m.email] || null,
      inviteStatus: userMap[m.email] ? 'joined' : 'pending'
    }));

    // STEP 6 — BUILD visibleToUsers ARRAY
    const visibleToUsers = [userId];
    processedMembers.forEach(m => {
      if (m.userId) visibleToUsers.push(m.userId);
    });
    const uniqueVisibility = [...new Set(visibleToUsers.map(id => id.toString()))];

    // STEP 7 — CREATE REGISTRATION DOCUMENT
    const registration = new Registration({
      userId,
      eventId,
      teamName: teamName?.trim(),
      teamMembers: processedMembers,
      visibleToUsers: uniqueVisibility,
      participantDetails,
      collegeType,
      status: 'pending'
    });
    await registration.save();

    // STEP 8 — UPDATE USER DOCUMENTS ATOMICALLY (Denormalization for fast dashboard)
    await User.updateMany(
      { _id: { $in: uniqueVisibility } },
      { $addToSet: { teamRegistrations: registration._id } }
    );

    // STEP 9 — CREATE PAYMENT DOCUMENT
    const qrShownAt = new Date(paymentTimestamp);
    const proofUploadedAt = new Date(); // Server time
    const diffMs = proofUploadedAt - qrShownAt;
    const minutesElapsed = Math.floor(diffMs / 60000);

    let paymentStatus = 'uploaded';
    let timeExceeded = false;
    let rejectionReason = '';

    if (minutesElapsed > 10) {
      paymentStatus = 'time_exceeded';
      timeExceeded = true;
      rejectionReason = `Payment proof was uploaded ${minutesElapsed} minutes after the QR was generated. The maximum allowed window is 10 minutes. Please contact ignite.techfest@iilm.edu with your registration ID ${registration.registrationId} to resolve this.`;
    }

    const payment = await Payment.create({
      userId,
      eventId,
      registrationId: registration._id,
      amount: event.registrationFee,
      paymentStatus,
      paymentProofUrl,
      transactionId,
      qrShownAt,
      proofUploadedAt,
      timeExceeded,
      minutesElapsed,
      rejectionReason
    });

    // STEP 10 — INCREMENT EVENT COUNTER (Background)
    Event.findByIdAndUpdate(eventId, { $inc: { registrationCount: 1 } }).catch(err => console.error('Count increment failed:', err));

    // STEP 11 — SEND CONFIRMATION EMAILS (Background)
    try {
      // Leader Email
      sendRegistrationConfirmation(
        req.user.email,
        req.user.name,
        event.title,
        registration.registrationId,
        event.registrationFee,
        paymentStatus === 'time_exceeded' ? 'WINDOW EXCEEDED — ACTION REQUIRED' : 'Uploaded — Pending Verification',
        teamName,
        processedMembers
      ).catch(err => console.error('Leader email failed:', err.message));

      // Notification to members
      processedMembers.forEach(member => {
        const { sendMemberNotification } = require('../services/email.service');
        sendMemberNotification(
          member.email,
          member.name,
          event.title,
          teamName,
          req.user.name,
          registration.registrationId
        ).catch(err => console.error(`Member email failed (${member.email}):`, err.message));
      });
    } catch (emailErr) {
      console.error('Email preparation failed:', emailErr.message);
    }

    // STEP 12 — BUILD AND RETURN RESPONSE
    res.status(201).json({
      success: true,
      registrationId: registration.registrationId,
      registration,
      payment,
      teamMembersLinked: processedMembers.filter(m => m.userId).length,
      warning: timeExceeded ? 'TIME_EXCEEDED' : undefined,
      message: timeExceeded 
        ? 'PAYMENT WINDOW EXCEEDED. Your registration is flagged for manual review.' 
        : 'Registration submitted successfully. Pending payment verification.'
    });

  } catch (err) {
    next(err);
  }
};

exports.getMyRegistrations = async (req, res, next) => {
  try {
    // Note: This is legacy. Dashboard controller now handles the main optimized fetch.
    const registrations = await Registration.find({ visibleToUsers: req.user._id })
      .populate('eventId', 'title slug category registrationFee whatsappGroupLink')
      .sort({ createdAt: -1 })
      .lean();

    const registrationIds = registrations.map(r => r._id);
    const payments = await Payment.find({ registrationId: { $in: registrationIds } }).lean();
    
    const paymentMap = {};
    payments.forEach(p => paymentMap[p.registrationId.toString()] = p);

    const withPayments = registrations.map(reg => ({
      ...reg,
      payment: paymentMap[reg._id.toString()] || null,
      isLeader: reg.userId.toString() === req.user._id.toString()
    }));

    res.json({ registrations: withPayments });
  } catch (err) {
    next(err);
  }
};

exports.getAllRegistrations = async (req, res, next) => {
  try {
    const { eventId, status, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (eventId) filter.eventId = eventId;
    if (status) filter.status = status;

    const registrations = await Registration.find(filter)
      .populate('userId', 'name email phone')
      .populate('eventId', 'title category')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    const total = await Registration.countDocuments(filter);
    res.json({ registrations, total, page: Number(page) });
  } catch (err) {
    next(err);
  }
};

exports.updateRegistrationStatus = async (req, res, next) => {
  try {
    const { status, adminNote } = req.body;
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status, adminNote },
      { new: true }
    );
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    res.json({ registration });
  } catch (err) {
    next(err);
  }
};

exports.exportRegistrationsCsv = async (req, res, next) => {
  try {
    const { eventId } = req.query;
    if (!eventId) return res.status(400).json({ message: 'eventId is required for export' });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const registrations = await Registration.find({ eventId })
      .populate('userId', 'name email phone')
      .sort({ createdAt: 1 })
      .lean();

    const csvRows = [
      ['Reg ID', 'Name', 'Email', 'Phone', 'College', 'Course', 'Year', 'Roll No', 'Status', 'Team Members', 'Registered At']
    ];

    for (const reg of registrations) {
      const teamStr = reg.teamMembers.map(m => m.name).join(' | ');
      csvRows.push([
        reg.registrationId,
        reg.participantDetails.name,
        reg.userId.email,
        reg.participantDetails.phone,
        reg.collegeType,
        reg.participantDetails.course,
        reg.participantDetails.year,
        reg.participantDetails.rollNumber,
        reg.status,
        teamStr,
        new Date(reg.createdAt).toLocaleString()
      ]);
    }

    const csvString = csvRows.map(row => 
      row.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${event.slug}_registrations.csv"`);
    res.send(csvString);
  } catch (err) {
    next(err);
  }
};

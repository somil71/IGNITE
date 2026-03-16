const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const emailBase = (content) => `
  <div style="background:#050508;padding:48px 40px;font-family:'Courier New',monospace;color:#F0F0F5;max-width:560px;margin:0 auto;border:1px solid rgba(255,107,0,0.2)">
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:32px">
      <div style="font-size:28px;font-weight:900;color:#FF6B00;letter-spacing:6px">IGNITE</div>
      <div style="font-size:10px;color:#8888AA;letter-spacing:3px;border-left:1px solid rgba(255,107,0,0.3);padding-left:16px">TECHFEST 2026<br>IILM UNIVERSITY</div>
    </div>
    ${content}
    <div style="margin-top:48px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);font-size:11px;color:#44445A">
      <div>ignite.techfest@iilm.edu</div>
      <div>IILM University, Greater Noida</div>
    </div>
  </div>
`;

exports.sendRegistrationConfirmation = async (email, name, eventTitle, registrationId, fee, paymentStatus, teamName = '', teamMembers = []) => {
  const isTimeExceeded = paymentStatus.includes('WINDOW EXCEEDED');
  
  const memberListHtml = teamMembers.length > 0 ? `
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.05)">
      <div style="font-size:10px;color:#8888AA;margin-bottom:8px">TEAM ROSTER</div>
      ${teamMembers.map(m => `<div style="font-size:11px;color:#F0F0F5;margin-bottom:4px">• ${m.name} (${m.email})</div>`).join('')}
    </div>
  ` : '';

  const html = emailBase(`
    <div style="margin-bottom:8px;font-size:11px;letter-spacing:3px;color:${isTimeExceeded ? '#FF3E3E' : '#8888AA'}">${isTimeExceeded ? 'ACTION REQUIRED' : 'REGISTRATION RECEIVED'}</div>
    <div style="font-size:22px;font-weight:700;color:#F0F0F5;margin:12px 0">Hello, ${name}</div>
    <div style="font-size:14px;color:#8888AA;margin-bottom:24px">Your application for <strong style="color:#FF6B00">${eventTitle}</strong> has been logged into our systems.</div>
    
    <div style="background:#1A1A28;border:1px solid rgba(255,107,0,0.2);padding:24px;margin-bottom:24px">
      <div style="font-size:10px;color:#8888AA;letter-spacing:2px;margin-bottom:4px uppercase">YOUR UNIQUE ID</div>
      <div style="font-size:28px;font-weight:900;color:#00D4FF;margin-bottom:16px">${registrationId}</div>
      
      <div style="font-size:12px;color:#F0F0F5;margin-bottom:4px">Team: <strong style="color:#FF6B00">${teamName || 'Solo Entry'}</strong></div>
      <div style="font-size:12px;color:#F0F0F5;margin-bottom:4px">Fee Paid: <strong>₹${fee}</strong></div>
      <div style="font-size:12px;color:${isTimeExceeded ? '#FF3E3E' : '#00FF94'}">Payment Status: <strong>${paymentStatus}</strong></div>
      
      ${memberListHtml}
    </div>

    ${isTimeExceeded ? `
      <div style="background:rgba(255,62,62,0.1);border:1px solid rgba(255,62,62,0.3);padding:16px;font-size:12px;color:#FFDEDE">
        <strong>STRICT NOTICE:</strong> Your payment proof was uploaded after the 10-minute window. This registration is flagged. Please reply to this email to resolve.
      </div>
    ` : `
      <div style="font-size:13px;color:#8888AA">Our financial team will manualy audit your transaction ID and screenshot. Once verified, you will receive a final confirmation.</div>
    `}
  `);

  await transporter.sendMail({
    from: `"IGNITE Techfest 2026" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `[${registrationId}] Registration Received — ${eventTitle} | IGNITE 2026`,
    html,
  });
};

exports.sendMemberNotification = async (email, name, eventTitle, teamName, leaderName, registrationId) => {
  const html = emailBase(`
    <div style="margin-bottom:8px;font-size:11px;letter-spacing:3px;color:#00D4FF">TEAM INVITATION</div>
    <div style="font-size:22px;font-weight:700;color:#F0F0F5;margin:12px 0">Hello, ${name}</div>
    <div style="font-size:14px;color:#8888AA;margin-bottom:16px">You have been added to a team for <strong style="color:#FF6B00">${eventTitle}</strong>.</div>
    
    <div style="background:#1A1A28;border:1px solid rgba(255,107,0,0.1);padding:20px;margin-bottom:24px">
      <div style="font-size:13px;color:#F0F0F5;margin-bottom:8px">Team Name: <strong style="color:#FF6B00">${teamName}</strong></div>
      <div style="font-size:13px;color:#F0F0F5;margin-bottom:8px">Team Leader: <strong>${leaderName}</strong></div>
      <div style="font-size:13px;color:#F0F0F5">Reference ID: <strong>${registrationId}</strong></div>
    </div>

    <div style="font-size:13px;color:#8888AA;line-height:1.6">
      If you already have an IGNITE account, this event will appear on your dashboard automatically. 
      If not, <a href="http://ignite-techfest.vercel.app/sign-up" style="color:#00D4FF;text-decoration:none;font-weight:bold">create an account here</a> 
      using this email address to track your competition status.
    </div>
  `);

  await transporter.sendMail({
    from: `"IGNITE Techfest 2026" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Team Invite: You've been added to ${teamName} for ${eventTitle}`,
    html,
  });
};

exports.sendPaymentVerified = async (email, name, eventTitle, registrationId) => {
  const html = emailBase(`
    <div style="font-size:11px;letter-spacing:3px;color:#00FF94;margin-bottom:8px">✓ PAYMENT VERIFIED</div>
    <div style="font-size:22px;font-weight:700;color:#F0F0F5;margin:12px 0">You're confirmed, ${name}!</div>
    <div style="font-size:14px;color:#8888AA">Your registration for <strong style="color:#FF6B00">${eventTitle}</strong> is now confirmed. See you at IGNITE 2026!</div>
    <div style="background:#1A1A28;border:1px solid rgba(255,107,0,0.2);padding:16px;margin-top:24px">
      <div style="font-size:12px;color:#8888AA">Registration ID: <strong style="color:#00D4FF">${registrationId || 'N/A'}</strong></div>
    </div>
  `);

  await transporter.sendMail({
    from: `"IGNITE Techfest 2026" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `✓ Payment Confirmed — ${eventTitle} | IGNITE 2026`,
    html,
  });
};

const events = [
  // ══════════════════ TECHNICAL (19) ══════════════════

  // EVENT 1: POSHAN LAB – REDEFINING NOURISHMENT
  {
    title: "Poshan Lab: New Product Development & No Fire Food", slug: "poshan-lab",
    category: "Technical", order: 1,
    description: "New Product Development (Food): Develop an innovative food product aligned with the theme Redefining Nourishment. Focus on nutrition, taste, shelf life, safety, and consumer acceptability. Teams present concept note, formulation, process flow chart, nutritional highlights, packaging idea, and market feasibility in 5-7 minutes.\n\nNo Fire Food: Prepare food without using any fire, gas stove, induction, microwave, or heating device. Allowed tools are mixing bowls, blender, whisk, cutlery, and chopping board. Prepare one main dish OR one snack plus one drink. No pre-cut or pre-cooked ingredients allowed. Provide a description card with dish name, ingredients, and nutritional benefits.",
    rules: ["New product must be innovative and aligned with theme 'Redefining Nourishment'", "Focus on nutrition, taste, shelf life, safety, and consumer acceptability", "Submit: product concept note, formulation details, process flow chart, nutritional highlights, packaging idea, market feasibility", "5–7 minutes for presentation. Bring samples if possible", "No Fire Food: prepare food WITHOUT any heating device (no stove, induction, microwave)", "Allowed tools: mixing bowls, blender, whisk, cutlery, chopping board", "Bring all raw materials yourself. No pre-cut or pre-cooked ingredients", "Prepare one main dish OR one snack + one drink with a description card"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 3, label: "Individual or Team of max 3 members" },
    registrationFee: 250, feeType: "per_team", // Using the highest fee as base, wait—the prompt said Event 1A fee is 250 per team, Event 1B is 100 per person. Since they are registered together under the same event right now, I will use per team 250 fee to represent the main event cost or 100 per person. Let's make it 250 per team as requested in Event 1A, or just use 250 per team for the whole. Let's use 250 per team.
    prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Dr. Sameer Ahmad" }, { name: "Dr. Bisma Jan" }],
    studentCoordinators: [{ name: "Varun Umrao", contact: "7565885678" }, { name: "Nitin Singh", contact: "7417178900" }]
  },

  // EVENT 3: BHARAT TECH TREASURE HUNT (moved up to match technical category order)
  {
    title: "Bharat Tech Treasure Hunt", slug: "bharat-tech-treasure-hunt",
    category: "Technical", order: 2,
    description: "Solve riddles and cryptic clues placed across the campus. Each clue solved correctly leads to the next location. Mobile phones not allowed except for capturing clue images. Do not tamper with or move clue items. First team to find the final treasure wins.",
    rules: ["Solve riddles and cryptic clues placed across campus", "Solve each clue correctly to proceed to next location", "Mobile phones NOT allowed (except for capturing clue images)", "Do not tamper with or move clue items", "First team to find the final treasure wins", "Cheating or misconduct = disqualification"],
    eligibility: "UG/PG students", 
    teamSize: { min: 4, max: 4, label: "Team of 4 members" },
    registrationFee: 100, feeType: "per_person",
    prize: { description: "Cash prizes + Certificates" },
    facultyCoordinators: [{ name: "Dr. Shikha Kumari" }, { name: "Dr. Garima Kulshrestha" }, { name: "Dr. Ajay Patwa" }],
    studentCoordinators: [{ name: "Jyotsana Singh", contact: "7052101209" }, { name: "Aanya Chaudhary", contact: "6396262309" }, { name: "Pritam Kumar", contact: "7645916446" }, { name: "Atulya Shrestha", contact: "7667014938" }, { name: "Kartik Gangwar", contact: "7985633452" }]
  },

  // EVENT 4: TECHNICAL POSTER PRESENTATION
  {
    title: "Technical Poster Presentation", slug: "technical-poster-presentation",
    category: "Technical", order: 3,
    description: "Present research posters on the theme Innovations for Viksit Bharat 2047: Technology for Sustainable Growth. Focus areas include AI and Data Science, Renewable Energy, Biotechnology and Healthcare, Sustainable Materials, Smart Cities and IoT, and Environmental and Water Management. Poster must be A1 size portrait format, printed and displayed physically.",
    rules: ["Theme: Innovations for Viksit Bharat 2047", "Focus areas: AI & Data Science, Renewable Energy, Biotechnology, Smart Cities & IoT, Environmental Management", "Poster structure: Title, Abstract (150–200 words), Introduction, Problem Statement, Methodology, Results, Innovation & Impact, Conclusion, References", "Size: A1 Portrait format. Must be printed and physically displayed", "Mounting material provided by organizers"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 3, label: "Individual or Team of max 3 members" },
    registrationFee: 100, feeType: "per_person",
    prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Dr. Monu" }, { name: "Dr. Duraivadivel" }],
    studentCoordinators: [{ name: "Shivam Rajput" }, { name: "Abhishek" }, { name: "Mahima" }, { name: "Shambhavi Vatsa" }]
  },

  // EVENT 5: THE WORLD WIRED – GLOBAL TECH QUIZ
  {
    title: "The World Wired – Global Tech Quiz", slug: "the-world-wired",
    category: "Technical", order: 4,
    description: "Global technology quiz exploring technological advancements across different countries. Questions cover major innovations from different countries and global tech leaders. Rounds include global tech awareness, country-technology matching, and identification of innovators or tech companies.",
    rules: ["Individual participation — teams formed by organizing committee", "Rounds: global tech awareness, country–technology matching, innovator identification", "Bonus rapid-fire may include translating technical terms into foreign languages", "Winner decided by cumulative scores across all rounds", "Ties resolved through sudden-death question"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 1, label: "Individual (teams formed by organizers)" },
    registrationFee: 100, feeType: "per_person",
    prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Prof. Ruchi Bobal" }, { name: "Ms. Toshika" }],
    studentCoordinators: [{ name: "Prachi Rautela", contact: "9971163009" }, { name: "Jyotsna Singh", contact: "7052101209" }]
  },

  // EVENT 8: BHARAT BOT EXPO
  {
    title: "Bharat Bot Expo", slug: "bharat-bot-expo",
    category: "Technical", order: 5,
    description: "Showcase self-made robots and drones built to perform practical utility tasks. Each team participates with only one robot or drone. Robots must be custom-built. Weight limit 10 kg. Robots should perform useful tasks such as cleaning, transporting objects, or assisting in daily activities.",
    rules: ["Each team may participate with only one robot or drone", "Custom-built only — pre-built allowed only with significant modifications", "Declare all functions and components before competition", "Weight limit: 10 kg maximum", "Tasks: cleaning, transporting, assisting in daily activities", "Autonomous and remote-controlled allowed; fully autonomous gets extra credit", "Judging: innovation, functionality, design, task efficiency"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 5, label: "Individual or Team of up to 5 members" },
    registrationFee: 500, feeType: "per_team",
    prize: { description: "Trophies + Certificates + Goodies" },
    facultyCoordinators: [{ name: "Dr. Akhilesh Kumar Mishra" }, { name: "Dr. Juhi Priyani" }],
    studentCoordinators: [{ name: "Espandan Bajapi", contact: "7417645614" }]
  },

  // EVENT 11: BHARAT INNOVATORS
  {
    title: "Bharat Innovator", slug: "bharat-innovator",
    category: "Technical", order: 6,
    description: "Startup idea competition promoting innovation and entrepreneurship. Present innovative startup ideas solving real-world problems contributing to India's technological development. Present problem statement, proposed solution, target market, technology used, and business model.",
    rules: ["Present innovative startup ideas solving real-world problems", "Cover: problem statement, proposed solution, target market, technology used, business model", "5–7 minutes presentation + short Q&A", "Ideas must be original — focus on innovation, practicality, and impact", "Submit presentation before competition day", "Judges' decisions are final"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 3, label: "Individual or Team of up to 3 members" },
    registrationFee: 100, feeType: "per_person",
    prize: { description: "Cash prizes + Mentorship + Certificates" },
    facultyCoordinators: [{ name: "Dr. Kirti Shukla" }, { name: "Mr. Harun Faridi" }],
    studentCoordinators: [{ name: "Shikhar Dixit", contact: "8864951603" }, { name: "Anubhav Sachan" }, { name: "Mahak Verma" }]
  },

  // EVENT 13: VIKSHIT BHARAT TECH QUIZ
  {
    title: "Vikshit Bharat Tech Quiz", slug: "vikshit-bharat-tech-quiz",
    category: "Technical", order: 7,
    description: "Quiz promoting awareness of emerging technologies and innovations shaping modern India. Highlights contributions of ISRO and other technological advancements in India. Formats include MCQs, visual rounds, audio rounds, and buzzer rounds.",
    rules: ["Team of 2 members", "Formats: MCQs, visual rounds, audio rounds, and buzzer rounds", "Mobile phones and smart devices NOT allowed during quiz", "Performance judged on accuracy, speed, and innovation", "Ties resolved by rapid-fire or tie-breaker round"],
    eligibility: "UG/PG students", 
    teamSize: { min: 2, max: 2, label: "Team of 2 members" },
    registrationFee: 50, feeType: "per_person",
    prize: { description: "Cash prizes + Certificates" },
    facultyCoordinators: [{ name: "Ms. Smriti Sethi" }, { name: "Dr. Saumya Pandey" }],
    studentCoordinators: [{ name: "Supriya Anand", contact: "9693457252" }, { name: "Nayan Jain", contact: "8709005770" }]
  },

  // EVENT 14: FLYING CONTROL RACING – DRONE RACING
  {
    title: "Flying Control Racing – Drone Racing", slug: "drone-racing",
    category: "Technical", order: 8,
    description: "Competitive drone racing testing control, manoeuvrability, speed, precision, and decision-making. Navigate a structured obstacle arena safely and efficiently. Only self-built drones allowed, maximum 450mm size, weight 250g to 2kg including battery.",
    rules: ["Self-built drones only — max 450mm size, weight 250g to 2kg", "Electric powered only, maximum 22.2V 6S Li-Po battery", "One official run per team to complete obstacle course in sequence", "Penalty: crash +20s, ground touch +20s, hand touch +10s, skip obstacle +30s", "Winner = lowest final time including penalties", "All participants must follow safety guidelines"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 4, label: "Individual or Team of up to 4 members" },
    registrationFee: 200, feeType: "per_person",
    prize: { description: "Trophies + Cash prizes + Certificates" },
    facultyCoordinators: [{ name: "Dr. Ankita Awasthi" }, { name: "Dr. Chandan Choubey" }, { name: "Dr. Sapna Chaudhary" }],
    studentCoordinators: [{ name: "Hitesh Kumar", contact: "8168673462" }, { name: "Prashant Kumar" }]
  },

  // EVENT 17: VIGYAN DARSHAN – MODEL PRESENTATION
  {
    title: "Vigyan Darshan – Model Presentation", slug: "vigyan-darshan",
    category: "Technical", order: 9,
    description: "Model presentation event where students showcase innovative scientific and technological models addressing real-world problems. Each team presents model and explains the concept.",
    rules: ["Present model and explain the concept behind it", "Maximum 5 minutes for presentation", "Judges evaluate strictly based on material presented", "Maintain discipline and respect toward all participants and judges"],
    eligibility: "UG/PG students", 
    teamSize: { min: 2, max: 5, label: "Team of minimum 2 members" },
    registrationFee: 300, feeType: "per_team",
    prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Shraddha Sharma" }, { name: "Dr. Vibhav Narayan" }, { name: "Dr. Kirti Nagarkoti" }],
    studentCoordinators: [{ name: "Harsh", contact: "7004237105" }, { name: "Kartik", contact: "9389530436" }]
  },

  // EVENT 19: PIXEL QUEST – PHOTOGRAPHY EVENT
  {
    title: "Pixel Quest – Photography Event", slug: "pixel-quest",
    category: "Technical", order: 10,
    description: "On-the-spot photography competition where participants capture creative images based on the given theme. Use any camera or smartphone. Submit in JPEG, PNG, or RAW format without watermarks or logos.",
    rules: ["On-the-spot photography — theme revealed at event", "Any camera or smartphone may be used", "Props, backgrounds, locations within competition area allowed", "Additional lighting setups NOT allowed", "Submit in JPEG, PNG, or RAW format — no watermarks or logos", "All photos must be original and captured during the fest", "Judging: creativity, composition, storytelling, technical quality, relevance to theme"],
    eligibility: "All participants", 
    teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 100, feeType: "per_person",
    prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Dr. Pinky Yadav" }, { name: "Dr. Niharika Choudhary" }],
    studentCoordinators: [{ name: "Praneet Kumar", contact: "9546543490" }, { name: "Kunal Chaudhary", contact: "9217107069" }]
  },

  // EVENT 21: CODE THE RHYTHM – AI MUSIC CHALLENGE
  {
    title: "Code the Rhythm – AI Music Challenge", slug: "code-the-rhythm",
    category: "Technical", order: 11,
    description: "AI-based music creation competition combining music, creativity, and artificial intelligence. Generate original music using AI tools based on lyrics or theme provided during the event. 30 minutes to create a short music track.",
    rules: ["Generate original music using AI tools based on provided lyrics/theme", "30 minutes to create a short music track", "Allowed genres: Rap, Indie Pop, EDM, Lo-fi, Classical", "Evaluation: creativity/originality, effective use of AI tools, musical composition and rhythm, overall track presentation"],
    eligibility: "UG/PG students", 
    teamSize: { min: 3, max: 3, label: "Team of 3 members" },
    registrationFee: 100, feeType: "per_person",
    prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Mr. Shantanu Bindewari" }, { name: "Mr. Mayank Saxena" }],
    studentCoordinators: [{ name: "Paramjivi Sutar", contact: "8639322043" }]
  },

  // EVENT 22: PROMPT-A-THON – AI ENGINEERING CHALLENGE
  {
    title: "Prompt-a-thon – AI Engineering Challenge", slug: "prompt-a-thon",
    category: "Technical", order: 12,
    description: "AI prompt engineering and concept showcase modelling. Present ideas and demonstrate how AI technologies influence various industries. Maximum 5 minutes speaking time per team. Bilingual presentations allowed.",
    rules: ["Maximum 5 minutes speaking time per team", "Presentations may be bilingual if required", "Reading from notes or using electronic devices during presentation NOT allowed", "Teams cannot change their position once presentation begins", "Audience may ask questions only AFTER the presentation", "Provide balanced and meaningful discussion on the topic"],
    eligibility: "UG/PG students", 
    teamSize: { min: 4, max: 4, label: "Team of 4 members" },
    registrationFee: 100, feeType: "per_person",
    prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Ms. Ankita Agarwal" }, { name: "Dr. Jaswinder" }],
    studentCoordinators: [{ name: "Adhikansh Gami", contact: "8178070325" }, { name: "Aanya Chaudhary", contact: "6396262309" }, { name: "Kashish Garg", contact: "8295155909" }, { name: "Nikita", contact: "9817111636" }, { name: "Siddharth Kaushik", contact: "7464824011" }]
  },

  // EVENT 26: BUILD FOR BHARAT HACKATHON 2026
  {
    title: "Build for Bharat Hackathon 2026", slug: "build-for-bharat-hackathon",
    category: "Technical", order: 13,
    description: "Hackathon innovating for a self-reliant and sustainable India. Choose problem statement from thematic tracks or propose own idea. 4-5 hours for prototype development.",
    rules: ["Teams of 2–4 members, interdisciplinary allowed", "Open to all university/college students", "Choose a problem statement from thematic tracks or propose your own", "4–5 hours for prototype development", "Internet access only for research/development", "Solutions must be original — plagiarism = disqualification", "Submit: functional prototype + 5–7 slide presentation", "Final presentation: 5–7 minutes + Q&A", "Evaluation: innovation, technical implementation, social impact, feasibility, presentation"],
    eligibility: "All college/university students", 
    teamSize: { min: 2, max: 4, label: "Team of up to 4 members" },
    registrationFee: 500, feeType: "per_team",
    prize: { description: "Cash prizes + Certificates + Mentorship" },
    facultyCoordinators: [{ name: "Dr. Sanjay Gorai" }, { name: "Dr. Pranav Shrivastava" }, { name: "Dr. Nidhi Rai" }],
    studentCoordinators: [{ name: "Shatakshi Bisht", contact: "8279878443" }, { name: "Priyanshi", contact: "7991556316" }]
  },

  // EVENT 27: ROBO RACE
  {
    title: "Robo Race", slug: "robo-racing",
    category: "Technical", order: 14,
    description: "Design a manually controlled robot to cover maximum distance in minimum time overcoming obstacles. Maximum dimensions 30x30 cm, maximum weight 5 kg, wired or wireless.",
    rules: ["Fastest and most balanced robot wins", "Robot specs: max 30×30 cm footprint, ≤5 kg, wired or wireless", "No readymade kits, pneumatic/hydraulic systems, or IC engines", "Penalties: hand touch = 10s added, off-course = 5s added", "False start resets counter, second false start disqualifies", "Rounds: Elimination time-based → Qualifier with min intervention → Final (track revealed on spot)"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 5, label: "Team of up to 5 members" },
    registrationFee: 500, feeType: "per_team",
    prize: { description: "Trophies + Certificates" },
    facultyCoordinators: [{ name: "Dr. Naseem Ahamad" }, { name: "Dr. Abhishek Kumar" }],
    studentCoordinators: [{ name: "Shashi Kumar Singh", contact: "9319187858" }, { name: "Ashnit Kumar Singh", contact: "7004738791" }, { name: "Jai", contact: "9868026723" }, { name: "Prashant Kumar", contact: "7017264142" }, { name: "Utkarsh Singh", contact: "6397644678" }, { name: "Yash", contact: "9821680313" }]
  },

  // EVENT 28: DEBUG X 2026
  {
    title: "Debug X 2026", slug: "debug-x",
    category: "Technical", order: 15,
    description: "Three-round coding competition: AI quiz, debugging challenge, and final coding round. Explore your skills in syntax correctness and logic efficiency.",
    rules: ["Round 1: AI-based quiz (MCQs on programming fundamentals + AI concepts)", "Round 2: Debugging challenge (fix errors in provided code snippets)", "Round 3: Final coding round (solve problem / complete program under time limit)", "Evaluation: accuracy, syntax correctness, logic, and time taken"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 50, feeType: "per_person",
    prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Dr. Sumit Kumar" }, { name: "Ms. Kanika Kansal" }],
    studentCoordinators: [{ name: "Ms. Sakshi Sharma", contact: "9105227798" }, { name: "Ms. Kalash Priya", contact: "8235524372" }, { name: "Mr. Suprit Dubey", contact: "8130545790" }]
  },

  // EVENT 29: FORENSIC FILES
  {
    title: "Forensic Files", slug: "forensic-files",
    category: "Technical", order: 16,
    description: "Crime scene simulation and reconstruction competition. Teams investigate, document and present findings in mock courtroom defense. Roles include Crime Scene Officer, Medical Practitioner, Investigating Officer, Forensic Expert, and Attorney.",
    rules: ["Teams reconstruct a simulated crime scene based on given scenario", "Roles: Crime Scene Officer, Medical Practitioner, Investigating Officer, Forensic Expert, Attorney", "Prepare: investigation reports, forensic observations, medical findings, legal perspectives", "Final round: mock courtroom presentation defending the case before judges", "Bring own materials for crime scene simulation", "Report at venue at least 30 minutes before event"],
    eligibility: "UG/PG students", 
    teamSize: { min: 2, max: 5, label: "Team of up to 5 members" },
    registrationFee: 500, feeType: "per_team",
    prize: { description: "Trophies + Cash prizes + Certificates" },
    facultyCoordinators: [{ name: "Dr. Rajeev Kumar" }, { name: "Dr. Ashlesha Bharadwaj" }, { name: "Mr. Aditya Saini" }],
    studentCoordinators: [{ name: "Mr. Badavath Rahul" }, { name: "Ms. Sakshi Negi" }, { name: "Mr. Satyam Jaiswal" }, { name: "Ms. Kashish" }]
  },

  // EVENT 31: ROBO MAZE
  {
    title: "Robo Maze", slug: "robo-maze",
    category: "Technical", order: 17,
    description: "Autonomous robot competition to navigate a maze using sensors and programming. Max size 25x25x25 cm, max weight 2 kg including battery. Must be fully autonomous using IR, Ultrasonic, Lidar, or other sensors.",
    rules: ["Build and program autonomous robot to reach finish point in minimum time", "Max size 25x25x25 cm, max weight 2 kg including battery", "Fully autonomous: IR, Ultrasonic, Lidar, or other sensors permitted", "Manual or remote control prohibited", "Each team gets 2 runs, best time considered", "Penalty: touching robot +10 sec, leaving maze path +20 sec", "Manual interference causes disqualification"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 4, label: "Team of 1-4 members" },
    registrationFee: 500, feeType: "per_team",
    prize: { description: "Trophies + Cash prizes" },
    facultyCoordinators: [{ name: "Prof. Kshama Pandey" }, { name: "Dr. Bidyut Mahato" }],
    studentCoordinators: [{ name: "Sandip Sarkar", contact: "7047732510" }, { name: "Abhinav Sisodiya" }, { name: "Manas Agarwal" }, { name: "Shradhey Upadhyay", contact: "8864994481" }]
  },

  // EVENT 32: ROBO SOCCER
  {
    title: "Robo Soccer", slug: "robo-soccer",
    category: "Technical", order: 18,
    description: "Robots play soccer in a designed arena testing control, teamwork, strategy, and decision-making. Build and operate manually controlled robot to score maximum goals.",
    rules: ["Build and operate manually controlled robot to score maximum goals", "Max size 30x30x30 cm, max weight 3 kg", "Must be manually controlled, autonomous robots prohibited", "Match duration 3 minutes", "Team with maximum goals wins, ties resolved by extra time or penalty shootout", "Penalty: robot leaving arena gives goal advantage to opponent", "Penalty: hand touching robot gives warning, intentional damage causes disqualification"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 4, label: "Team of 1-4 members" },
    registrationFee: 500, feeType: "per_team",
    prize: { description: "Trophies + Certificates" },
    facultyCoordinators: [{ name: "Dr. Juhi Priyani" }, { name: "Dr. Akhilesh Mishra" }],
    studentCoordinators: [{ name: "Priyanshu Rai" }, { name: "Krishna Garg" }, { name: "Tanya Kumari" }, { name: "Sachin Kumar" }]
  },

  // MECHANICAL SKETCH SHOWDOWN NOTE
  {
    title: "Mechanical Sketch Showdown", slug: "mechanical-sketch-showdown",
    category: "Technical", order: 19,
    description: "Guidelines TBA",
    rules: ["Guidelines TBA"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 2, label: "Individual or Team of 2" },
    registrationFee: 100, feeType: "per_person",
    prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [],
    studentCoordinators: []
  },


  // ══════════════════ CREATIVE & INNOVATION (5) ══════════════════

  // EVENT 6: TECH MEME WAR – CODEHUMOR
  {
    title: "Tech Meme War – CodeHumor", slug: "coded-humour",
    category: "Creative & Innovation", order: 1,
    description: "Creative competition combining technology and humor through tech-related memes. Create original memes about coding, AI, developer culture, college life, or emerging technologies.",
    rules: ["Create original memes related to coding, AI, developer culture, college life, or emerging tech", "Plagiarism = immediate disqualification", "Each team presents up to 3 memes in 3–5 minutes using laptops/projectors", "Content must be respectful — no offensive, political, discriminatory, or explicit material"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 3, label: "Individual or Team of 2-3 members" },
    registrationFee: 50, feeType: "per_person",
    prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Dr. Mudita" }, { name: "Mr. Anik Acharjee" }],
    studentCoordinators: [{ name: "Agrima Mishra", contact: "9266535208" }, { name: "Shatakshi Bisht", contact: "8279878443" }, { name: "Amitesh Kumar", contact: "6200235850" }]
  },

  // EVENT 10: MARKETING MANTRA
  {
    title: "Marketing Mantra", slug: "marketing-mantra",
    category: "Creative & Innovation", order: 2,
    description: "Present innovative marketing strategies using modern technology. Develop creative marketing campaigns using AI, data analytics, and digital media strategies.",
    rules: ["Develop creative marketing campaigns using AI, data analytics, and digital media", "Themes: AI in marketing, influencer marketing, consumer insights, digital transformation, customer engagement", "Maximum 5 minutes for presentation", "Audience questions only after presentation"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 4, label: "Individual or Team of 1-4 members" },
    registrationFee: 100, feeType: "per_person",
    prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Dr. Navneet Kumar Singh" }, { name: "Ms. Papiya Mukherjee" }],
    studentCoordinators: [{ name: "Aaush Panwar", contact: "9411019639" }, { name: "Priya", contact: "9555634442" }]
  },

  // EVENT 16: CINETECH COVER
  {
    title: "Cinetech Cover", slug: "cinetech-cover",
    category: "Creative & Innovation", order: 3,
    description: "Live competition where participants creatively reinterpret covers of movies, albums, or songs into artistic tech forms. Recreate selected cover artwork digitally during the live competition.",
    rules: ["Creatively reinterpret covers of movies, albums, or songs into artistic tech forms", "Artwork must be created digitally during the live competition", "Fixed time limit provided during the event", "Evaluation: creativity, originality, artistic technique, relevance to chosen piece"],
    eligibility: "All participants", 
    teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 100, feeType: "per_person",
    prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Mrs. Tanvi Sharma" }, { name: "Mr. Atul Yadav" }],
    studentCoordinators: [{ name: "Samarth Kushwaha" }, { name: "Rishabh Singh" }]
  },

  // EVENT 18: PENETRIX – WRITING FOR TECH REVOLUTION
  {
    title: "Penetrix – Writing for Tech Revolution", slug: "penetrix",
    category: "Creative & Innovation", order: 4,
    description: "Writing competition encouraging students to express innovative ideas about technology and its impact on society. Theme or prompt given at start of competition. 30 minutes to write submission.",
    rules: ["Theme/prompt given at start of competition", "30 minutes to write submission as article, blog, essay, or creative tech narrative", "Maximum 700–800 words", "Original work only — no plagiarism", "No mobile phones, AI tools, or external resources allowed during writing period"],
    eligibility: "UG/PG students", 
    teamSize: { min: 2, max: 2, label: "Team of 2 members" },
    registrationFee: 100, feeType: "per_person",
    prize: { description: "Certificates + Publication opportunity" },
    facultyCoordinators: [{ name: "Dr. Prakhar Consul" }, { name: "Ms. Prakriti Rao" }],
    studentCoordinators: [{ name: "Mohd Noorain", contact: "8467932050" }, { name: "Shivansh Mishra", contact: "8920519086" }]
  },

  // EVENT 24: TECH TRAIL
  {
    title: "Tech Trail", slug: "tech-trail",
    category: "Creative & Innovation", order: 5,
    description: "Innovation presentation event where participants showcase a technology-based idea along with the story behind its creation. Explain the real-life problem, present solution and technology used.",
    rules: ["First explain the real-life problem that inspired your innovation", "Then present solution and the technology used", "Use models, prototypes, animations, charts, or digital presentations", "3–5 minutes per team. Judges may ask 1–2 questions", "Ideas must be original", "Judging: creativity, innovation, clarity of storyline, technology used, problem-solving ability, presentation skills"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 3, label: "Individual or Team of 2-3 members" },
    registrationFee: 100, feeType: "per_person",
    prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Mrs. Komal Salgotra" }, { name: "Mr. Hilal Shah" }],
    studentCoordinators: [{ name: "Niharika Tiwari", contact: "8851553916" }, { name: "Priyanshu Kumari", contact: "8171689038" }]
  },

  // EVENT 30: DIGITAL STORYTELLING
  {
    title: "Digital Storytelling", slug: "digital-storytelling",
    category: "Creative & Innovation", order: 6,
    description: "Present original digital stories using multimedia including images, slides, audio, and video clips. Maximum 10 minutes per team. Story must have a clear theme, message, or social relevance.",
    rules: ["Present original digital stories using multimedia (images, slides, audio, video clips)", "Maximum 10 minutes per team", "Story must have a clear theme, message, or social relevance", "Report to venue 15 minutes before event begins", "Late entries not entertained", "Silence and decorum must be maintained"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 2, label: "Individual or Team of 2 members" },
    registrationFee: 100, feeType: "per_person",
    prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Dr. Manali Gupta" }, { name: "Ms. Jyoti Thakur" }],
    studentCoordinators: [{ name: "Garima", contact: "8619024436" }, { name: "Lakshya Gour", contact: "7300309562" }]
  },


  // ══════════════════ FUN (9) ══════════════════

  // EVENT 2: LEXTECH DEBATE 2026
  {
    title: "Lextech Debate 2026", slug: "lextech-debate",
    category: "Fun", order: 1,
    description: "Debate on the theme Technology in Law. Each team has two speakers, one for the motion and one against. Topics include AI regulation, cybersecurity and national sovereignty, data protection and privacy rights, digital evidence and criminal justice, platform liability and free speech.",
    rules: ["Theme: Technology in Law", "Each team: 2 speakers — one FOR the motion, one AGAINST", "Topics: AI regulation, cybersecurity, data protection, digital evidence, platform liability", "Evaluation: content and research depth, logical structure, rebuttal ability, delivery"],
    eligibility: "UG/PG students", 
    teamSize: { min: 2, max: 2, label: "Team of 2 members" },
    registrationFee: 200, feeType: "per_team",
    prize: { description: "Trophies + Certificates" },
    facultyCoordinators: [{ name: "Ms. Priyanka Gupta" }, { name: "Mr. Paras Yadav" }],
    studentCoordinators: [{ name: "Shivam Chaudhary" }, { name: "Harshini Yadav" }]
  },

  // EVENT 7: SQUID DANGAL 2.0
  {
    title: "Squid Dangal 2.0", slug: "squid-dangal",
    category: "Fun", order: 2,
    description: "Fun competition inspired by Squid Game with a creative and tech-based twist. Teams compete in multiple rounds testing teamwork, strategy, and quick thinking.",
    rules: ["Teams compete in multiple rounds testing teamwork, strategy, and quick thinking", "Follow coordinator instructions", "Maintain sportsmanship, integrity, and respect throughout"],
    eligibility: "All participants", 
    teamSize: { min: 1, max: 3, label: "Individual or Team of 3 members" },
    registrationFee: 50, feeType: "per_person",
    prize: { description: "Trophies + Certificates + Goodies" },
    facultyCoordinators: [{ name: "Ms. Lalita Verma" }, { name: "Dr. Anand Singh" }],
    studentCoordinators: [{ name: "Ahsan Khan", contact: "9696202329" }, { name: "Faisal Khan", contact: "8765108857" }, { name: "Nikhil Kumar", contact: "9065405517" }]
  },

  // EVENT 9: SHARK TANK IILM
  {
    title: "Shark Tank IILM", slug: "shark-tank-iilm",
    category: "Fun", order: 3,
    description: "Platform for students to pitch innovative startup ideas and social ventures before a panel of judges. Ideas may relate to entrepreneurship, fintech, edtech, sustainability, rural development, or nation-building.",
    rules: ["Ideas may relate to: entrepreneurship, fintech, edtech, sustainability, rural development, nation-building", "Maximum 5 minutes to pitch", "Judges and audience may ask questions after", "Judges evaluate strictly based on the presentation delivered during the session"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 4, label: "Individual or Team of 1-4 members" },
    registrationFee: 100, feeType: "per_person",
    prize: { description: "Cash prizes + Mentorship + Certificates" },
    facultyCoordinators: [{ name: "Dr. Navneet Kumar Singh" }, { name: "Dr. Gunjan Mittal Roy" }],
    studentCoordinators: [{ name: "Savitri", contact: "9759381485" }, { name: "Chinni Krishna", contact: "9493583339" }]
  },

  // EVENT 12: X AND BYTES KI KAHANI
  {
    title: "X and Bytes Ki Kahani", slug: "x-or-byte-ki-kahani",
    category: "Fun", order: 4,
    description: "Explore the relationship between mathematics and modern technology including algorithms, cryptography, AI, and data science. Activities include mathematics quizzes, coding challenges, and poster or presentation competitions.",
    rules: ["Explore the relationship between mathematics and modern technology", "Activities include mathematics quizzes, coding challenges, and poster/presentation competitions", "Promotes analytical thinking, logical reasoning, and interdisciplinary learning"],
    eligibility: "UG/PG students (Math/CS/Tech streams)", 
    teamSize: { min: 1, max: 3, label: "Individual or Team participation" },
    registrationFee: 50, feeType: "per_person",
    prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Dr. Mukesh Kumar" }, { name: "Dr. Khushboo Gupta" }],
    studentCoordinators: []
  },

  // EVENT 15: BHARAT BOLTA HAI – 1 MINUTE SPEECH
  {
    title: "Bharat Bolta Hai – 1 Minute Speech", slug: "bharat-bolta-hai",
    category: "Fun", order: 5,
    description: "Speaking competition where participants deliver a powerful 1-minute speech on the theme of a technology-driven India. Topics include AI, digital governance, sustainability, or social innovation.",
    rules: ["Deliver a 1-minute speech on theme of a technology-driven India", "Topics: AI, digital governance, sustainability, social innovation", "Exactly 60 seconds timeframe", "Evaluation: clarity of ideas, creativity, confidence, relevance to theme"],
    eligibility: "All participants", 
    teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 50, feeType: "per_person",
    prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Mr. Avinash Yadav" }, { name: "Mr. Gajendra Pal Singh" }],
    studentCoordinators: []
  },

  // EVENT 20: ESCAPE ROOM
  {
    title: "Escape Room", slug: "escape-room",
    category: "Fun", order: 6,
    description: "Technical challenge testing logical thinking, problem-solving, teamwork, and coding skills. Complete three sequential rounds: Puzzle solving, Technical games, and a Coding problem.",
    rules: ["Round 1: solve three technical puzzles, receive hint to locate Round 2", "Round 2: complete Algorithm Arrangement Game and Binary Puzzle Game, receive code for Round 3", "Round 3: return to coordinator with code and solve a coding problem", "Rounds must be completed in sequence", "Internet may be restricted during coding round"],
    eligibility: "UG/PG students", 
    teamSize: { min: 1, max: 2, label: "Team of 1-2 members" },
    registrationFee: 150, feeType: "per_person",
    prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Ms. Parul Saini" }, { name: "Dr. Shivani Saini" }],
    studentCoordinators: []
  },

  // EVENT 23: E-RANBHOOMI – E-SPORTS TOURNAMENT
  {
    title: "E-Ranbhoomi – E-Sports Tournament", slug: "e-ranbhoomi",
    category: "Fun", order: 7,
    description: "E-sports tournament based on Free Fire Max Battle Royale. Squads compete in knockout rounds followed by final rounds. Winners determined by performance, survival time, and points scored.",
    rules: ["Tournament based on Free Fire Max Battle Royale", "Squads compete in knockout rounds followed by finals", "Winners determined by performance, survival time, and points scored", "Cheating, hacking, or unfair gameplay leads to immediate disqualification", "Report to venue before scheduled match time"],
    eligibility: "All participants", 
    teamSize: { min: 4, max: 4, label: "Team of 4 members (squad)" },
    registrationFee: 50, feeType: "per_person",
    prize: { description: "Diamond prize pool + Certificates" },
    facultyCoordinators: [{ name: "Dr. Jayanta Biswas" }, { name: "Mr. Dibyanarayan Hazra" }],
    studentCoordinators: [{ name: "Kari Ayushman Rao", contact: "7701822045" }, { name: "Kumar Markandey" }]
  },

  // EVENT 25: SAMVAD – GROUP DISCUSSIONS
  {
    title: "Samvad – Group Discussions", slug: "samvad",
    category: "Fun", order: 8,
    description: "Individual participation group discussion. Groups formed randomly by organizers. Topic given on the spot with 1 minute preparation time. Each group has approximately 10 candidates.",
    rules: ["Individual participation — groups formed randomly by organizers", "Topic given on the spot with 1 minute preparation time", "Approximately 10 candidates per group", "Discussion time 10-12 minutes per group", "Proper attire and discipline required"],
    eligibility: "All participants", 
    teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 50, feeType: "per_person",
    prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Ms. Savita" }, { name: "Ms. Megha" }],
    studentCoordinators: [{ name: "Aman", contact: "9026240970" }]
  }
];

export default events;

export const eventsByCategory = {
  'Technical': events.filter(e => e.category === 'Technical'),
  'Creative & Innovation': events.filter(e => e.category === 'Creative & Innovation'),
  'Fun': events.filter(e => e.category === 'Fun'),
};

export const getEventBySlug = (slug) => events.find(e => e.slug === slug);

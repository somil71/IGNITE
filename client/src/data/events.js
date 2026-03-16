const events = [
  // ══════════════════ TECHNICAL (18) ══════════════════
  {
    title: "Poshan Lab – Redefining Nourishment", slug: "poshan-lab",
    category: "Technical", order: 1,
    description: "A dual food innovation challenge: develop a new nutritional product concept AND prepare a creative no-fire dish. Push the boundaries of food science, packaging, and nutrition.",
    rules: ["New product must be innovative and aligned with theme 'Redefining Nourishment'", "Focus on nutrition, taste, shelf life, safety, and consumer acceptability", "Submit: product concept note, formulation details, process flow chart, nutritional highlights, packaging idea, market feasibility", "5–7 minutes for presentation. Bring samples if possible", "No Fire Food: prepare food WITHOUT any heating device (no stove, induction, microwave)", "Allowed tools: mixing bowls, blender, whisk, cutlery, chopping board", "Bring all raw materials yourself. No pre-cut or pre-cooked ingredients", "Prepare one main dish OR one snack + one drink with a description card"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 3, label: "Team of max 3 members" },
    registrationFee: 100, prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Dr. Sameer Ahmad" }, { name: "Dr. Bisma Jan" }],
    studentCoordinators: [{ name: "Varun Umrao" }, { name: "Nitin Singh" }]
  },
  {
    title: "Technical Poster Presentation", slug: "technical-poster-presentation",
    category: "Technical", order: 2,
    description: "Present research posters on 'Innovations for Viksit Bharat 2047: Technology for Sustainable Growth.' Showcase ideas across AI, renewable energy, biotech, and smart cities.",
    rules: ["Theme: Innovations for Viksit Bharat 2047", "Focus areas: AI & Data Science, Renewable Energy, Biotechnology, Smart Cities & IoT, Environmental Management", "Poster structure: Title, Abstract (150–200 words), Introduction, Problem Statement, Methodology, Results, Innovation & Impact, Conclusion, References", "Size: A1 Portrait format. Must be printed and physically displayed", "Mounting material provided by organizers"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 3, label: "Individual or Team of max 3" },
    registrationFee: 100, prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Dr. Monu" }, { name: "Dr. Duraivadivel" }],
    studentCoordinators: [{ name: "Shivam Rajput" }, { name: "Abhishek" }, { name: "Mahima" }, { name: "Shambhavi Vatsa" }]
  },
  {
    title: "Vikshit Bharat Tech Quiz", slug: "vikshit-bharat-tech-quiz",
    category: "Technical", order: 3,
    description: "Test your knowledge of emerging technologies and innovations shaping modern India — from ISRO missions to AI breakthroughs. Multiple formats including buzzer rounds.",
    rules: ["Team of 2 members", "Formats: MCQs, visual rounds, audio rounds, and buzzer rounds", "Elimination rounds may take place", "Tie-breaker: rapid-fire round", "Mobile phones and smart devices NOT allowed during quiz"],
    eligibility: "UG/PG students", teamSize: { min: 2, max: 2, label: "Team of 2 members" },
    registrationFee: 100, prize: { description: "Cash prizes + Certificates" },
    facultyCoordinators: [{ name: "Ms. Smriti Sethi" }, { name: "Dr. Saumya Pandey" }],
    studentCoordinators: [{ name: "Supriya Anand" }, { name: "Nayan Jain" }]
  },
  {
    title: "Bharat Bot Expo", slug: "bharat-bot-expo",
    category: "Technical", order: 4,
    description: "Showcase your self-built robots and drones performing real-world utility tasks. A platform for robotics innovators to demonstrate their engineering brilliance.",
    rules: ["Each team may participate with only one robot or drone", "Custom-built only — pre-built allowed only with significant modifications", "Declare all functions and components before competition", "Weight limit: 10 kg maximum", "Tasks: cleaning, transporting, assisting in daily activities", "Autonomous and remote-controlled allowed; fully autonomous gets extra credit", "Judging: innovation, functionality, design, task efficiency"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 5, label: "Team of up to 5 members" },
    registrationFee: 100, prize: { description: "Trophies + Certificates + Goodies" },
    facultyCoordinators: [{ name: "Dr. Akhilesh Kumar Mishra" }, { name: "Dr. Juhi Priyani" }],
    studentCoordinators: [{ name: "Espandan Bajapi" }]
  },
  {
    title: "Bharat Tech Treasure Hunt", slug: "bharat-tech-treasure-hunt",
    category: "Technical", order: 5,
    description: "A campus-wide cryptic hunt where teams decode riddles and clues. Combines technical knowledge with strategic thinking and teamwork.",
    rules: ["Solve riddles and cryptic clues placed across campus", "Solve each clue correctly to proceed to next location", "Mobile phones NOT allowed (except for capturing clue images)", "Do not tamper with or move clue items", "First team to find the final treasure wins", "Cheating or misconduct = disqualification"],
    eligibility: "UG/PG students", teamSize: { min: 4, max: 4, label: "Team of 4 members" },
    registrationFee: 100, prize: { description: "Cash prizes + Certificates" },
    facultyCoordinators: [{ name: "Dr. Shikha Kumari" }, { name: "Dr. Garima Kulshrestha" }, { name: "Dr. Ajay Patwa" }],
    studentCoordinators: [{ name: "Jyotsana Singh" }, { name: "Aanya Chaudhary" }, { name: "Pritam Kumar" }, { name: "Atulya Shrestha" }, { name: "Kartik Gangwar" }]
  },
  {
    title: "Flying Control Racing – Drone Racing", slug: "drone-racing",
    category: "Technical", order: 6,
    description: "Navigate your self-built drone through a challenging obstacle course. A test of engineering precision, piloting skill, and nerves of steel.",
    rules: ["Self-built drones only — NO commercial ready-made drones", "Must follow weight and size limits, must be electrically powered", "One official run per team to complete obstacle course", "Penalties for crashing, skipping obstacles, or touching drone during race", "Winner = lowest final time including penalties", "All participants must follow safety guidelines"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 4, label: "Individual or Team of up to 4" },
    registrationFee: 100, prize: { description: "Trophies + Cash prizes + Certificates" },
    facultyCoordinators: [{ name: "Dr. Ankita Awasthi" }, { name: "Dr. Chandan Choubey" }, { name: "Dr. Sapna Chaudhary" }],
    studentCoordinators: [{ name: "Hitesh Kumar" }, { name: "Prashant Kumar" }]
  },
  {
    title: "RC Racing – Robo Racing", slug: "robo-racing",
    category: "Technical", order: 7,
    description: "The fastest and most balanced RC robot wins. Navigate a custom track through elimination, qualifier, and final rounds in this high-octane mechanical showdown.",
    rules: ["Fastest and most balanced robot wins", "Cross-institute teams allowed, max 5 members", "Robot specs: max 30×30 cm footprint, ≤5 kg, wired or wireless", "No readymade kits, pneumatic/hydraulic systems, or IC engines", "Robots must not damage arena or leave parts behind", "Penalties: hand touch = 10s added, off-track = 5s added", "Rounds: Elimination → Qualifier → Final (track revealed on spot)"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 5, label: "Team of up to 5 members" },
    registrationFee: 100, prize: { description: "Trophies + Certificates" },
    facultyCoordinators: [{ name: "Dr. Naseem Ahamad" }, { name: "Dr. Abhishek Kumar" }],
    studentCoordinators: [{ name: "Shashi Kumar Singh" }, { name: "Ashnit Kumar Singh" }, { name: "Jai" }, { name: "Prashant Kumar" }, { name: "Utkarsh Singh" }, { name: "Yash" }]
  },
  {
    title: "Mechanical Sketch Showdown", slug: "mechanical-sketch-showdown",
    category: "Technical", order: 8,
    description: "Showcase your engineering draftsmanship. Sketch mechanical concepts and innovations under timed conditions — where art meets engineering precision.",
    rules: ["Sketch mechanical or engineering-related concepts", "Sketches must be original and created on-spot during the event", "Stencils, rulers, and drafting tools are allowed", "Digital tools and mobile phones NOT permitted", "Judging: accuracy, creativity, and technical correctness", "Time limit announced at event"],
    eligibility: "UG/PG students (Engineering/Tech preferred)", teamSize: { min: 1, max: 2, label: "Individual or Team of 2" },
    registrationFee: 100, prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [], studentCoordinators: []
  },
  {
    title: "Robostrike – Robo War", slug: "robo-war",
    category: "Technical", order: 9,
    description: "Battle arena where self-built combat robots fight to the last component standing. Design, build, and destroy — only the toughest bot survives.",
    rules: ["Robots must be custom-built by the team", "No liquid weapons, fire-based weapons, or EMP devices", "Robots damaging the arena = disqualification", "Matches conducted in a standard combat arena", "Judges' decisions on damage points and knockouts are final", "Safety gear required for all team members during combat"],
    eligibility: "UG/PG students", teamSize: { min: 2, max: 5, label: "Team of 2–5 members" },
    registrationFee: 100, prize: { description: "Championship trophy + Cash prizes" },
    facultyCoordinators: [], studentCoordinators: []
  },
  {
    title: "Prompt-a-thon – AI Prompt Engineering Challenge", slug: "prompt-a-thon",
    category: "Technical", order: 10,
    description: "The art and science of AI prompt engineering. Present ideas on how AI technologies influence industries and demonstrate mastery of crafting powerful AI prompts.",
    rules: ["Maximum 5 minutes speaking time per team", "Presentations may be bilingual if required", "Reading from notes or using electronic devices during presentation NOT allowed", "Teams cannot change their position once presentation begins", "Audience may ask questions only AFTER the presentation", "Provide balanced and meaningful discussion on the topic"],
    eligibility: "UG/PG students", teamSize: { min: 4, max: 4, label: "Team of 4 members" },
    registrationFee: 100, prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Ms. Ankita Agarwal" }, { name: "Dr. Jaswinder" }],
    studentCoordinators: [{ name: "Adhikansh Gami" }, { name: "Aanya Chaudhary" }, { name: "Kashish Garg" }, { name: "Nikita" }, { name: "Siddharth Kaushik" }]
  },
  {
    title: "Debug X – Coding Error Fixing", slug: "debug-x",
    category: "Technical", order: 11,
    description: "Three brutal rounds: AI quiz, debugging challenge, and final coding round. Find the bugs, fix the logic, and prove you're the sharpest coder in the room.",
    rules: ["Round 1: AI-based quiz (MCQs on programming fundamentals + AI concepts)", "Round 2: Debugging challenge (fix errors in provided code snippets)", "Round 3: Final coding round (solve problem / complete program under time limit)", "Evaluation: accuracy, syntax correctness, logic, and time taken"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 100, prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Dr. Sumit Kumar" }, { name: "Ms. Kanika Kansal" }],
    studentCoordinators: [{ name: "Ms. Sakshi Sharma" }, { name: "Ms. Kalash Priya" }, { name: "Mr. Suprit Dubey" }]
  },
  {
    title: "Code the Rhythm – AI Music Creation", slug: "code-the-rhythm",
    category: "Technical", order: 12,
    description: "Where code meets creativity — use AI tools to compose original music tracks in 30 minutes. From Rap to Lo-fi, create the soundtrack of the future.",
    rules: ["Generate original music using AI tools based on provided lyrics/theme", "30 minutes to create a short music track", "Allowed genres: Rap, Indie Pop, EDM, Lo-fi, Classical", "Evaluation: creativity/originality, effective use of AI tools, musical composition and rhythm, overall track presentation"],
    eligibility: "UG/PG students", teamSize: { min: 3, max: 3, label: "Team of 3 members" },
    registrationFee: 100, prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Mr. Shantanu Bindewari" }, { name: "Mr. Mayank Saxena" }],
    studentCoordinators: [{ name: "Paramjivi Sutar" }]
  },
  {
    title: "Build for Bharat Hackathon", slug: "build-for-bharat-hackathon",
    category: "Technical", order: 13,
    description: "Innovating for a self-reliant and sustainable India. Build functional prototypes solving real-world problems in a 4–5 hour intensive hackathon sprint.",
    rules: ["Teams of 2–4 members, interdisciplinary allowed", "Open to all university/college students", "Choose a problem statement from thematic tracks or propose your own", "4–5 hours for prototype development", "Internet access only for research/development", "Solutions must be original — plagiarism = disqualification", "Submit: functional prototype + 5–7 slide presentation", "Final presentation: 5–7 minutes + Q&A", "Evaluation: innovation, technical implementation, social impact, feasibility, presentation"],
    eligibility: "All college/university students", teamSize: { min: 2, max: 4, label: "Team of up to 4 members" },
    registrationFee: 500, prize: { description: "Cash prizes + Certificates + Mentorship" },
    facultyCoordinators: [{ name: "Dr. Sanjay Gorai" }, { name: "Dr. Pranav Shrivastava" }, { name: "Dr. Nidhi Rai" }],
    studentCoordinators: [{ name: "Shatakshi Bisht" }, { name: "Priyanshi" }]
  },
  {
    title: "Forensic Files – Cyber Forensics", slug: "forensic-files",
    category: "Technical", order: 14,
    description: "Reconstruct a simulated crime scene using forensic methods. From investigation to mock courtroom defense — channel your inner forensic detective.",
    rules: ["Teams reconstruct a simulated crime scene based on given scenario", "Roles within team: Crime Scene Officer, Medical Practitioner, Investigating Officer, Forensic Expert, Attorney", "Prepare: investigation reports, forensic observations, medical findings, legal perspectives", "Final round: mock courtroom presentation defending the case before judges", "Evaluation: accuracy, creativity, documentation quality, evidence interpretation, teamwork, courtroom defense", "Bring own materials for crime scene simulation"],
    eligibility: "UG/PG students", teamSize: { min: 3, max: 5, label: "Team of up to 5 members" },
    registrationFee: 500, prize: { description: "Trophies + Cash prizes + Certificates" },
    facultyCoordinators: [{ name: "Dr. Rajeev Kumar" }, { name: "Dr. Ashlesha Bharadwaj" }, { name: "Mr. Aditya Saini" }],
    studentCoordinators: [{ name: "Mr. Badavath Rahul" }, { name: "Ms. Sakshi Negi" }, { name: "Mr. Satyam Jaiswal" }, { name: "Ms. Kashish" }]
  },
  {
    title: "Pixel Quest – Photography Event", slug: "pixel-quest",
    category: "Technical", order: 15,
    description: "An on-the-spot photography competition. Capture creative story-driven images based on a theme revealed on the day using any camera or smartphone.",
    rules: ["On-the-spot photography — theme revealed at event", "Any camera or smartphone may be used", "Props, backgrounds, locations within competition area allowed", "Additional lighting setups NOT allowed", "Submit in JPEG, PNG, or RAW format — no watermarks or logos", "All submissions must be original and captured during the fest", "Judging: creativity, composition, storytelling, technical quality, relevance to theme"],
    eligibility: "All participants", teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 100, prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Dr. Pinky Yadav" }, { name: "Dr. Niharika Choudhary" }],
    studentCoordinators: [{ name: "Praneet Kumar" }, { name: "Kunal Chaudhary" }]
  },
  {
    title: "Bharat Innovator", slug: "bharat-innovator",
    category: "Technical", order: 16,
    description: "A startup idea competition for the next generation of Indian innovators. Present your vision for solving real-world problems through technology and entrepreneurship.",
    rules: ["Present innovative startup ideas solving real-world problems", "Cover: problem statement, proposed solution, target market, technology used, business model", "5–7 minutes presentation + short Q&A", "Ideas must be original — focus on innovation, practicality, and impact", "Submit presentation before competition day", "Judges' decisions are final"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 3, label: "Individual or Team of up to 3" },
    registrationFee: 100, prize: { description: "Cash prizes + Mentorship + Certificates" },
    facultyCoordinators: [{ name: "Dr. Kirti Shukla" }, { name: "Mr. Harun Faridi" }],
    studentCoordinators: [{ name: "Shikhar Dixit" }, { name: "Anubhav Sachan" }, { name: "Mahak Verma" }]
  },
  {
    title: "The World Wired – Global Tech Quiz", slug: "the-world-wired",
    category: "Technical", order: 17,
    description: "Explore technological advancements across the globe. Test your knowledge of international tech innovations, leaders, and breakthroughs in this world-class quiz.",
    rules: ["Individual participation — teams formed by organizing committee (3–4 members)", "Rounds: global tech awareness, country–technology matching, innovator identification", "Bonus rapid-fire may include translating technical terms into foreign languages", "Winner decided by cumulative scores across all rounds", "Ties resolved through sudden-death question"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 1, label: "Individual (teams formed by organizers)" },
    registrationFee: 100, prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Prof. Ruchi Bobal" }, { name: "Ms. Toshika" }],
    studentCoordinators: [{ name: "Prachi Rautela" }, { name: "Jyotsna Singh" }]
  },
  {
    title: "Vigyan Darshan – Model Exhibition", slug: "vigyan-darshan",
    category: "Technical", order: 18,
    description: "A model presentation platform where students showcase innovative scientific and technological creations addressing real-world problems.",
    rules: ["Present model and explain the concept behind it", "Maximum 5 minutes for presentation", "Judges evaluate strictly based on material presented", "Maintain discipline and respect toward all participants and judges"],
    eligibility: "UG/PG students", teamSize: { min: 2, max: 5, label: "Team of minimum 2 members" },
    registrationFee: 100, prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Shraddha Sharma" }, { name: "Dr. Vibhav Narayan" }, { name: "Dr. Kirti Nagarkoti" }],
    studentCoordinators: [{ name: "Harsh" }, { name: "Kartik" }]
  },

  // ══════════════════ CREATIVE & INNOVATION (7) ══════════════════
  {
    title: "Tech Trail – Walking with Ideas of Innovation", slug: "tech-trail",
    category: "Creative & Innovation", order: 1,
    description: "Tell the story behind your innovation. Present a technology-based idea along with the real-life inspiration that sparked it.",
    rules: ["First explain the real-life problem or situation that inspired the innovation", "Then present solution and the technology used", "Use models, prototypes, animations, charts, or digital presentations", "3–5 minutes per team to present. Judges may ask 1–2 questions", "Ideas must be original — no copying from internet sources", "Bring own materials and devices needed for presentation"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 3, label: "Individual or Team of 2–3 members" },
    registrationFee: 100, prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Komal Salgotra" }, { name: "Hilal Shah" }],
    studentCoordinators: [{ name: "Niharika Tiwari" }, { name: "Priyanshu Kumari" }]
  },
  {
    title: "Digital Storytelling", slug: "digital-storytelling",
    category: "Creative & Innovation", order: 2,
    description: "Tell meaningful stories through digital media. Combine images, audio, video, and design to create powerful narratives with social relevance.",
    rules: ["Teams of 1–2 members", "Maximum 10 minutes presentation time", "Present original digital stories using multimedia (images, slides, audio, video clips)", "Story must have a clear theme, message, or social relevance", "Plagiarism or copied content = disqualification", "Report to venue 15 minutes before event begins — late entries NOT entertained"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 2, label: "Individual or Team of 2" },
    registrationFee: 200, prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Dr. Manali Gupta" }, { name: "Ms. Jyoti Thakur" }],
    studentCoordinators: [{ name: "Garima" }, { name: "Lakshya Gour" }]
  },
  {
    title: "Penetrix – Writing Thoughts for Tech Revolution", slug: "penetrix",
    category: "Creative & Innovation", order: 3,
    description: "Express your vision for the tech revolution in words. A timed writing competition — craft articles, blogs, essays, or creative tech narratives in 30 minutes.",
    rules: ["Technology-related theme/prompt given at the start", "30 minutes to write the submission", "Format: article, blog, essay, or creative tech narrative", "Maximum 700–800 words", "Work must be original — no plagiarism", "Mobile phones, AI tools, or external resources NOT allowed during writing"],
    eligibility: "UG/PG students", teamSize: { min: 2, max: 2, label: "Team of 2 members" },
    registrationFee: 100, prize: { description: "Certificates + Publication opportunity" },
    facultyCoordinators: [{ name: "Dr. Prakhar Consul" }, { name: "Ms. Prakriti Rao" }],
    studentCoordinators: [{ name: "Mohd Noorain" }, { name: "Shivansh Mishra" }]
  },
  {
    title: "Coded Humour – Tech Meme War", slug: "coded-humour",
    category: "Creative & Innovation", order: 4,
    description: "The internet's favorite art form meets techfest. Create original tech memes about coding, AI, developer culture, or college life.",
    rules: ["Create original memes related to coding, AI, developer culture, college life, or emerging tech", "Plagiarism = immediate disqualification", "Each team may present up to 3 memes. Presentation: 3–5 minutes", "Formats: image, short video, or presentation using laptops/projectors", "Content must be respectful — no offensive, political, discriminatory, or explicit material"],
    eligibility: "UG/PG students", teamSize: { min: 2, max: 3, label: "Team of 2–3 members" },
    registrationFee: 100, prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Dr. Mudita" }, { name: "Mr. Anik Acharjee" }],
    studentCoordinators: [{ name: "Agrima Mishra" }, { name: "Shatakshi Bisht" }]
  },
  {
    title: "Cinetech Cover", slug: "cinetech-cover",
    category: "Creative & Innovation", order: 5,
    description: "Reimagine movie, album, or song covers as digital tech art. A live competition where creativity, originality, and digital artistry combine in real time.",
    rules: ["Creatively reinterpret covers of movies, albums, or songs into artistic tech forms", "Artwork must be created digitally during the live competition", "Fixed time limit provided during the event", "Evaluation: creativity, originality, artistic technique, relevance to chosen piece"],
    eligibility: "All participants", teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 100, prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Mrs. Tanvi Sharma" }, { name: "Mr. Atul Yadav" }],
    studentCoordinators: [{ name: "Samarth Kushwaha" }, { name: "Rishabh Singh" }]
  },
  {
    title: "Marketing Mantra – Future of Marketing with Tech", slug: "marketing-mantra",
    category: "Creative & Innovation", order: 6,
    description: "Present the future of marketing through technology. Develop creative campaigns using AI, data analytics, and digital media strategies.",
    rules: ["Develop creative marketing campaigns using AI, data analytics, and digital media", "Themes: AI in marketing, influencer marketing, consumer insights, digital transformation, customer engagement", "Maximum 5 minutes for presentation", "Judging: creativity, feasibility, use of technology, clarity of strategy"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 4, label: "Individual or Team of 1–4" },
    registrationFee: 100, prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Dr. Navneet Kumar Singh" }, { name: "Ms. Papiya Mukherjee" }],
    studentCoordinators: [{ name: "Aaush Panwar" }, { name: "Priya" }]
  },

  // ══════════════════ FUN (10) ══════════════════
  {
    title: "Squid Dangal", slug: "squid-dangal",
    category: "Fun", order: 1,
    description: "IGNITE's most thrilling event — inspired by Squid Game with a creative and tech-based twist. Multi-round team challenges testing teamwork, strategy, and quick thinking.",
    rules: ["Teams compete in multiple rounds testing teamwork, strategy, and quick thinking", "Follow all instructions from coordinators", "Maintain sportsmanship and respect throughout", "Cheating, misbehavior, or disruption = immediate disqualification"],
    eligibility: "All participants", teamSize: { min: 3, max: 3, label: "Team of 3 members" },
    registrationFee: 100, prize: { description: "Trophies + Certificates + Goodies" },
    facultyCoordinators: [{ name: "Ms. Lalita Verma" }, { name: "Dr. Anand Singh" }],
    studentCoordinators: [{ name: "Ahsan Khan" }, { name: "Faisal Khan" }, { name: "Nikhil Kumar" }]
  },
  {
    title: "Escape Room", slug: "escape-room",
    category: "Fun", order: 2,
    description: "Three sequential rounds of increasing intensity: puzzle challenge, interactive technical games, and a final coding problem. Escape using logic, teamwork, and code.",
    rules: ["Round 1 – Puzzle Challenge: Solve 3 technical puzzles (logic, pattern recognition, tech quiz)", "After Round 1: receive hint to locate Round 2", "Round 2 – Game Challenge: Complete Algorithm Arrangement Game + Binary Puzzle Game", "After Round 2: receive code for Round 3", "Round 3 – Coding Challenge: Return to coordinator with code, solve a coding problem", "Rounds must be completed in SEQUENCE — skipping NOT allowed", "Internet may be restricted during coding round"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 2, label: "Team of 1–2 members" },
    registrationFee: 100, prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Ms. Parul Saini" }, { name: "Dr. Shivani Saini" }],
    studentCoordinators: []
  },
  {
    title: "E Ranbhoomi – E-Sports", slug: "e-ranbhoomi",
    category: "Fun", order: 3,
    description: "Battle royale in the digital arena. IGNITE's official Free Fire Max E-Sports tournament — squad up, strategize, and fight for the championship.",
    rules: ["Tournament based on Free Fire Max Battle Royale", "Multiple rounds: knockout rounds followed by finals", "Winners determined by performance, survival time, and points scored", "Strict fair play — cheating, hacking, or unfair gameplay = immediate disqualification", "Report to venue before scheduled match time"],
    eligibility: "All participants", teamSize: { min: 4, max: 4, label: "Squad of 4 members" },
    registrationFee: 100, prize: { description: "Diamond prize pool + Certificates" },
    facultyCoordinators: [{ name: "Dr. Jayanta Biswas" }, { name: "Mr. Dibyanarayan Hazra" }],
    studentCoordinators: [{ name: "Kari Ayushman Rao" }, { name: "Kumar Markandey" }]
  },
  {
    title: "Samvad – Group Discussion", slug: "samvad",
    category: "Fun", order: 4,
    description: "A structured group discussion where your ideas, articulation, and listening skills are tested on the spot. Topics are technology-focused.",
    rules: ["Individual participation — groups formed randomly by organizers", "Topic given on the spot", "1 minute preparation time before discussion", "Approximately 10 candidates per group", "Discussion time: 10–12 minutes per group", "Proper attire and discipline required"],
    eligibility: "All participants", teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 100, prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Ms. Savita" }, { name: "Ms. Megha" }],
    studentCoordinators: [{ name: "Mr. Aman" }]
  },
  {
    title: "Bharat Bolta Hai – 1 Minute Speech", slug: "bharat-bolta-hai",
    category: "Fun", order: 5,
    description: "60 seconds. One idea. Maximum impact. Deliver a powerful speech on how technology can solve India's challenges and drive national development.",
    rules: ["Deliver a 1-minute speech on theme of a technology-driven India", "Topics: AI, digital governance, sustainability, social innovation", "Present original ideas only", "Exactly 60 seconds — strictly follow time limit", "Evaluation: clarity of ideas, creativity, confidence, relevance to theme"],
    eligibility: "All participants", teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 100, prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Mr. Avinash Yadav" }, { name: "Mr. Gajendra Pal Singh" }],
    studentCoordinators: []
  },
  {
    title: "Shark Tank IILM – Startup Pitching", slug: "shark-tank-iilm",
    category: "Fun", order: 6,
    description: "Step into the tank. Pitch your startup idea to a panel of judges in just 5 minutes. Present your problem, solution, audience, and impact.",
    rules: ["Ideas may relate to: entrepreneurship, fintech, edtech, sustainability, rural development, nation-building", "Maximum 5 minutes to pitch live before judges", "Clearly explain: problem, solution, target audience, expected impact", "After pitch, judges/audience may ask questions", "Judges evaluate strictly based on the live presentation"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 4, label: "Individual or Team of 1–4" },
    registrationFee: 100, prize: { description: "Cash prizes + Mentorship + Certificates" },
    facultyCoordinators: [{ name: "Dr. Navneet Kumar Singh" }, { name: "Dr. Gunjan Mittal Roy" }],
    studentCoordinators: [{ name: "Savitri" }, { name: "Chinni Krishna" }]
  },
  {
    title: "X or Byte Ki Kahani – Mathematical Showdown", slug: "x-or-byte-ki-kahani",
    category: "Fun", order: 7,
    description: "Explore the deep relationship between mathematics and technology. Quizzes, coding challenges, and presentations connecting algorithms, cryptography, AI, and data science.",
    rules: ["Activities include: mathematics quizzes, coding challenges, and poster/presentation competitions", "Individual or team as announced at event", "Present ideas or projects demonstrating mathematical concepts used in technology", "Encourages analytical thinking and interdisciplinary learning"],
    eligibility: "UG/PG students (Math/CS/Tech streams)", teamSize: { min: 1, max: 3, label: "Individual or Team" },
    registrationFee: 100, prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Dr. मुकेश कुमार" }, { name: "Dr. खुशबू गुप्ता" }],
    studentCoordinators: []
  },
  {
    title: "Debate – Lex Tech", slug: "lex-tech-debate",
    category: "Fun", order: 8,
    description: "A high-stakes debate on Technology in Law. One team argues for, one against — covering AI regulation, cybersecurity, data privacy, and the future of justice.",
    rules: ["Theme: Technology in Law", "Each team: 2 speakers — one FOR the motion, one AGAINST", "Topics: AI regulation, cybersecurity and national sovereignty, data protection and privacy rights, digital evidence and criminal justice, platform liability and free speech", "Evaluation: content and research depth, logical structure, rebuttal ability, delivery and articulation"],
    eligibility: "All participants", teamSize: { min: 2, max: 2, label: "Team of 2 members" },
    registrationFee: 100, prize: { description: "Trophies + Certificates" },
    facultyCoordinators: [{ name: "Ms. Priyanka Gupta" }, { name: "Mr. Paras Yadav" }],
    studentCoordinators: [{ name: "Shivam Chaudhary" }, { name: "Harshini Yadav" }]
  },
  {
    title: "Mechanical Sketch Showdown (Creative)", slug: "mechanical-sketch-showdown-creative",
    category: "Fun", order: 9,
    description: "Express mechanical concepts through creative sketching. A cross-disciplinary event where engineering imagination meets artistic flair.",
    rules: ["Participants sketch mechanical or engineering-related concepts creatively", "Sketches must be original and created on-spot", "Rulers, stencils, and drafting tools allowed", "Digital tools and phones NOT permitted", "Judging: creativity, originality, and technical accuracy"],
    eligibility: "All participants", teamSize: { min: 1, max: 2, label: "Individual or Team of 2" },
    registrationFee: 100, prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [], studentCoordinators: []
  },
  {
    title: "Bharat Bolta Hai – 1 Minute Speech (Open)", slug: "bharat-bolta-hai-open",
    category: "Fun", order: 10,
    description: "Open stage 1-minute speech competition. Any topic related to technology, innovation, and India's future. All university students welcome.",
    rules: ["Individual participation only", "Topic may be self-chosen within technology/innovation/India theme", "Exactly 60 seconds — automatic bell at 60s", "Evaluation: impact, clarity, delivery, originality"],
    eligibility: "All participants", teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 100, prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [], studentCoordinators: []
  },
];

export default events;

export const eventsByCategory = {
  'Technical': events.filter(e => e.category === 'Technical'),
  'Creative & Innovation': events.filter(e => e.category === 'Creative & Innovation'),
  'Fun': events.filter(e => e.category === 'Fun'),
};

export const getEventBySlug = (slug) => events.find(e => e.slug === slug);

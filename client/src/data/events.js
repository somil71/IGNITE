const events = [
  // ══════════════════ TECHNICAL (18) ══════════════════
  {
    title: "Poshan Lab – Redefining Nourishment", slug: "poshan-lab",
    category: "Technical", order: 1, icon: "Food",
    description: "Innovation in food and nutrition. NPD and No Fire Cooking challenges.",
    rules: ["NPD: Develop innovative food product aligned with 'Redefining Nourishment'", "Presentation (5-7 mins): Concept, formulation, process flow, feasibility", "No Fire: Prepare food without any heating device", "Provide description card with nutritional benefits"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 3, label: "Individual or Team of max 3" },
    registrationFee: 250, feeType: "per_team", prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Dr. Sameer Ahmad" }, { name: "Dr. Bisma Jan" }],
    studentCoordinators: [{ name: "Varun Umrao", contact: "7565885678" }]
  },
  {
    title: "Technical Poster Presentation", slug: "poster-presentation",
    category: "Technical", order: 2, icon: "Poster",
    description: "Present research posters on 'Innovations for Viksit Bharat 2047'.",
    rules: ["Theme: Sustainable Growth & Tech", "A1 Size, Portrait format", "Judging based on impact and innovation"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 3, label: "Individual or Team of max 3" },
    registrationFee: 100, feeType: "per_person", prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Dr. Monu" }],
    studentCoordinators: [{ name: "Shivam Rajput" }]
  },
  {
    title: "Vikshit Bharat Tech Quiz", slug: "isro-tech-quiz",
    category: "Technical", order: 3, icon: "Quiz",
    description: "Awareness of emerging tech and ISRO's contributions.",
    rules: ["Buzzer & Visual rounds", "No electronic devices", "Team performance based"],
    eligibility: "UG/PG students", teamSize: { min: 2, max: 2, label: "Team of 2 members" },
    registrationFee: 50, feeType: "per_person", prize: { description: "Cash prizes + Certificates" },
    facultyCoordinators: [{ name: "Ms. Smriti Sethi" }],
    studentCoordinators: [{ name: "Supriya Anand" }]
  },
  {
    title: "Bharat Bot Expo", slug: "bot-expo",
    category: "Technical", order: 4, icon: "Bot",
    description: "Showcase custom-built robots performing practical utility tasks.",
    rules: ["Max weight 10kg", "Must perform useful task", "Custom built or majorly modified only"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 5, label: "Team of 1-5 members" },
    registrationFee: 500, feeType: "per_team", prize: { description: "Trophies + Certificates" },
    facultyCoordinators: [{ name: "Dr. Akhilesh Kumar Mishra" }],
    studentCoordinators: [{ name: "Espandan Bajapi" }]
  },
  {
    title: "Bharat Tech Treasure Hunt", slug: "treasure-hunt",
    category: "Technical", order: 5, icon: "Treasure",
    description: "Solve riddles and cryptic clues across campus to find the hidden tech treasure.",
    rules: ["Follow clues in sequence", "No tampering with clues", "Mobiles allowed only for photo verification"],
    eligibility: "UG/PG students", teamSize: { min: 4, max: 4, label: "Team of 4 members" },
    registrationFee: 100, feeType: "per_person", prize: { description: "Cash prizes + Certificates" },
    facultyCoordinators: [{ name: "Dr. Shikha Kumari" }],
    studentCoordinators: [{ name: "Jyotsana Singh", contact: "7052101209" }]
  },
  {
    title: "Flying Control Racing – Drone Racing", slug: "drone-racing",
    category: "Technical", order: 6, icon: "Drone",
    description: "Test your drone control and speed through an obstacle course.",
    rules: ["Self-built only, max 450mm", "Weight 250g - 2kg", "Time-based scoring"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 4, label: "Team of 1-4 members" },
    registrationFee: 200, feeType: "per_person", prize: { description: "Trophies + Cash prizes" },
    facultyCoordinators: [{ name: "Dr. Ankita Awasthi" }],
    studentCoordinators: [{ name: "Hitesh Kumar" }]
  },
  {
    title: "RC Racing – Robo Racing", slug: "robo-race",
    category: "Technical", order: 7, icon: "Racing",
    description: "Manually controlled robot racing overcoming obstacles.",
    rules: ["Max 30x30 cm, 5kg", "Speed + Obstacle completion", "Wired or wireless"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 5, label: "Team of 1-5 members" },
    registrationFee: 500, feeType: "per_team", prize: { description: "Trophies + Certificates" },
    facultyCoordinators: [{ name: "Dr. Naseem Ahamad" }],
    studentCoordinators: [{ name: "Shashi Kumar Singh" }]
  },
  {
    title: "Robo Maze", slug: "robo-maze",
    category: "Technical", order: 8, icon: "Maze",
    description: "Fully autonomous robot navigating a maze using sensors.",
    rules: ["IR/Ultrasonic sensors only", "No manual override", "Fastest route calculation"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 4, label: "Team of 1-4 members" },
    registrationFee: 500, feeType: "per_team", prize: { description: "Trophies + Cash prizes" },
    facultyCoordinators: [{ name: "Prof. Kshama Pandey" }],
    studentCoordinators: [{ name: "Sandip Sarkar" }]
  },
  {
    title: "Robo Soccer", slug: "robo-soccer",
    category: "Technical", order: 9, icon: "Soccer",
    description: "Manually controlled robots playing soccer matches.",
    rules: ["3 min matches", "Team scoring strategy", "No intentional damage"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 4, label: "Team of 1-4 members" },
    registrationFee: 500, feeType: "per_team", prize: { description: "Trophies + Certificates" },
    facultyCoordinators: [{ name: "Dr. Juhi Priyani" }],
    studentCoordinators: [{ name: "Priyanshu Rai" }]
  },
  {
    title: "Prompt-a-thon – AI Prompt Engineering Challenge", slug: "prompt-a-thon",
    category: "Technical", order: 10, icon: "Prompt",
    description: "AI prompt engineering and concept showcase modelling.",
    rules: ["Prompt design efficiency", "Creative application of LLMs", "Live demonstration"],
    eligibility: "UG/PG students", teamSize: { min: 4, max: 4, label: "Team of 4 members" },
    registrationFee: 100, feeType: "per_person", prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Ms. Ankita Agarwal" }],
    studentCoordinators: [{ name: "Adhikansh Gami" }]
  },
  {
    title: "Debug X – Coding Error Fixing", slug: "debug-x",
    category: "Technical", order: 11, icon: "Debug",
    description: "AI quiz + Debugging challenge + Final coding round.",
    rules: ["Syntax fixing", "Logical optimization", "Three sequential rounds"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 50, feeType: "per_person", prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Dr. Sumit Kumar" }],
    studentCoordinators: [{ name: "Sakshi Sharma" }]
  },
  {
    title: "Code the Rhythm – AI Music Creation", slug: "ai-music-challenge",
    category: "Technical", order: 12, icon: "Code",
    description: "Generate original music using AI tools based on a theme.",
    rules: ["Use AI tools for composition", "30 mins time limit", "Originality of prompt"],
    eligibility: "UG/PG students", teamSize: { min: 3, max: 3, label: "Team of 3 members" },
    registrationFee: 100, feeType: "per_person", prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Mr. Shantanu Bindewari" }],
    studentCoordinators: [{ name: "Paramjivi Sutar" }]
  },
  {
    title: "Build for Bharat Hackathon", slug: "hackathon-2026",
    category: "Technical", order: 13, icon: "Hackathon",
    description: "Innovative coding challenge for self-reliant India.",
    rules: ["Prototype in 4-5 hours", "Focus on social impact", "Clear tech stack implementation"],
    eligibility: "All college students", teamSize: { min: 2, max: 4, label: "Team of 2-4 members" },
    registrationFee: 500, feeType: "per_team", prize: { description: "Cash prizes + Mentorship" },
    facultyCoordinators: [{ name: "Dr. Sanjay Gorai" }],
    studentCoordinators: [{ name: "Shatakshi Bisht" }]
  },
  {
    title: "Forensic Files (Cyber Forensics)", slug: "forensic-files",
    category: "Technical", order: 14, icon: "Forensic",
    description: "Crime scene simulation and reconstruction competition.",
    rules: ["Investigator roleplay", "Simulation accuracy", "Courtroom defense"],
    eligibility: "UG/PG students", teamSize: { min: 2, max: 5, label: "Team of 2-5 members" },
    registrationFee: 500, feeType: "per_team", prize: { description: "Trophies + Cash prizes" },
    facultyCoordinators: [{ name: "Dr. Rajeev Kumar" }],
    studentCoordinators: [{ name: "Badavath Rahul" }]
  },
  {
    title: "Pixel Quest", slug: "photography-quest",
    category: "Technical", order: 15, icon: "Camera",
    description: "On-the-spot photography competition on a campus theme.",
    rules: ["Capture within campus", "Raw/Unfinished images only", "No watermarks"],
    eligibility: "All participants", teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 100, feeType: "per_person", prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Dr. Pinky Yadav" }],
    studentCoordinators: [{ name: "Praneet Kumar" }]
  },
  {
    title: "Bharat Innovator", slug: "bharat-innovator",
    category: "Technical", order: 16, icon: "Innovation",
    description: "Startup ideas solving real-world Indian problems.",
    rules: ["Problem-Solution-Fit", "Pitch deck required", "Scalability index"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 3, label: "Individual or Team of max 3" },
    registrationFee: 100, feeType: "per_person", prize: { description: "Cash prizes + Mentorship" },
    facultyCoordinators: [{ name: "Dr. Kirti Shukla" }],
    studentCoordinators: [{ name: "Shikhar Dixit" }]
  },
  {
    title: "The World Wired – Global Tech Quiz", slug: "global-tech-quiz",
    category: "Technical", order: 17, icon: "Globe",
    description: "A quiz exploring tech advancements across the world.",
    rules: ["Rounds based on country-tech matching", "Bonus rapid fire", "Cumulative scoring"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 100, feeType: "per_person", prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Prof. Ruchi Bobal" }],
    studentCoordinators: [{ name: "Prachi Rautela" }]
  },
  {
    title: "Vigyan Darshan – Model Exhibition", slug: "model-presentation",
    category: "Technical", order: 18, icon: "Vigyan",
    description: "Showcase scientific models addressing real-world problems.",
    rules: ["Scale models / working prototypes", "Presentation with Q&A", "Scientific feasibility focused"],
    eligibility: "UG/PG students", teamSize: { min: 2, max: 5, label: "Team of 2-5 members" },
    registrationFee: 300, feeType: "per_team", prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Shraddha Sharma" }],
    studentCoordinators: [{ name: "Harsh" }]
  },

  // ══════════════════ CREATIVE & INNOVATION (6) ══════════════════
  {
    title: "Tech Trail – Walking with Ideas of Innovation", slug: "tech-trail",
    category: "Creative & Innovation", order: 1, icon: "Trail",
    description: "Showcase tech ideas via creative storylines.",
    rules: ["Problem discovery focus", "Storytelling technique", "Originality"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 3, label: "Individual or Team of 3" },
    registrationFee: 100, feeType: "per_person", prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Mrs. Komal Salgotra" }],
    studentCoordinators: [{ name: "Niharika Tiwari" }]
  },
  {
    title: "Digital Storytelling", slug: "digital-storytelling",
    category: "Creative & Innovation", order: 2, icon: "Storytelling",
    description: "Pitch social/tech stories via multimedia content.",
    rules: ["10 min presentation", "Audio-visual focus", "Social message"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 2, label: "Individual or Team of 2" },
    registrationFee: 100, feeType: "per_person", prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Dr. Manali Gupta" }],
    studentCoordinators: [{ name: "Garima" }]
  },
  {
    title: "Penetrix – Writing Thoughts for Tech Revolution", slug: "penetrix",
    category: "Creative & Innovation", order: 3, icon: "Writing",
    description: "Writing competition on tech impact on society.",
    rules: ["Prompt on-the-spot", "30 mins limit", "No AI tools"],
    eligibility: "UG/PG students", teamSize: { min: 2, max: 2, label: "Team of 2 members" },
    registrationFee: 100, feeType: "per_person", prize: { description: "Certificates + Publication" },
    facultyCoordinators: [{ name: "Dr. Prakhar Consul" }],
    studentCoordinators: [{ name: "Mohd Noorain" }]
  },
  {
    title: "Coded Humour – Tech Meme War", slug: "tech-meme-war",
    category: "Creative & Innovation", order: 4, icon: "Meme",
    description: "Create and present hilarious tech-related memes.",
    rules: ["Original coding humor", "Clean content only", "3 memes per team"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 3, label: "Individual or Team of 3" },
    registrationFee: 50, feeType: "per_person", prize: { description: "Goodies + Certificates" },
    facultyCoordinators: [{ name: "Dr. Mudita" }],
    studentCoordinators: [{ name: "Agrima Mishra" }]
  },
  {
    title: "Cinetech Cover", slug: "cinetech-cover",
    category: "Creative & Innovation", order: 5, icon: "Cine",
    description: "Reinterpret movie covers in artistic tech forms.",
    rules: ["Live design", "Originality", "Tech-Art fusion"],
    eligibility: "All participants", teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 100, feeType: "per_person", prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Mrs. Tanvi Sharma" }],
    studentCoordinators: [{ name: "Samarth Kushwaha" }]
  },
  {
    title: "Marketing Mantra – Future of Marketing with Tech", slug: "marketing-mantra",
    category: "Creative & Innovation", order: 6, icon: "Marketing",
    description: "Create tech-driven marketing campaigns for unique products.",
    rules: ["Digital focus", "Multimedia presentation", "3 min pitch"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 4, label: "Individual or Team of 1-4" },
    registrationFee: 100, feeType: "per_person", prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Dr. Navneet Singh" }],
    studentCoordinators: [{ name: "Aaush Panwar" }]
  },

  // ══════════════════ FUN (8) ══════════════════
  {
    title: "Squid Dangal", slug: "squid-dangal",
    category: "Fun", order: 1, icon: "Squid",
    description: "Squid Game inspired tech-themed physical agility rounds.",
    rules: ["Knockout based", "Strict coordination", "Sportsmanship"],
    eligibility: "All participants", teamSize: { min: 1, max: 3, label: "Individual or Team of 3" },
    registrationFee: 50, feeType: "per_person", prize: { description: "Trophies + Certificates" },
    facultyCoordinators: [{ name: "Ms. Lalita Verma" }],
    studentCoordinators: [{ name: "Ahsan Khan" }]
  },
  {
    title: "Escape Room", slug: "escape-room",
    category: "Fun", order: 2, icon: "Escape",
    description: "Logical puzzles and coding challenges in a themed room.",
    rules: ["3 sequential rounds", "Puzzle-Algor-Code", "Time limit 45 mins"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 2, label: "Team of 1-2 members" },
    registrationFee: 150, feeType: "per_person", prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Ms. Parul Saini" }],
    studentCoordinators: [{ name: "Inzamam Ansari" }]
  },
  {
    title: "E Ranbhoomi – E-Sports", slug: "e-ranbhoomi",
    category: "Fun", order: 3, icon: "Gaming",
    description: "Competitive Free Fire Max tournament.",
    rules: ["Squad only", "No hacks/cheats", "Knockout rounds"],
    eligibility: "All participants", teamSize: { min: 4, max: 4, label: "Team of 4 members" },
    registrationFee: 50, feeType: "per_person", prize: { description: "Prize pool + Certificates" },
    facultyCoordinators: [{ name: "Dr. Jayanta Biswas" }],
    studentCoordinators: [{ name: "Kari Ayushman Rao" }]
  },
  {
    title: "Samvad – Group Discussion", slug: "samvad",
    category: "Fun", order: 4, icon: "Samvad",
    description: "Group discussions on on-the-spot tech topics.",
    rules: ["Random groups", "10-12 mins debate", "Proper etiquette required"],
    eligibility: "All participants", teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 50, feeType: "per_person", prize: { description: "Certificates + Recognition" },
    facultyCoordinators: [{ name: "Ms. Savita" }],
    studentCoordinators: [{ name: "Aman" }]
  },
  {
    title: "Bharat Bolta Hai – 1 Minute Speech", slug: "bharat-bolta-hai",
    category: "Fun", order: 5, icon: "Speech",
    description: "1-minute powerful speech on technology-driven India.",
    rules: ["Exactly 60 seconds", "Confidence & Clarity", "Theme-based content"],
    eligibility: "All participants", teamSize: { min: 1, max: 1, label: "Individual" },
    registrationFee: 50, feeType: "per_person", prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Mr. Avinash Yadav" }],
    studentCoordinators: [{ name: "Kunal Chaudhary" }]
  },
  {
    title: "Shark Tank IILM – Startup Pitching", slug: "shark-tank-iilm",
    category: "Fun", order: 6, icon: "Shark",
    description: "Pitch innovative startup ideas to a panel of experts.",
    rules: ["5 min pitch", "Original ventures only", "Revenue model focus"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 4, label: "Individual or Team of 1-4" },
    registrationFee: 100, feeType: "per_person", prize: { description: "Cash prizes + Mentorship" },
    facultyCoordinators: [{ name: "Dr. Navneet Singh" }],
    studentCoordinators: [{ name: "Savitri" }]
  },
  {
    title: "X or Byte Ki Kahani – Mathematical Showdown", slug: "math-storytelling",
    category: "Fun", order: 7, icon: "Math",
    description: "Explore relationship between math and technology via stories.",
    rules: ["Narrative focus", "Math-Tech integration", "Creative visual aids"],
    eligibility: "UG/PG students", teamSize: { min: 1, max: 3, label: "Individual or Team of max 3" },
    registrationFee: 50, feeType: "per_person", prize: { description: "Certificates + Goodies" },
    facultyCoordinators: [{ name: "Dr. Mukesh Kumar" }],
    studentCoordinators: [{ name: "Amitesh Kumar" }]
  },
  {
    title: "Debate – Lex Tech", slug: "lextech-debate",
    category: "Fun", order: 8, icon: "Debate",
    description: "Debate on the theme 'Technology in Law'.",
    rules: ["Theme: Tech in Law", "2 speakers (For/Against)", "Topics: AI, Privacy, Digital Justice"],
    eligibility: "UG/PG students", teamSize: { min: 2, max: 2, label: "Team of 2 members" },
    registrationFee: 200, feeType: "per_team", prize: { description: "Trophies + Certificates" },
    facultyCoordinators: [{ name: "Ms. Priyanka Gupta" }],
    studentCoordinators: [{ name: "Shivam Chaudhary" }]
  }
];

export default events;

export const eventsByCategory = {
  'Technical': events.filter(e => e.category === 'Technical'),
  'Creative & Innovation': events.filter(e => e.category === 'Creative & Innovation'),
  'Fun': events.filter(e => e.category === 'Fun'),
};

export const getEventBySlug = (slug) => events.find(e => e.slug === slug);

import { FeatureLdg, InfoLdg, TestimonialType } from "@/types";

export const infos: InfoLdg[] = [
  {
    title: "Stop Studying What You Already Know",
    description:
      "AceThePrep finds the gaps in your knowledge—so you walk in confident, not confused.",
    image: "/_static/illustrations/feature.png",
    list: [
      {
        title: "\"I don't know what I don't know\"",
        description: "After every test, see exactly where you slipped—and study that, not everything.",
        icon: "search",
      },
      {
        icon: "clock",
        title: "\"I run out of time on exams\"",
        description: "Timed practice mode builds your pace. No more rushing on the real thing.",
      },
      {
        icon: "brain",
        title: "\"I forget everything by exam day\"",
        description: "Instant explanations after every answer = deeper retention, longer memory.",
      },
    ],
  },
  {
    title: "Achieve True Exam Readiness in 3 Steps",
    description:
      "From passive textbook notes to calibrated retrieval and distractor immunity in minutes.",
    image: "/_static/illustrations/feature.png",
    list: [
      {
        title: "1. Paste your material",
        description: "Notes, textbook chapters, or upload a PDF. Anything goes.",
        icon: "fileText",
      },
      {
        title: "2. Take the test",
        description: "Timed practice. Real exam conditions. No distractions.",
        icon: "check",
      },
      {
        title: "3. See your weak spots",
        description: "Every wrong answer explained. Know exactly what to review next.",
        icon: "search",
      },
    ],
  },
];

// @/config/landing.ts
export const features: FeatureLdg[] = [
  {
    title: "AI-Powered Quiz Creation",
    description: "Generate tailored quizzes in seconds with our advanced AI, adapting to your subject and difficulty preferences.",
    icon: "cpu",
  },
  {
    title: "Real-Time Customization",
    description: "Edit questions, options, and answers on the fly with an intuitive interface—no delays, just results.",
    icon: "edit",
  },
  {
    title: "Seamless Exports",
    description: "Download quizzes as PDF or Excel files for offline use, perfect for classrooms or study groups.",
    icon: "download",
  },
  {
    title: "Instant Sharing",
    description: "Share quizzes via unique links or embeds, making collaboration effortless for teams and students.",
    icon: "share",
  },
  {
    title: "Performance Insights",
    description: "Track scores and progress with detailed analytics to identify strengths and areas for improvement.",
    icon: "chartBar",
  },
  {
    title: "Adaptive Learning",
    description: "Personalize quiz difficulty and content dynamically based on user performance for optimal growth.",
    icon: "user",
  },
];
export const testimonials: TestimonialType[] = [
  {
    name: "Sofia Rossi",
    job: "High School Teacher",
    image: "https://randomuser.me/api/portraits/women/1.jpg", // New image for USA
    review:
      "Using this quiz app has made it so easy to create engaging quizzes for my students. The AI-generated questions are spot on, and my students love the interactive format!",
    location: "New York, USA",
  },
  {
    name: "Liam O'Connor",
    job: "College Student",
    image: "https://randomuser.me/api/portraits/men/2.jpg", // New image for Canada
    review:
      "I appreciate how I can customize the difficulty levels of the quizzes. It really helps me prepare for exams in a way that suits my learning style.",
    location: "Toronto, Canada",
  },
  {
    name: "Emily Green",
    job: "Corporate Trainer",
    image: "https://randomuser.me/api/portraits/women/3.jpg", // New image for UK
    review:
      "The analytics feature is fantastic! I can track my team's progress and see where they need improvement. This tool has been a game changer for our training sessions.",
    location: "London, UK",
  },
  {
    name: "Oliver Brown",
    job: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/men/8.jpg", // New image for Australia
    review:
      "Creating quizzes for lead generation has never been easier. The ability to download quizzes in PDF and Excel formats is a huge plus for our marketing campaigns.",
    location: "Sydney, Australia",
  },
  {
    name: "Amina Khan",
    job: "Educational Consultant",
    image: "https://randomuser.me/api/portraits/women/6.jpg", // New image for South Africa
    review:
      "As an educational consultant, I recommend this quiz app to all my clients. The ease of use and the quality of the quizzes generated are impressive. It saves so much time!",
    location: "Cape Town, South Africa",
  },
  {
    name: "Hiroshi Tanaka",
    job: "Software Developer",
    image: "https://randomuser.me/api/portraits/men/4.jpg", // New image for Singapore
    review:
      "I used this app to create quizzes for a coding bootcamp. The questions were relevant and challenging, and the students found them very helpful for their learning.",
    location: "Singapore",
  },
  {
    name: "Anna Müller",
    job: "HR Manager",
    image: "https://randomuser.me/api/portraits/women/5.jpg", // New image for Germany
    review:
      "We implemented this quiz tool for our onboarding process. It has made training new employees much more engaging and effective. Highly recommend!",
    location: "Berlin, Germany",
  },
  {
    name: "Michael Green",
    job: "Freelance Writer",
    image: "https://randomuser.me/api/portraits/men/6.jpg", // Keeping this name as it is
    review:
      "I love how I can create quizzes on various topics quickly. It's a great way to engage my audience and gather feedback on my writing.",
    location: "Milan, Italy",
  },
];




export const studentTestimonials: TestimonialType[] = [
  {
    name: "Marcus Vance",
    job: "Digital SAT 1540 (Math 790) • Cornell Admit",
    image: "/images/avatars/marcus-vance.jpg",
    review:
      "Module 2 Hard Math on the Digital SAT is full of extraneous root traps. AceThePrep forced me to audit boundary conditions instead of blindly trusting Desmos. Jumped from 690 to 790 in 3 weeks.",
    location: "Austin, Texas",
  },
  {
    name: "Sofia Chen",
    job: "GRE Quant 168, Verbal 164 • Stanford MS Admit",
    image: "/images/avatars/sofia-chen.jpg",
    review:
      "The quantitative comparison drills broke down the zero-boundary traps and coordinate geometry tricks that ETS loves testing. No fluff, just raw diagnostic calibration under time pressure.",
    location: "San Francisco, USA",
  },
  {
    name: "Mateo Silva",
    job: "CFA Level 1 Passed (Top 10% Decile)",
    image: "/images/avatars/mateo-silva.jpg",
    review:
      "Instead of rereading 3,000 pages of CFA curriculum, the spaced retrieval queue forced me to recall DuPont decompositions and duration sensitivities right before my forgetting threshold.",
    location: "New York, USA",
  },
  {
    name: "Mei-Ling Zhou",
    job: "IELTS Academic Band 8.5 • Oxford Admit",
    image: "/images/avatars/mei-ling-zhou.jpg",
    review:
      "In IELTS Reading, distinguishing between 'False' and 'Not Given' cost me a band score on previous attempts. AceThePrep's distractor analysis taught me to never extrapolate external assumptions beyond the text.",
    location: "London, UK",
  },
  {
    name: "Daniel Cooper",
    job: "TOEFL iBT 116/120 • Columbia Admit",
    image: "/images/avatars/daniel-cooper.jpg",
    review:
      "The timed drills on sentence insertion and rhetorical transitions completely eliminated my test-day hesitation. The interface is impossibly fast with zero lag.",
    location: "Boston, USA",
  },
  {
    name: "Amara Williams",
    job: "GMAT Focus 715 • INSEAD & Wharton Admit",
    image: "/images/avatars/amara-williams.jpg",
    review:
      "The Readiness Index matched my actual GMAT test score within 10 points. The Data Sufficiency breakdown taught me to catch the absolute-value zero trap every single time.",
    location: "Chicago, USA",
  },
];

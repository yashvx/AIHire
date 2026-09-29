export const MOCK_USER = {
  id: 1,
  full_name: "Alex Vance",
  email: "alex.vance@example.com",
  role: "Senior Fullstack Candidate"
};

export const MOCK_RESUMES = [
  {
    id: 101,
    filename: "Alex_Vance_Software_Engineer_Resume.pdf",
    created_at: "2026-09-20T10:30:00Z",
    status: "analyzed"
  },
  {
    id: 102,
    filename: "Alex_Vance_Backend_Specialist.pdf",
    created_at: "2026-09-15T14:20:00Z",
    status: "analyzed"
  }
];

export const MOCK_RESUME_ANALYSIS = {
  resume_id: 101,
  name: "Alex Vance",
  email: "alex.vance@example.com",
  phone: "+1 (555) 382-9102",
  skills: [
    "Python", "FastAPI", "React", "TypeScript", "PostgreSQL", 
    "Docker", "AWS", "System Design", "REST APIs", "Redis"
  ],
  education: [
    "B.S. in Computer Science, Stanford University (2020 - 2024)"
  ],
  projects: [
    "AI-Powered Interview Coach - FastAPI, OpenAI, React",
    "Distributed Key-Value Store - Go, Raft Consensus",
    "Realtime Collaborative Code Editor - Node.js, WebSockets, CRDTs"
  ],
  experience: [
    "Software Engineering Intern at Stripe (Summer 2023) - Built webhook delivery pipeline processing 2M events/day",
    "Backend Developer at TechCorp (2024 - Present) - Architected microservices with FastAPI and PostgreSQL"
  ],
  strengths: [
    "Strong backend systems architecture knowledge",
    "Hands-on experience with high-throughput API design",
    "Clear project documentation and production readiness focus"
  ],
  gaps: [
    "Limited experience with Kubernetes cluster management",
    "Could deepen knowledge of GraphQL query optimization"
  ]
};

export const MOCK_INTERVIEWS = [
  {
    id: 501,
    user_id: 1,
    resume_id: 101,
    company: "Google",
    role: "Senior Backend Engineer",
    interview_type: "Technical",
    status: "completed",
    score: 88,
    total_questions: 5,
    answered_questions: 5,
    created_at: "2026-09-25T11:00:00Z"
  },
  {
    id: 502,
    user_id: 1,
    resume_id: 101,
    company: "Amazon",
    role: "Systems Architect",
    interview_type: "Behavioral",
    status: "completed",
    score: 92,
    total_questions: 4,
    answered_questions: 4,
    created_at: "2026-09-23T15:30:00Z"
  },
  {
    id: 503,
    user_id: 1,
    resume_id: 101,
    company: "Stripe",
    role: "Full Stack Engineer",
    interview_type: "Mixed",
    status: "in_progress",
    score: null,
    total_questions: 6,
    answered_questions: 2,
    created_at: "2026-09-28T09:15:00Z"
  }
];

export const MOCK_INTERVIEW_QUESTIONS = [
  {
    id: 1001,
    order: 1,
    category: "System Design",
    difficulty: "Hard",
    question: "Walk me through how you would design a rate limiter service for a public REST API processing 100k requests/sec.",
    answer: "I would implement a Token Bucket or Leaky Bucket algorithm using Redis as a distributed in-memory cache. Each API key maps to a Redis key storing current token count and last timestamp. Using Redis Lua scripts ensures atomic updates to prevent race conditions during high concurrency.",
    evaluation: {
      technical_score: 90,
      communication_score: 85,
      relevance_score: 95,
      overall_score: 90,
      feedback: "Excellent architecture choice using Redis and atomic Lua scripts to handle race conditions under high concurrency."
    }
  },
  {
    id: 1002,
    order: 2,
    category: "Databases",
    difficulty: "Medium",
    question: "How do you handle database migration locks and schema evolution in PostgreSQL without causing downtime for read-heavy microservices?",
    answer: "I use multi-phase migrations. For adding columns, I set DEFAULT NULL first to avoid full table rewrites, then backfill in batches. For dropping or modifying columns, I follow a expand-contract pattern: add new column, update code to write to both, backfill old data, switch reads to new column, then drop old column.",
    evaluation: {
      technical_score: 92,
      communication_score: 88,
      relevance_score: 90,
      overall_score: 90,
      feedback: "Great explanation of the expand-contract zero-downtime migration strategy."
    }
  },
  {
    id: 1003,
    order: 3,
    category: "Adaptive AI Follow-up",
    difficulty: "Hard",
    question: "[AI Adaptive Follow-up] In your PostgreSQL expand-contract schema migration strategy, how do you handle rollback procedures if a bug is detected after Phase 2?",
    answer: null,
    evaluation: null
  }
];

export const MOCK_INTERVIEW_REPORT = {
  interview_id: 501,
  company: "Google",
  role: "Senior Backend Engineer",
  interview_type: "Technical",
  status: "completed",
  total_questions: 5,
  answered_questions: 5,
  evaluated_questions: 5,
  completion_percentage: 100,
  overall_score: 89,
  technical_score: 91,
  communication_score: 86,
  relevance_score: 90,
  summary: "Strong performance across distributed systems, caching strategies, and database scalability topics. Communication was structured and concise.",
  strengths: "Clear architectural trade-off evaluations, deep familiarity with Redis atomic primitives, and practical zero-downtime database migration tactics.",
  areas_to_improve: "Incorporate more quantitative metrics when discussing system limits and articulate edge-case handling for cross-region latency.",
  recommendations: "Practice discussing multi-region replication tradeoffs and CAP theorem nuances in complex failure scenarios.",
  created_at: "2026-09-25T11:00:00Z",
  questions: MOCK_INTERVIEW_QUESTIONS
};

export const MOCK_CODING_PROBLEMS = [
  {
    id: 201,
    title: "Two Sum Target Index",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\nOnly one valid answer exists.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    starter_code: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Write your solution here
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []
`
  },
  {
    id: 202,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    description: "Given a string `s`, find the length of the longest substring without repeating characters.",
    constraints: "0 <= s.length <= 5 * 10^4\n`s` consists of English letters, digits, symbols and spaces.",
    examples: [
      {
        input: "s = \"abcabcbb\"",
        output: "3",
        explanation: "The answer is \"abc\", with the length of 3."
      }
    ],
    starter_code: `def length_of_longest_substring(s: str) -> int:
    # Write your solution here
    char_map = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len
`
  }
];

export const MOCK_RECOMMENDATIONS = {
  recommendations: [
    {
      area: "System Architecture",
      priority: "High",
      recommendation: "Focus on caching strategies and rate limiting algorithms.",
      reason: "Your technical interview evaluation showed good conceptual understanding but minor delay in formulating multi-region failovers.",
      practice_action: "Start a System Design Interview focused on Distributed Caching."
    },
    {
      area: "Behavioral Communication",
      priority: "Medium",
      recommendation: "Use the STAR framework explicitly for leadership conflict questions.",
      reason: "Communication scores can increase by structuring situation, task, action, and outcome explicitly.",
      practice_action: "Practice HR / Behavioral Interview module."
    },
    {
      area: "Coding Efficiency",
      priority: "Medium",
      recommendation: "Review space complexity trade-offs in sliding window problems.",
      reason: "Last coding submission passed 100% test cases with standard runtime.",
      practice_action: "Solve Medium String & Array Problems in Coding Lab."
    }
  ]
};

export const MOCK_PROGRESS_STATS = {
  interviews_completed: 12,
  average_score: 87,
  technical_score_avg: 89,
  communication_score_avg: 85,
  coding_problems_solved: 18,
  voice_interviews_completed: 5,
  weekly_trend: [
    { week: "W1", score: 72 },
    { week: "W2", score: 78 },
    { week: "W3", score: 84 },
    { week: "W4", score: 89 }
  ],
  weakest_areas: ["Kubernetes", "GraphQL", "CAP Theorem edge cases"],
  strongest_areas: ["FastAPI", "PostgreSQL schema design", "Redis atomic operations"]
};

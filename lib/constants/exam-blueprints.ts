// Path: lib/constants/exam-blueprints.ts

export interface QuestionCountOption {
  count: number;
  label: string;
  sublabel: string;
  estimatedMinutes: number;
  proOnly: boolean;
  isFullMock?: boolean;
}

export interface ExamBlueprint {
  examName: string;
  officialMockCount: number;
  officialTimeMinutes: number;
  sectionTestCount: number;
  sectionName: string;
  sectionTimeMinutes: number;
  quickDrillCount: number;
  quickDrillMinutes: number;
}

export const EXAM_BLUEPRINTS: Record<string, ExamBlueprint> = {
  "GMAT Focus": {
    examName: "GMAT Focus",
    officialMockCount: 64,
    officialTimeMinutes: 135,
    sectionTestCount: 21,
    sectionName: "Section Test",
    sectionTimeMinutes: 45,
    quickDrillCount: 10,
    quickDrillMinutes: 15,
  },
  "SAT": {
    examName: "Digital SAT",
    officialMockCount: 98,
    officialTimeMinutes: 134,
    sectionTestCount: 27,
    sectionName: "Module Test",
    sectionTimeMinutes: 32,
    quickDrillCount: 10,
    quickDrillMinutes: 15,
  },
  "GRE": {
    examName: "GRE General",
    officialMockCount: 54,
    officialTimeMinutes: 118,
    sectionTestCount: 27,
    sectionName: "Section Test",
    sectionTimeMinutes: 45,
    quickDrillCount: 10,
    quickDrillMinutes: 15,
  },
  "CAT": {
    examName: "CAT (IIM)",
    officialMockCount: 66,
    officialTimeMinutes: 120,
    sectionTestCount: 22,
    sectionName: "Section Test",
    sectionTimeMinutes: 40,
    quickDrillCount: 10,
    quickDrillMinutes: 15,
  },
  "JEE Main": {
    examName: "JEE Main",
    officialMockCount: 75,
    officialTimeMinutes: 180,
    sectionTestCount: 25,
    sectionName: "Subject Test",
    sectionTimeMinutes: 60,
    quickDrillCount: 10,
    quickDrillMinutes: 15,
  },
  "NEET": {
    examName: "NEET",
    officialMockCount: 180,
    officialTimeMinutes: 200,
    sectionTestCount: 45,
    sectionName: "Subject Test",
    sectionTimeMinutes: 50,
    quickDrillCount: 10,
    quickDrillMinutes: 15,
  },
  "CFA Level 1": {
    examName: "CFA Level 1",
    officialMockCount: 90,
    officialTimeMinutes: 135,
    sectionTestCount: 45,
    sectionName: "Half-Session Drill",
    sectionTimeMinutes: 68,
    quickDrillCount: 10,
    quickDrillMinutes: 15,
  },
  "CLAT": {
    examName: "CLAT",
    officialMockCount: 120,
    officialTimeMinutes: 120,
    sectionTestCount: 30,
    sectionName: "Section Drill",
    sectionTimeMinutes: 30,
    quickDrillCount: 10,
    quickDrillMinutes: 15,
  },
  "UPSC CSE": {
    examName: "UPSC CSE",
    officialMockCount: 100,
    officialTimeMinutes: 120,
    sectionTestCount: 50,
    sectionName: "Half Paper Test",
    sectionTimeMinutes: 60,
    quickDrillCount: 10,
    quickDrillMinutes: 15,
  },
  "GATE": {
    examName: "GATE",
    officialMockCount: 65,
    officialTimeMinutes: 180,
    sectionTestCount: 25,
    sectionName: "Core Subject Test",
    sectionTimeMinutes: 60,
    quickDrillCount: 10,
    quickDrillMinutes: 15,
  },
  "IELTS Academic": {
    examName: "IELTS Academic",
    officialMockCount: 40,
    officialTimeMinutes: 60,
    sectionTestCount: 20,
    sectionName: "Passage / Section Test",
    sectionTimeMinutes: 30,
    quickDrillCount: 10,
    quickDrillMinutes: 15,
  },
  "TOEFL iBT": {
    examName: "TOEFL iBT",
    officialMockCount: 48,
    officialTimeMinutes: 71,
    sectionTestCount: 20,
    sectionName: "Reading Section",
    sectionTimeMinutes: 35,
    quickDrillCount: 10,
    quickDrillMinutes: 15,
  },
  "CA Foundation": {
    examName: "CA Foundation",
    officialMockCount: 100,
    officialTimeMinutes: 120,
    sectionTestCount: 25,
    sectionName: "Topic Test",
    sectionTimeMinutes: 30,
    quickDrillCount: 10,
    quickDrillMinutes: 15,
  },
};

const DEFAULT_BLUEPRINT: ExamBlueprint = {
  examName: "Standardized Exam",
  officialMockCount: 50,
  officialTimeMinutes: 75,
  sectionTestCount: 25,
  sectionName: "Standard Set",
  sectionTimeMinutes: 35,
  quickDrillCount: 10,
  quickDrillMinutes: 15,
};

export function getExamBlueprint(examName: string): ExamBlueprint {
  return EXAM_BLUEPRINTS[examName] || DEFAULT_BLUEPRINT;
}

export function getQuestionCountOptions(
  examName: string,
  isTopicPractice: boolean,
): QuestionCountOption[] {
  const bp = getExamBlueprint(examName);

  if (isTopicPractice) {
    return [
      {
        count: 10,
        label: "10 Questions",
        sublabel: "Quick Topic Sprint",
        estimatedMinutes: 15,
        proOnly: false,
      },
      {
        count: 20,
        label: "20 Questions",
        sublabel: "Standard Drill",
        estimatedMinutes: 30,
        proOnly: true,
      },
      {
        count: 30,
        label: "30 Questions",
        sublabel: "Deep Topic Mastery",
        estimatedMinutes: 45,
        proOnly: true,
      },
    ];
  }

  return [
    {
      count: bp.quickDrillCount,
      label: `${bp.quickDrillCount} Questions`,
      sublabel: "Quick Practice",
      estimatedMinutes: bp.quickDrillMinutes,
      proOnly: false,
    },
    {
      count: bp.sectionTestCount,
      label: `${bp.sectionTestCount} Questions`,
      sublabel: bp.sectionName,
      estimatedMinutes: bp.sectionTimeMinutes,
      proOnly: true,
    },
    {
      count: bp.officialMockCount,
      label: `${bp.officialMockCount} Questions`,
      sublabel: "Full Mock Test",
      estimatedMinutes: bp.officialTimeMinutes,
      proOnly: true,
      isFullMock: true,
    },
  ];
}

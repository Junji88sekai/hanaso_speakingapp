export interface Sentence {
  id: string;
  display?: string; // The original prompt text
  display_es?: string;
  display_en?: string;
  display_ja?: string;
  display_it?: string;
  target: string;  // Target answer (usually Japanese)
  romaji?: string; // Romaji pronunciation
  segments?: string[]; // Japanese segments for sorting challenge
}

export interface Lesson {
  id: number;
  title: string;
  title_es?: string;
  title_en?: string;
  title_ja?: string;
  title_it?: string;
  grammar: string;
  grammar_es?: string;
  grammar_en?: string;
  grammar_ja?: string;
  grammar_it?: string;
  unlocks?: string;
  sentences: Sentence[];
}

export interface AppState {
  completedLessons: number[];
  currentLessonId: number | null;
  experience: number;
}

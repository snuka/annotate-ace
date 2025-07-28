export interface TextbookMetadata {
  id: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  isbn: string;
  edition: string;
  subject: string;
  category: string;
  description: string;
  coverImage: string;
  totalPages: number;
  language: string;
}

export interface TextbookChapter {
  id: string;
  title: string;
  startPage: number;
  endPage: number;
  sections: TextbookSection[];
}

export interface TextbookSection {
  id: string;
  title: string;
  startPage: number;
  endPage: number;
}

export interface TextbookPage {
  pageNumber: number;
  content: string;
  chapterId: string;
  sectionId?: string;
}

export interface Textbook {
  metadata: TextbookMetadata;
  chapters: TextbookChapter[];
  pages: TextbookPage[];
}

export interface Annotation {
  id: string;
  textbookId: string;
  pageNumber: number;
  selectedText: string;
  startOffset: number;
  endOffset: number;
  type: 'highlight' | 'note';
  color: 'yellow' | 'green' | 'blue' | 'pink' | 'orange';
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReadingProgress {
  textbookId: string;
  currentPage: number;
  totalTimeRead: number; // in minutes
  pagesRead: number[];
  lastReadAt: Date;
  completionPercentage: number;
}

export interface ReadingSettings {
  fontSize: number;
  fontFamily: 'serif' | 'sans-serif';
  lineHeight: number;
  theme: 'light' | 'dark' | 'sepia';
  pageLayout: 'single' | 'spread';
  fullscreen: boolean;
}

export interface StudySession {
  id: string;
  textbookId: string;
  startTime: Date;
  endTime?: Date;
  pagesRead: number;
  annotationsCreated: number;
}

export interface Flashcard {
  id: string;
  textbookId: string;
  question: string;
  answer: string;
  sourceAnnotationId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: Date;
  nextReview?: Date;
  timesReviewed: number;
  correctCount: number;
}

export interface Citation {
  id: string;
  textbookId: string;
  annotationId: string;
  format: 'APA' | 'MLA' | 'Chicago';
  citationText: string;
  pageNumber: number;
  createdAt: Date;
}
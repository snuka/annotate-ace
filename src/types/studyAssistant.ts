export interface StudyContext {
  type: 'text' | 'page' | 'chapter';
  content: string;
  textbookId: string;
  pageNumber?: number;
  chapterId?: string;
  selectedText?: string;
}

export interface RelatedResource {
  id: string;
  title: string;
  description: string;
  type: 'textbook' | 'khan_academy' | 'youtube' | 'ai_explanation';
  url?: string;
  thumbnail?: string;
  relevanceScore: number;
  textbookPage?: number;
  duration?: string; // for videos
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface AIExplanation {
  id: string;
  topic: string;
  explanation: string;
  examples: string[];
  keyTerms: string[];
  relatedConcepts: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface StudyAssistantState {
  isOpen: boolean;
  currentContext?: StudyContext;
  relatedResources: RelatedResource[];
  aiExplanation?: AIExplanation;
  isLoading: boolean;
  error?: string;
}
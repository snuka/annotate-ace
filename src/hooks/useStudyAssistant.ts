import { useState, useCallback } from 'react';
import { StudyContext, RelatedResource, AIExplanation, StudyAssistantState } from '@/types/studyAssistant';

// Mock data service - in a real app, this would call APIs
const mockSearchResources = async (context: StudyContext): Promise<RelatedResource[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: '1',
      title: 'Khan Academy: Physics Fundamentals',
      description: 'Interactive lessons on basic physics concepts',
      type: 'khan_academy',
      url: 'https://khanacademy.org/physics',
      relevanceScore: 0.95,
      difficulty: 'beginner'
    },
    {
      id: '2', 
      title: 'MIT Physics Lecture',
      description: 'Comprehensive video lecture series',
      type: 'youtube',
      url: 'https://youtube.com/watch?v=example',
      thumbnail: '/placeholder.svg',
      relevanceScore: 0.88,
      duration: '45:30',
      difficulty: 'advanced'
    },
    {
      id: '3',
      title: 'Related Chapter: Mechanics',
      description: 'Chapter 3 discusses similar concepts',
      type: 'textbook',
      relevanceScore: 0.82,
      textbookPage: 67,
      difficulty: 'intermediate'
    }
  ];
};

const mockGenerateExplanation = async (context: StudyContext): Promise<AIExplanation> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    id: '1',
    topic: 'Physics Concepts',
    explanation: 'This concept involves the fundamental principles of motion and forces. When an object is in motion, it follows Newton\'s laws of physics...',
    examples: [
      'A ball thrown in the air follows a parabolic path',
      'A car accelerating from rest demonstrates changing velocity'
    ],
    keyTerms: ['velocity', 'acceleration', 'force', 'motion'],
    relatedConcepts: ['Newton\'s Laws', 'Kinematics', 'Dynamics'],
    difficulty: 'intermediate'
  };
};

export const useStudyAssistant = () => {
  const [state, setState] = useState<StudyAssistantState>({
    isOpen: false,
    relatedResources: [],
    isLoading: false
  });

  const openWithContext = useCallback(async (context: StudyContext) => {
    setState(prev => ({
      ...prev,
      isOpen: true,
      currentContext: context,
      isLoading: true,
      error: undefined
    }));

    try {
      const [resources, explanation] = await Promise.all([
        mockSearchResources(context),
        mockGenerateExplanation(context)
      ]);

      setState(prev => ({
        ...prev,
        relatedResources: resources,
        aiExplanation: explanation,
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to load study resources',
        isLoading: false
      }));
    }
  }, []);

  const close = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false
    }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: undefined
    }));
  }, []);

  return {
    ...state,
    openWithContext,
    close,
    clearError
  };
};
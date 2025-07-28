import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Library from '@/components/Library';
import ReaderView from '@/components/ReaderView';
import StudyDashboard from '@/components/StudyDashboard';
import { dummyTextbooks } from '@/data/dummyTextbooks';
import { Textbook, ReadingProgress, StudySession, Annotation, Flashcard } from '@/types/textbook';
import { BookOpen, BarChart3, Library as LibraryIcon } from 'lucide-react';

type AppView = 'library' | 'reader' | 'dashboard';

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>('library');
  const [selectedBook, setSelectedBook] = useState<Textbook | null>(null);
  
  // Mock data for demo purposes
  const [progress] = useState<ReadingProgress[]>([
    {
      textbookId: 'physics-101',
      currentPage: 25,
      totalTimeRead: 180, // 3 hours
      pagesRead: Array.from({ length: 25 }, (_, i) => i + 1),
      lastReadAt: new Date(),
      completionPercentage: 7.1
    },
    {
      textbookId: 'calc-advanced',
      currentPage: 15,
      totalTimeRead: 120, // 2 hours
      pagesRead: Array.from({ length: 15 }, (_, i) => i + 1),
      lastReadAt: new Date(Date.now() - 86400000), // yesterday
      completionPercentage: 2.9
    }
  ]);

  const [sessions] = useState<StudySession[]>([
    {
      id: '1',
      textbookId: 'physics-101',
      startTime: new Date(Date.now() - 3600000),
      endTime: new Date(),
      pagesRead: 5,
      annotationsCreated: 3
    }
  ]);

  const [annotations] = useState<Annotation[]>([
    {
      id: '1',
      textbookId: 'physics-101',
      pageNumber: 1,
      selectedText: 'Kinematics is the branch of mechanics that describes the motion of objects',
      startOffset: 0,
      endOffset: 70,
      type: 'highlight',
      color: 'yellow',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      textbookId: 'physics-101',
      pageNumber: 2,
      selectedText: 'v = dx/dt',
      startOffset: 0,
      endOffset: 9,
      type: 'note',
      color: 'blue',
      note: 'This is the fundamental equation for instantaneous velocity',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const [flashcards] = useState<Flashcard[]>([
    {
      id: '1',
      textbookId: 'physics-101',
      question: 'What is kinematics?',
      answer: 'The branch of mechanics that describes the motion of objects without considering the forces that cause the motion',
      sourceAnnotationId: '1',
      difficulty: 'medium',
      timesReviewed: 3,
      correctCount: 2
    }
  ]);

  const handleOpenBook = (book: Textbook) => {
    setSelectedBook(book);
    setCurrentView('reader');
  };

  const handleBackToLibrary = () => {
    setCurrentView('library');
    setSelectedBook(null);
  };

  const handleGoToDashboard = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Navigation */}
      {currentView !== 'reader' && (
        <nav className="fixed top-4 right-4 z-50">
          <div className="flex gap-2 bg-card/80 backdrop-blur border rounded-lg p-2">
            <Button
              variant={currentView === 'library' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('library')}
              className="flex items-center gap-2"
            >
              <LibraryIcon className="h-4 w-4" />
              Library
            </Button>
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={handleGoToDashboard}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Button>
          </div>
        </nav>
      )}

      {/* Main Content */}
      {currentView === 'library' && (
        <Library onOpenBook={handleOpenBook} />
      )}
      
      {currentView === 'reader' && selectedBook && (
        <ReaderView 
          book={selectedBook} 
          onBack={handleBackToLibrary}
        />
      )}
      
      {currentView === 'dashboard' && (
        <StudyDashboard
          books={dummyTextbooks}
          progress={progress}
          sessions={sessions}
          annotations={annotations}
          flashcards={flashcards}
          onOpenBook={handleOpenBook}
        />
      )}
    </div>
  );
};

export default Index;

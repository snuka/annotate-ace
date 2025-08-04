import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  Settings, 
  Search, 
  Bookmark, 
  HighlighterIcon,
  StickyNote,
  Menu,
  Brain
} from 'lucide-react';
import { Textbook } from '@/types/textbook';
import { getPageContent, getChapterByPage } from '@/data/dummyTextbooks';
import TableOfContents from './reader/TableOfContents';
import ReaderSettings from './reader/ReaderSettings';
import AnnotationSearch from './reader/AnnotationSearch';
import { StudyAssistant } from './study-assistant/StudyAssistant';
import { StudyDropdown } from './reader/StudyDropdown';
import UnifiedDrawer from './reader/UnifiedDrawer';
import { useStudyAssistant } from '@/hooks/useStudyAssistant';
import { ReadingSettings, Annotation } from '@/types/textbook';
import { StudyContext } from '@/types/studyAssistant';

interface ReaderViewProps {
  book: Textbook;
  onBack: () => void;
}

export default function ReaderView({ book, onBack }: ReaderViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showTOC, setShowTOC] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAnnotationSearch, setShowAnnotationSearch] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'annotation' | 'study' | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  
  // Study Assistant
  const studyAssistant = useStudyAssistant();

  const pageContentRef = useRef<HTMLDivElement>(null);

  const [settings, setSettings] = useState<ReadingSettings>({
    fontSize: 16,
    fontFamily: 'serif',
    lineHeight: 1.6,
    theme: 'light',
    pageLayout: 'spread'
  });

  const leftPageNumber = settings.pageLayout === 'spread' && currentPage % 2 === 0 ? currentPage - 1 : currentPage;
  const rightPageNumber = settings.pageLayout === 'spread' ? leftPageNumber + 1 : null;

  const leftPageContent = getPageContent(book.metadata.id, leftPageNumber);
  const rightPageContent = rightPageNumber ? getPageContent(book.metadata.id, rightPageNumber) : null;
  const currentChapter = getChapterByPage(book.metadata.id, currentPage);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        setSelectedText(selection.toString().trim());
        setSelectionRange(selection.getRangeAt(0).cloneRange());
        setDrawerMode('annotation');
      }
      // Don't automatically close annotation drawer when selection is cleared
      // The drawer should only close via explicit user action or annotation completion
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return; // Don't interfere with input fields
      }
      
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        e.preventDefault();
        prevPage();
      } else if (e.key === 'ArrowRight' && currentPage < book.metadata.totalPages) {
        e.preventDefault();
        nextPage();
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, book.metadata.totalPages]);

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= book.metadata.totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = () => {
    const increment = settings.pageLayout === 'spread' ? 2 : 1;
    goToPage(currentPage + increment);
  };

  const prevPage = () => {
    const decrement = settings.pageLayout === 'spread' ? 2 : 1;
    goToPage(currentPage - decrement);
  };

  const handleAnnotation = (annotation: Omit<Annotation, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAnnotation: Annotation = {
      ...annotation,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    console.log('Adding new annotation:', newAnnotation);
    setAnnotations(prev => {
      const updated = [...prev, newAnnotation];
      console.log('Updated annotations array:', updated);
      return updated;
    });
    
    // Clear selection immediately to prevent interference
    if (window.getSelection) {
      window.getSelection()?.removeAllRanges();
    }
    
    // Clear state after a brief delay to ensure proper rendering
    setTimeout(() => {
      setDrawerMode(null);
      setSelectedText('');
      setSelectionRange(null);
    }, 100);
  };

  const handleStudySelection = () => {
    if (selectedText) {
      const context: StudyContext = {
        type: 'text',
        content: leftPageContent || '',
        textbookId: book.metadata.id,
        pageNumber: currentPage,
        chapterId: currentChapter?.id,
        selectedText: selectedText
      };
      studyAssistant.openWithContext(context);
      setDrawerMode('study');
    }
  };

  const handleStudyPage = (context: StudyContext) => {
    studyAssistant.openWithContext(context);
    setDrawerMode('study');
  };

  const handleStudyChapter = (context: StudyContext) => {
    studyAssistant.openWithContext(context);
    setDrawerMode('study');
  };

  const getHighlightedContent = (content: string, pageNum: number) => {
    const pageAnnotations = annotations.filter(ann => ann.pageNumber === pageNum && ann.type === 'highlight');
    
    console.log(`Getting highlights for page ${pageNum}:`, pageAnnotations);
    console.log('Total annotations:', annotations);
    
    if (pageAnnotations.length === 0) {
      return content;
    }
    
    // Sort annotations by length (longest first) to avoid conflicts
    const sortedAnnotations = [...pageAnnotations].sort((a, b) => b.selectedText.length - a.selectedText.length);
    
    let highlightedContent = content;
    
    sortedAnnotations.forEach(annotation => {
      const highlightClass = `highlight highlight-${annotation.color}`;
      console.log(`Applying highlight to text: "${annotation.selectedText}" with class: ${highlightClass}`);
      
      // Check if this annotation is already applied
      if (highlightedContent.includes(`data-annotation-id="${annotation.id}"`)) {
        return; // Skip if already highlighted
      }
      
      // Use a more robust replacement that handles the first occurrence
      const escapedText = annotation.selectedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedText);
      
      highlightedContent = highlightedContent.replace(regex, (match) => {
        return `<span class="${highlightClass}" data-annotation-id="${annotation.id}">${match}</span>`;
      });
    });
    
    return highlightedContent;
  };

  return (
    <div className={`h-screen bg-reader-page transition-all duration-300 flex flex-col ${
      settings.theme === 'dark' ? 'dark' : settings.theme === 'sepia' ? 'sepia' : ''
    }`}>
      
      {/* Auto-hiding Header */}
      <div className="group relative">
        <header className="absolute top-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-b px-4 py-3 transform -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Library
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="font-semibold text-reader-heading line-clamp-1">{book.metadata.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {currentChapter?.title} • Page {currentPage} of {book.metadata.totalPages}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowAnnotationSearch(true)}>
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowTOC(true)}>
                <Menu className="h-4 w-4" />
              </Button>
              
              <StudyDropdown
                currentPage={currentPage}
                currentChapter={currentChapter}
                textbookId={book.metadata.id}
                pageContent={leftPageContent || ''}
                onStudyPage={handleStudyPage}
                onStudyChapter={handleStudyChapter}
              />
              
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
        
        {/* Hover trigger area */}
        <div className="absolute top-0 left-0 right-0 h-16 z-30"></div>
      </div>

      {/* Reader Content - Fixed Height */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-hidden">
          
          {/* Page Content - Fixed Height Container */}
          <div className={`h-full grid gap-3 ${
            settings.pageLayout === 'spread' && rightPageContent ? 'grid-cols-2' : 'grid-cols-1'
          }`}>
            {/* Left/Single Page */}
            <Card className="bg-reader-page border-border/50 shadow-lg flex flex-col relative" style={{ height: 'calc(100vh - 48px)' }}>
              <div 
                ref={pageContentRef}
                className="flex-1 p-8 reader-text reader-content overflow-y-auto"
                style={{
                  fontSize: `${settings.fontSize}px`,
                  lineHeight: settings.lineHeight,
                  fontFamily: settings.fontFamily === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif'
                }}
                dangerouslySetInnerHTML={{
                  __html: leftPageContent ? getHighlightedContent(leftPageContent, leftPageNumber) : '<p>Page not found</p>'
                }}
              />
              <div className="absolute bottom-4 right-4 text-sm text-muted-foreground px-2 py-1">
                {leftPageNumber}
              </div>
            </Card>

            {/* Right Page (if spread layout) */}
            {settings.pageLayout === 'spread' && rightPageContent && (
              <Card className="bg-reader-page border-border/50 shadow-lg flex flex-col relative" style={{ height: 'calc(100vh - 48px)' }}>
                <div 
                  className="flex-1 p-8 reader-text reader-content overflow-y-auto"
                  style={{
                    fontSize: `${settings.fontSize}px`,
                    lineHeight: settings.lineHeight,
                    fontFamily: settings.fontFamily === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: getHighlightedContent(rightPageContent, rightPageNumber!)
                  }}
                />
                <div className="absolute bottom-4 right-4 text-sm text-muted-foreground px-2 py-1">
                  {rightPageNumber}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Auto-hiding Bottom Navigation */}
        <div className="group relative">
          {/* Hover trigger area */}
          <div className="absolute bottom-0 left-0 right-0 h-16 z-30"></div>
          
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-card/95 backdrop-blur-sm border-t transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 z-40">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={prevPage}
                disabled={currentPage <= 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {currentPage} of {book.metadata.totalPages}
                </span>
                <div className="w-48 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentPage / book.metadata.totalPages) * 100}%` }}
                  />
                </div>
              </div>

              <Button 
                variant="ghost" 
                size="sm"
                onClick={nextPage}
                disabled={currentPage >= book.metadata.totalPages}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Drawer */}
      <UnifiedDrawer
        isOpen={drawerMode !== null}
        isStudyExpanded={studyAssistant.isOpen}
        onClose={() => {
          setDrawerMode(null);
          setSelectedText('');
          setSelectionRange(null);
          if (drawerMode === 'study') {
            studyAssistant.close();
          }
        }}
        selectedText={selectedText}
        textbookId={book.metadata.id}
        pageNumber={currentPage}
        onAnnotate={handleAnnotation}
        onCreateCitation={() => {
          console.log('Create citation for:', selectedText);
        }}
        onCreateFlashcard={() => {
          console.log('Create flashcard for:', selectedText);
        }}
        onStudy={handleStudySelection}
        studyAssistant={{
          ...studyAssistant,
          close: () => {
            studyAssistant.close();
            setDrawerMode(null);
          }
        }}
        onNavigateToPage={goToPage}
      />

      {/* Focus Mode Overlay */}
      {focusMode && (
        <div className="fixed inset-0 bg-focus-overlay z-40" onClick={() => setFocusMode(false)} />
      )}

      {/* Side Panels */}
      <TableOfContents 
        book={book}
        currentPage={currentPage}
        isOpen={showTOC}
        onClose={() => setShowTOC(false)}
        onPageSelect={goToPage}
        onStudyChapter={handleStudyChapter}
        onStudySection={handleStudyChapter}
      />

      <ReaderSettings
        settings={settings}
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSettingsChange={setSettings}
      />

      <AnnotationSearch
        book={book}
        annotations={annotations}
        isOpen={showAnnotationSearch}
        onClose={() => setShowAnnotationSearch(false)}
        onNavigateToAnnotation={(pageNumber) => {
          goToPage(pageNumber);
          setShowAnnotationSearch(false);
        }}
      />

    </div>
  );
}
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
  Menu
} from 'lucide-react';
import { Textbook } from '@/types/textbook';
import { getPageContent, getChapterByPage } from '@/data/dummyTextbooks';
import TableOfContents from './reader/TableOfContents';
import ReaderSettings from './reader/ReaderSettings';
import AnnotationTools from './reader/AnnotationTools';
import AnnotationSearch from './reader/AnnotationSearch';
import { ReadingSettings, Annotation } from '@/types/textbook';

interface ReaderViewProps {
  book: Textbook;
  onBack: () => void;
}

export default function ReaderView({ book, onBack }: ReaderViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showTOC, setShowTOC] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAnnotationSearch, setShowAnnotationSearch] = useState(false);
  const [showAnnotationTools, setShowAnnotationTools] = useState(false);
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

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
        setShowAnnotationTools(true);
      } else {
        setSelectedText('');
        setSelectionRange(null);
        setShowAnnotationTools(false);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
    };
  }, []);

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
    setAnnotations(prev => [...prev, newAnnotation]);
    setShowAnnotationTools(false);
    setSelectedText('');
    setSelectionRange(null);
  };

  const getHighlightedContent = (content: string, pageNum: number) => {
    let highlightedContent = content;
    const pageAnnotations = annotations.filter(ann => ann.pageNumber === pageNum && ann.type === 'highlight');
    
    pageAnnotations.forEach(annotation => {
      const highlightClass = `highlight highlight-${annotation.color}`;
      highlightedContent = highlightedContent.replace(
        annotation.selectedText,
        `<span class="${highlightClass}" data-annotation-id="${annotation.id}">${annotation.selectedText}</span>`
      );
    });
    
    return highlightedContent;
  };

  return (
    <div className={`min-h-screen bg-reader-page transition-all duration-300 ${
      settings.theme === 'dark' ? 'dark' : settings.theme === 'sepia' ? 'sepia' : ''
    }`}>
      
      {/* Header */}
      <header className="bg-card/80 backdrop-blur border-b px-4 py-3">
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
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

      {/* Reader Content */}
      <div className="flex-1 relative">
        <div className="max-w-7xl mx-auto p-6">
          
          {/* Page Content */}
          <div className={`grid gap-8 ${
            settings.pageLayout === 'spread' && rightPageContent ? 'grid-cols-2' : 'grid-cols-1'
          }`}>
            {/* Left/Single Page */}
            <Card className="bg-reader-page border-border/50 shadow-lg">
              <div 
                ref={pageContentRef}
                className="p-8 reader-text reader-scroll overflow-y-auto"
                style={{
                  fontSize: `${settings.fontSize}px`,
                  lineHeight: settings.lineHeight,
                  fontFamily: settings.fontFamily === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif',
                  minHeight: '800px'
                }}
                dangerouslySetInnerHTML={{
                  __html: leftPageContent ? getHighlightedContent(leftPageContent, leftPageNumber) : '<p>Page not found</p>'
                }}
              />
              <div className="px-8 pb-4 text-center text-sm text-muted-foreground border-t">
                Page {leftPageNumber}
              </div>
            </Card>

            {/* Right Page (if spread layout) */}
            {settings.pageLayout === 'spread' && rightPageContent && (
              <Card className="bg-reader-page border-border/50 shadow-lg">
                <div 
                  className="p-8 reader-text reader-scroll overflow-y-auto"
                  style={{
                    fontSize: `${settings.fontSize}px`,
                    lineHeight: settings.lineHeight,
                    fontFamily: settings.fontFamily === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif',
                    minHeight: '800px'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: getHighlightedContent(rightPageContent, rightPageNumber!)
                  }}
                />
                <div className="px-8 pb-4 text-center text-sm text-muted-foreground border-t">
                  Page {rightPageNumber}
                </div>
              </Card>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button 
              variant="outline" 
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
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(currentPage / book.metadata.totalPages) * 100}%` }}
                />
              </div>
            </div>

            <Button 
              variant="outline" 
              onClick={nextPage}
              disabled={currentPage >= book.metadata.totalPages}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Annotation Tools Overlay */}
        {showAnnotationTools && selectedText && (
          <AnnotationTools
            selectedText={selectedText}
            textbookId={book.metadata.id}
            pageNumber={currentPage}
            onAnnotate={handleAnnotation}
            onClose={() => setShowAnnotationTools(false)}
          />
        )}

        {/* Focus Mode Overlay */}
        {focusMode && (
          <div className="fixed inset-0 bg-focus-overlay z-40" onClick={() => setFocusMode(false)} />
        )}
      </div>

      {/* Side Panels */}
      <TableOfContents 
        book={book}
        currentPage={currentPage}
        isOpen={showTOC}
        onClose={() => setShowTOC(false)}
        onPageSelect={goToPage}
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
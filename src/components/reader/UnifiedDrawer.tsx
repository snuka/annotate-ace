import { useState } from 'react';
import { X, HighlighterIcon, StickyNote, Quote, Target, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Annotation } from '@/types/textbook';
import { StudyAssistantState } from '@/types/studyAssistant';
import { RelatedResourceCard } from '../study-assistant/RelatedResourceCard';
import { AIExplanationCard } from '../study-assistant/AIExplanationCard';

interface UnifiedDrawerProps {
  // Common props
  isOpen: boolean;
  onClose: () => void;
  isStudyExpanded?: boolean;
  
  // Annotation props
  selectedText?: string;
  textbookId?: string;
  pageNumber?: number;
  onAnnotate?: (annotation: Omit<Annotation, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCreateCitation?: () => void;
  onCreateFlashcard?: () => void;
  onStudy?: () => void;
  
  // Study assistant props
  studyAssistant?: StudyAssistantState & { close: () => void };
  onNavigateToPage?: (pageNumber: number) => void;
}

const highlightColors: Array<{ color: Annotation['color']; label: string; className: string }> = [
  { color: 'yellow', label: 'Yellow', className: 'bg-highlight-yellow' },
  { color: 'green', label: 'Green', className: 'bg-highlight-green' },
  { color: 'blue', label: 'Blue', className: 'bg-highlight-blue' },
  { color: 'pink', label: 'Pink', className: 'bg-highlight-pink' },
  { color: 'orange', label: 'Orange', className: 'bg-highlight-orange' },
];

export default function UnifiedDrawer({
  isOpen,
  onClose,
  isStudyExpanded = false,
  selectedText = '',
  textbookId = '',
  pageNumber = 0,
  onAnnotate,
  onCreateCitation,
  onCreateFlashcard,
  onStudy,
  studyAssistant,
  onNavigateToPage
}: UnifiedDrawerProps) {
  const [studyExpanded, setStudyExpanded] = useState(isStudyExpanded);
  const [annotationMode, setAnnotationMode] = useState<'highlight' | 'note'>('highlight');
  const [selectedColor, setSelectedColor] = useState<Annotation['color']>('yellow');
  const [noteText, setNoteText] = useState('');

  if (!isOpen) return null;

  const handleHighlight = () => {
    if (!onAnnotate) return;
    onAnnotate({
      textbookId,
      pageNumber,
      selectedText,
      startOffset: 0,
      endOffset: selectedText.length,
      type: 'highlight',
      color: selectedColor
    });
  };

  const handleNote = () => {
    if (!noteText.trim() || !onAnnotate) return;
    
    onAnnotate({
      textbookId,
      pageNumber,
      selectedText,
      startOffset: 0,
      endOffset: selectedText.length,
      type: 'note',
      color: selectedColor,
      note: noteText
    });
    setNoteText('');
  };

  const handleStudyClick = () => {
    setStudyExpanded(!studyExpanded);
    if (onStudy) {
      onStudy();
    }
  };

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      
      {/* Selection highlight styling - scoped to main content only */}
      <style>{`
        .reader-content ::selection {
          background-color: hsl(var(--highlight-${selectedColor})) !important;
          color: hsl(var(--foreground)) !important;
        }
        .reader-content ::-moz-selection {
          background-color: hsl(var(--highlight-${selectedColor})) !important;
          color: hsl(var(--foreground)) !important;
        }
      `}</style>
      
      {/* Right-side drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-96 bg-background border-l shadow-lg animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <HighlighterIcon className="h-5 w-5" />
            <h2 className="font-semibold">Add Annotation</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Page info */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">Page {pageNumber}</Badge>
              <span>•</span>
              <span>{selectedText.length} characters selected</span>
            </div>

            {/* Annotation Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Annotation Type</label>
              <div className="flex gap-2">
                <Button
                  variant={annotationMode === 'highlight' ? 'default' : 'outline'}
                  onClick={() => setAnnotationMode('highlight')}
                  className="flex items-center gap-2 flex-1"
                  size="sm"
                >
                  <HighlighterIcon className="h-4 w-4" />
                  Highlight
                </Button>
                <Button
                  variant={annotationMode === 'note' ? 'default' : 'outline'}
                  onClick={() => setAnnotationMode('note')}
                  className="flex items-center gap-2 flex-1"
                  size="sm"
                >
                  <StickyNote className="h-4 w-4" />
                  Note
                </Button>
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Highlight Color</label>
              <div className="grid grid-cols-2 gap-2">
                {highlightColors.map(({ color, label, className }) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                    className="flex items-center gap-2 justify-start text-xs"
                  >
                    <div className={`w-3 h-3 rounded ${className} border`} />
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Note Text (if note mode) */}
            {annotationMode === 'note' && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Note</label>
                <Textarea
                  placeholder="Add your note here..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={4}
                  className="resize-none text-sm"
                />
              </div>
            )}

            {/* Quick Actions */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Quick Actions</label>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleStudyClick} 
                  className="flex items-center gap-2 text-xs"
                >
                  <Brain className="h-3 w-3" />
                  Study
                </Button>
                {onCreateCitation && (
                  <Button variant="outline" size="sm" onClick={onCreateCitation} className="flex items-center gap-2 text-xs">
                    <Quote className="h-3 w-3" />
                    Cite
                  </Button>
                )}
                {onCreateFlashcard && (
                  <Button variant="outline" size="sm" onClick={onCreateFlashcard} className="flex items-center gap-2 text-xs">
                    <Target className="h-3 w-3" />
                    Flashcard
                  </Button>
                )}
              </div>
            </div>

            {/* Study Section - Expandable */}
            <Collapsible open={studyExpanded} onOpenChange={setStudyExpanded}>
              <CollapsibleContent className="space-y-4">
                {studyAssistant && (
                  <div className="border-t pt-4">
                    <div className="space-y-4">
                      {/* Current Context */}
                      {studyAssistant.currentContext && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Studying:</h4>
                          <div className="text-sm text-muted-foreground">
                            <Badge variant="secondary" className="mb-2">
                              {studyAssistant.currentContext.type === 'text' ? 'Selected Text' : 
                               studyAssistant.currentContext.type === 'page' ? 'Current Page' : 'Chapter'}
                            </Badge>
                            {studyAssistant.currentContext.selectedText && (
                              <p className="italic">"{studyAssistant.currentContext.selectedText.slice(0, 100)}..."</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Error handling */}
                      {studyAssistant.error && (
                        <Alert variant="destructive">
                          <AlertDescription>{studyAssistant.error}</AlertDescription>
                        </Alert>
                      )}

                      {/* Content Tabs */}
                      <Tabs defaultValue="resources" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="resources">Resources</TabsTrigger>
                          <TabsTrigger value="explanation">AI Help</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="resources" className="mt-4">
                          <ScrollArea className="h-[200px]">
                            <div className="space-y-3">
                              {studyAssistant.isLoading ? (
                                // Loading skeletons
                                Array.from({ length: 2 }).map((_, i) => (
                                  <div key={i} className="space-y-2">
                                    <Skeleton className="h-3 w-3/4" />
                                    <Skeleton className="h-2 w-full" />
                                    <Skeleton className="h-2 w-1/2" />
                                  </div>
                                ))
                              ) : (
                                studyAssistant.relatedResources.map((resource) => (
                                  <RelatedResourceCard
                                    key={resource.id}
                                    resource={resource}
                                    onNavigateToPage={onNavigateToPage}
                                  />
                                ))
                              )}
                            </div>
                          </ScrollArea>
                        </TabsContent>
                        
                        <TabsContent value="explanation" className="mt-4">
                          <ScrollArea className="h-[200px]">
                            {studyAssistant.isLoading ? (
                              <div className="space-y-3">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-3/4" />
                              </div>
                            ) : studyAssistant.aiExplanation ? (
                              <AIExplanationCard explanation={studyAssistant.aiExplanation} />
                            ) : null}
                          </ScrollArea>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose} className="flex-1" size="sm">
                Cancel
              </Button>
              <Button 
                onClick={annotationMode === 'highlight' ? handleHighlight : handleNote}
                disabled={annotationMode === 'note' && !noteText.trim()}
                className="flex-1"
                size="sm"
              >
                {annotationMode === 'highlight' ? 'Add Highlight' : 'Add Note'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
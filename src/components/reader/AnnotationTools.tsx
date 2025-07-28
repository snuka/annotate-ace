import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, HighlighterIcon, StickyNote, Quote, Target, Brain } from 'lucide-react';
import { Annotation } from '@/types/textbook';

interface AnnotationToolsProps {
  selectedText: string;
  textbookId: string;
  pageNumber: number;
  onAnnotate: (annotation: Omit<Annotation, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
  onCreateCitation?: () => void;
  onCreateFlashcard?: () => void;
  onStudy?: () => void;
}

const highlightColors: Array<{ color: Annotation['color']; label: string; className: string }> = [
  { color: 'yellow', label: 'Yellow', className: 'bg-highlight-yellow' },
  { color: 'green', label: 'Green', className: 'bg-highlight-green' },
  { color: 'blue', label: 'Blue', className: 'bg-highlight-blue' },
  { color: 'pink', label: 'Pink', className: 'bg-highlight-pink' },
  { color: 'orange', label: 'Orange', className: 'bg-highlight-orange' },
];

export default function AnnotationTools({
  selectedText,
  textbookId,
  pageNumber,
  onAnnotate,
  onClose,
  onCreateCitation,
  onCreateFlashcard,
  onStudy
}: AnnotationToolsProps) {
  const [mode, setMode] = useState<'highlight' | 'note'>('highlight');
  const [selectedColor, setSelectedColor] = useState<Annotation['color']>('yellow');
  const [noteText, setNoteText] = useState('');

  const handleHighlight = () => {
    onAnnotate({
      textbookId,
      pageNumber,
      selectedText,
      startOffset: 0, // In a real implementation, this would be calculated
      endOffset: selectedText.length,
      type: 'highlight',
      color: selectedColor
    });
  };

  const handleNote = () => {
    if (!noteText.trim()) return;
    
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">Add Annotation</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Selected Text */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Selected Text</label>
            <div className="p-3 bg-muted rounded-lg border">
              <p className="text-sm italic">"{selectedText}"</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">Page {pageNumber}</Badge>
              <span>•</span>
              <span>{selectedText.length} characters</span>
            </div>
          </div>

          {/* Annotation Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Annotation Type</label>
            <div className="flex gap-2">
              <Button
                variant={mode === 'highlight' ? 'default' : 'outline'}
                onClick={() => setMode('highlight')}
                className="flex items-center gap-2"
              >
                <HighlighterIcon className="h-4 w-4" />
                Highlight
              </Button>
              <Button
                variant={mode === 'note' ? 'default' : 'outline'}
                onClick={() => setMode('note')}
                className="flex items-center gap-2"
              >
                <StickyNote className="h-4 w-4" />
                Note
              </Button>
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Highlight Color</label>
            <div className="flex gap-2">
              {highlightColors.map(({ color, label, className }) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedColor(color)}
                  className="flex items-center gap-2"
                >
                  <div className={`w-3 h-3 rounded ${className} border`} />
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Note Text (if note mode) */}
          {mode === 'note' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Note</label>
              <Textarea
                placeholder="Add your note here..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          )}

          {/* Preview */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Preview</label>
            <div className="p-3 bg-muted rounded-lg border">
              <span 
                className={`highlight highlight-${selectedColor} px-1 py-0.5 rounded`}
              >
                {selectedText}
              </span>
              {mode === 'note' && noteText && (
                <div className="mt-2 p-2 bg-background border-l-2 border-primary">
                  <p className="text-sm">{noteText}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 justify-center">
            {onStudy && (
              <Button variant="outline" size="sm" onClick={onStudy} className="flex items-center gap-2">
                <Brain className="h-3 w-3" />
                Study
              </Button>
            )}
            {onCreateCitation && (
              <Button variant="outline" size="sm" onClick={onCreateCitation} className="flex items-center gap-2">
                <Quote className="h-3 w-3" />
                Cite
              </Button>
            )}
            {onCreateFlashcard && (
              <Button variant="outline" size="sm" onClick={onCreateFlashcard} className="flex items-center gap-2">
                <Target className="h-3 w-3" />
                Flashcard
              </Button>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={mode === 'highlight' ? handleHighlight : handleNote}
              disabled={mode === 'note' && !noteText.trim()}
            >
              {mode === 'highlight' ? 'Add Highlight' : 'Add Note'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
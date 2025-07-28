import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Target, X, Lightbulb, BookOpen } from 'lucide-react';
import { Annotation, Flashcard } from '@/types/textbook';
import { useToast } from '@/hooks/use-toast';

interface FlashcardCreatorProps {
  annotation: Annotation;
  isOpen: boolean;
  onClose: () => void;
  onCreateFlashcard: (flashcard: Omit<Flashcard, 'id' | 'lastReviewed' | 'nextReview' | 'timesReviewed' | 'correctCount'>) => void;
}

export default function FlashcardCreator({
  annotation,
  isOpen,
  onClose,
  onCreateFlashcard
}: FlashcardCreatorProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(annotation.note || annotation.selectedText);
  const [difficulty, setDifficulty] = useState<Flashcard['difficulty']>('medium');
  const { toast } = useToast();

  if (!isOpen) return null;

  const suggestedQuestions = [
    `What is ${annotation.selectedText.split(' ').slice(0, 3).join(' ')}?`,
    `Define: ${annotation.selectedText.split(' ').slice(0, 5).join(' ')}`,
    `Explain the concept of ${annotation.selectedText.split(' ').slice(0, 4).join(' ')}`,
    `What does "${annotation.selectedText}" mean?`
  ];

  const handleCreate = () => {
    if (!question.trim() || !answer.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a question and an answer.",
        variant: "destructive",
      });
      return;
    }

    onCreateFlashcard({
      textbookId: annotation.textbookId,
      question: question.trim(),
      answer: answer.trim(),
      sourceAnnotationId: annotation.id,
      difficulty
    });

    toast({
      title: "Flashcard created!",
      description: "Your flashcard has been added to the study deck.",
    });

    onClose();
  };

  const useSuggestedQuestion = (suggested: string) => {
    setQuestion(suggested);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5" />
            Create Flashcard
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Source Information */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Source Text</h3>
            <div className="p-3 bg-muted rounded-lg border">
              <p className="text-sm italic">"{annotation.selectedText}"</p>
              {annotation.note && (
                <div className="mt-2 pt-2 border-t">
                  <p className="text-xs text-muted-foreground">Your note: {annotation.note}</p>
                </div>
              )}
              <div className="mt-2 pt-2 border-t">
                <Badge variant="outline" className="text-xs">
                  Page {annotation.pageNumber}
                </Badge>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="space-y-3">
            <Label htmlFor="question" className="text-sm font-medium">Question</Label>
            <Input
              id="question"
              placeholder="Enter the question for this flashcard..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            
            {/* Suggested Questions */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lightbulb className="h-3 w-3" />
                <span>Suggested questions:</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {suggestedQuestions.map((suggested, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => useSuggestedQuestion(suggested)}
                    className="text-left justify-start h-auto p-2 text-xs"
                  >
                    {suggested}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Answer */}
          <div className="space-y-2">
            <Label htmlFor="answer" className="text-sm font-medium">Answer</Label>
            <Textarea
              id="answer"
              placeholder="Enter the answer to this question..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Difficulty Level</Label>
            <Select value={difficulty} onValueChange={(value: Flashcard['difficulty']) => setDifficulty(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy - Simple recall</SelectItem>
                <SelectItem value="medium">Medium - Moderate complexity</SelectItem>
                <SelectItem value="hard">Hard - Complex analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Question Side */}
              <Card className="border-primary/20">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <Badge variant="outline" className="text-xs">Question</Badge>
                    <p className="text-sm font-medium">
                      {question || "Your question will appear here..."}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Answer Side */}
              <Card className="border-secondary/20">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <Badge variant="secondary" className="text-xs">Answer</Badge>
                    <p className="text-sm">
                      {answer || "Your answer will appear here..."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreate}
              disabled={!question.trim() || !answer.trim()}
            >
              Create Flashcard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
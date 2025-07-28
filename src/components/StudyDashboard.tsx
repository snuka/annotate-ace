import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  HighlighterIcon,
  StickyNote,
  GraduationCap,
  Quote
} from 'lucide-react';
import { Textbook, ReadingProgress, StudySession, Annotation, Flashcard } from '@/types/textbook';

interface StudyDashboardProps {
  books: Textbook[];
  progress: ReadingProgress[];
  sessions: StudySession[];
  annotations: Annotation[];
  flashcards: Flashcard[];
  onOpenBook: (book: Textbook) => void;
}

export default function StudyDashboard({
  books,
  progress,
  sessions,
  annotations,
  flashcards,
  onOpenBook
}: StudyDashboardProps) {
  const totalReadingTime = sessions.reduce((total, session) => {
    const sessionTime = session.endTime 
      ? (new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / (1000 * 60)
      : 0;
    return total + sessionTime;
  }, 0);

  const totalAnnotations = annotations.length;
  const highlightCount = annotations.filter(a => a.type === 'highlight').length;
  const noteCount = annotations.filter(a => a.type === 'note').length;

  const recentlyRead = progress
    .sort((a, b) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime())
    .slice(0, 3)
    .map(p => books.find(b => b.metadata.id === p.textbookId))
    .filter(Boolean) as Textbook[];

  const averageCompletion = progress.length > 0 
    ? progress.reduce((sum, p) => sum + p.completionPercentage, 0) / progress.length 
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-reader-heading">Study Dashboard</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="annotations">Annotations</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Reading Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(totalReadingTime)}min</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(totalReadingTime / 60)}h {Math.round(totalReadingTime % 60)}m total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Books in Progress</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{progress.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(averageCompletion)}% average completion
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Annotations</CardTitle>
                  <HighlighterIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalAnnotations}</div>
                  <p className="text-xs text-muted-foreground">
                    {highlightCount} highlights, {noteCount} notes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Flashcards</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{flashcards.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Ready for review
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recently Read */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Continue Reading
                </CardTitle>
                <CardDescription>
                  Pick up where you left off
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentlyRead.map(book => {
                    const bookProgress = progress.find(p => p.textbookId === book.metadata.id);
                    return (
                      <Card 
                        key={book.metadata.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => onOpenBook(book)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base line-clamp-1">{book.metadata.title}</CardTitle>
                          <CardDescription className="line-clamp-1">
                            by {book.metadata.author}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span>{bookProgress?.completionPercentage || 0}%</span>
                            </div>
                            <Progress value={bookProgress?.completionPercentage || 0} className="h-2" />
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">{book.metadata.subject}</Badge>
                              <span className="text-xs text-muted-foreground">
                                Page {bookProgress?.currentPage || 1}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  
                  {recentlyRead.length === 0 && (
                    <div className="col-span-3 text-center py-8">
                      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="font-medium mb-2">No books started yet</h3>
                      <p className="text-muted-foreground">Start reading to see your progress here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid gap-6">
              {progress.map(p => {
                const book = books.find(b => b.metadata.id === p.textbookId);
                if (!book) return null;
                
                return (
                  <Card key={p.textbookId}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{book.metadata.title}</CardTitle>
                          <CardDescription>by {book.metadata.author}</CardDescription>
                        </div>
                        <Button onClick={() => onOpenBook(book)}>Continue Reading</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Reading Progress</span>
                            <span className="text-sm text-muted-foreground">
                              {p.completionPercentage}% complete
                            </span>
                          </div>
                          <Progress value={p.completionPercentage} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-semibold">{p.currentPage}</div>
                            <div className="text-xs text-muted-foreground">Current Page</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold">{p.pagesRead.length}</div>
                            <div className="text-xs text-muted-foreground">Pages Read</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold">{Math.round(p.totalTimeRead / 60)}h</div>
                            <div className="text-xs text-muted-foreground">Time Spent</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="annotations" className="space-y-6">
            <div className="grid gap-4">
              {annotations.slice(0, 10).map(annotation => {
                const book = books.find(b => b.metadata.id === annotation.textbookId);
                return (
                  <Card key={annotation.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {annotation.type === 'highlight' ? (
                            <HighlighterIcon className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <StickyNote className="h-4 w-4 text-muted-foreground" />
                          )}
                          <Badge variant="outline">Page {annotation.pageNumber}</Badge>
                          <div className={`w-3 h-3 rounded bg-highlight-${annotation.color} border`} />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {book?.metadata.title}
                        </span>
                      </div>
                      
                      <blockquote className="border-l-2 border-primary pl-4 italic mb-2">
                        "{annotation.selectedText}"
                      </blockquote>
                      
                      {annotation.note && (
                        <p className="text-sm text-muted-foreground">{annotation.note}</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
              
              {annotations.length === 0 && (
                <div className="text-center py-12">
                  <HighlighterIcon className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No annotations yet</h3>
                  <p className="text-muted-foreground">
                    Start highlighting and taking notes while reading to see them here.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="flashcards" className="space-y-6">
            <div className="grid gap-4">
              {flashcards.slice(0, 10).map(flashcard => {
                const book = books.find(b => b.metadata.id === flashcard.textbookId);
                return (
                  <Card key={flashcard.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-4">
                        <Badge variant="outline">{book?.metadata.title}</Badge>
                        <Badge variant={
                          flashcard.difficulty === 'easy' ? 'default' :
                          flashcard.difficulty === 'medium' ? 'secondary' : 'destructive'
                        }>
                          {flashcard.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-1">Question:</h4>
                          <p className="text-sm">{flashcard.question}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Answer:</h4>
                          <p className="text-sm text-muted-foreground">{flashcard.answer}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                        <span>Reviewed {flashcard.timesReviewed} times</span>
                        <span>{flashcard.correctCount}/{flashcard.timesReviewed} correct</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {flashcards.length === 0 && (
                <div className="text-center py-12">
                  <Target className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No flashcards yet</h3>
                  <p className="text-muted-foreground">
                    Create annotations and notes to generate flashcards for studying.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
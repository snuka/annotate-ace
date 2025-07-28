import React from 'react';
import { X, BookOpen, Brain, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useStudyAssistant } from '@/hooks/useStudyAssistant';
import { RelatedResourceCard } from './RelatedResourceCard';
import { AIExplanationCard } from './AIExplanationCard';

interface StudyAssistantProps {
  onNavigateToPage?: (pageNumber: number) => void;
}

export const StudyAssistant: React.FC<StudyAssistantProps> = ({ onNavigateToPage }) => {
  const { isOpen, currentContext, relatedResources, aiExplanation, isLoading, error, close } = useStudyAssistant();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-1/2 bg-background border-l border-border shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Study Assistant</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={close}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Context Display */}
          {currentContext && (
            <div className="p-4 border-b border-border bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Studying: {currentContext.type}
                  {currentContext.pageNumber && ` (Page ${currentContext.pageNumber})`}
                </span>
              </div>
              {currentContext.selectedText && (
                <div className="text-sm bg-primary/10 p-2 rounded border-l-2 border-primary">
                  "{currentContext.selectedText.substring(0, 100)}..."
                </div>
              )}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-destructive/10 border-b border-border">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="resources" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
                <TabsTrigger value="resources">Related Resources</TabsTrigger>
                <TabsTrigger value="explanation">AI Explanation</TabsTrigger>
              </TabsList>

              <TabsContent value="resources" className="flex-1 overflow-hidden">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-4 py-4">
                    {isLoading ? (
                      <>
                        {[1, 2, 3].map((i) => (
                          <Card key={i}>
                            <CardContent className="p-4">
                              <Skeleton className="h-4 w-3/4 mb-2" />
                              <Skeleton className="h-3 w-full mb-1" />
                              <Skeleton className="h-3 w-2/3" />
                            </CardContent>
                          </Card>
                        ))}
                      </>
                    ) : (
                      relatedResources.map((resource) => (
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

              <TabsContent value="explanation" className="flex-1 overflow-hidden">
                <ScrollArea className="h-full px-4">
                  <div className="py-4">
                    {isLoading ? (
                      <Card>
                        <CardContent className="p-4">
                          <Skeleton className="h-6 w-1/2 mb-4" />
                          <Skeleton className="h-3 w-full mb-2" />
                          <Skeleton className="h-3 w-full mb-2" />
                          <Skeleton className="h-3 w-3/4 mb-4" />
                          <Skeleton className="h-4 w-1/3 mb-2" />
                          <div className="flex gap-2">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-20" />
                          </div>
                        </CardContent>
                      </Card>
                    ) : aiExplanation ? (
                      <AIExplanationCard explanation={aiExplanation} />
                    ) : null}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
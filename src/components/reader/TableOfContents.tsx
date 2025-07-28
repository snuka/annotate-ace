import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronRight, BookOpen, Brain } from 'lucide-react';
import { Textbook } from '@/types/textbook';
import { StudyContext } from '@/types/studyAssistant';
import { useRef, useEffect, useState } from 'react';

import { TruncatedText } from './TruncatedText';

interface TableOfContentsProps {
  book: Textbook;
  currentPage: number;
  isOpen: boolean;
  onClose: () => void;
  onPageSelect: (page: number) => void;
  onStudyChapter?: (context: StudyContext) => void;
  onStudySection?: (context: StudyContext) => void;
}

export default function TableOfContents({ 
  book, 
  currentPage, 
  isOpen, 
  onClose, 
  onPageSelect,
  onStudyChapter,
  onStudySection
}: TableOfContentsProps) {
  const handlePageSelect = (page: number) => {
    onPageSelect(page);
    onClose();
  };

  const handleStudyChapter = (chapter: any) => {
    if (onStudyChapter) {
      const context: StudyContext = {
        type: 'chapter',
        content: `Chapter: ${chapter.title}`,
        textbookId: book.metadata.id,
        chapterId: chapter.id
      };
      onStudyChapter(context);
      onClose();
    }
  };

  const handleStudySection = (section: any, chapter: any) => {
    if (onStudySection) {
      const context: StudyContext = {
        type: 'chapter',
        content: `Section: ${section.title} (Chapter: ${chapter.title})`,
        textbookId: book.metadata.id,
        chapterId: chapter.id
      };
      onStudySection(context);
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Table of Contents
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-full mt-6">
          <div className="space-y-2">
            {book.chapters.map((chapter) => (
              <div key={chapter.id} className="space-y-1">
                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Button
                      variant={currentPage >= chapter.startPage && currentPage <= chapter.endPage ? "secondary" : "ghost"}
                      className="flex-1 justify-start text-left h-auto p-2 mr-2"
                      onClick={() => handlePageSelect(chapter.startPage)}
                    >
                      <div className="flex-1">
                        <TruncatedText text={chapter.title} className="font-medium text-sm leading-tight truncate block">
                          {chapter.title}
                        </TruncatedText>
                        <p className="text-xs text-muted-foreground mt-1">
                          Pages {chapter.startPage} - {chapter.endPage}
                        </p>
                      </div>
                    </Button>
                    
                    {onStudyChapter && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 hover:bg-primary/10 group"
                        onClick={() => handleStudyChapter(chapter)}
                      >
                        <Brain className="h-4 w-4 text-primary/70 group-hover:text-primary group-hover:scale-110 transition-all duration-500 animate-[pulse_3s_ease-in-out_infinite]" />
                      </Button>
                    )}
                  </div>
                  
                  {/* Sections */}
                  <div className="ml-4 space-y-1">
                    {chapter.sections.map((section) => (
                      <Button
                        key={section.id}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left h-auto p-2 text-muted-foreground hover:text-foreground"
                        onClick={() => handlePageSelect(section.startPage)}
                      >
                        <div className="flex-1 flex items-center justify-between">
                          <TruncatedText text={section.title} className="text-xs truncate block max-w-[150px]">
                            {section.title}
                          </TruncatedText>
                          <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                            p. {section.startPage}
                          </Badge>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, BookOpen } from 'lucide-react';
import { Textbook } from '@/types/textbook';

interface TableOfContentsProps {
  book: Textbook;
  currentPage: number;
  isOpen: boolean;
  onClose: () => void;
  onPageSelect: (page: number) => void;
}

export default function TableOfContents({ 
  book, 
  currentPage, 
  isOpen, 
  onClose, 
  onPageSelect 
}: TableOfContentsProps) {
  const handlePageSelect = (page: number) => {
    onPageSelect(page);
    onClose();
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
                <Button
                  variant={currentPage >= chapter.startPage && currentPage <= chapter.endPage ? "secondary" : "ghost"}
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => handlePageSelect(chapter.startPage)}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm leading-tight">
                        {chapter.title}
                      </h4>
                      <Badge variant="outline" className="text-xs ml-2">
                        p. {chapter.startPage}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Pages {chapter.startPage} - {chapter.endPage}
                    </p>
                  </div>
                </Button>
                
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
                      <ChevronRight className="h-3 w-3 mr-2 opacity-50" />
                      <div className="flex-1">
                        <span className="text-xs">{section.title}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          p. {section.startPage}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
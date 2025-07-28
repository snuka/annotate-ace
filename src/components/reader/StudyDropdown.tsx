import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Brain, ChevronDown, FileText, BookOpen } from 'lucide-react';
import { StudyContext } from '@/types/studyAssistant';
import { TextbookChapter } from '@/types/textbook';

interface StudyDropdownProps {
  currentPage: number;
  currentChapter: TextbookChapter | undefined;
  textbookId: string;
  pageContent: string;
  onStudyPage: (context: StudyContext) => void;
  onStudyChapter: (context: StudyContext) => void;
}

export const StudyDropdown: React.FC<StudyDropdownProps> = ({
  currentPage,
  currentChapter,
  textbookId,
  pageContent,
  onStudyPage,
  onStudyChapter
}) => {
  const handleStudyCurrentPage = () => {
    const context: StudyContext = {
      type: 'page',
      content: pageContent,
      textbookId,
      pageNumber: currentPage
    };
    onStudyPage(context);
  };

  const handleStudyCurrentChapter = () => {
    if (currentChapter) {
      const context: StudyContext = {
        type: 'chapter',
        content: `Chapter: ${currentChapter.title}`,
        textbookId,
        chapterId: currentChapter.id
      };
      onStudyChapter(context);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Brain className="h-4 w-4" />
          Study with AI
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleStudyCurrentPage}>
          <FileText className="h-4 w-4 mr-2" />
          Study Current Page
          <span className="ml-auto text-xs text-muted-foreground">p. {currentPage}</span>
        </DropdownMenuItem>
        
        {currentChapter && (
          <DropdownMenuItem onClick={handleStudyCurrentChapter}>
            <BookOpen className="h-4 w-4 mr-2" />
            Study Current Chapter
            <span className="ml-auto text-xs text-muted-foreground">{currentChapter.title}</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem disabled className="text-muted-foreground">
          <Brain className="h-4 w-4 mr-2" />
          More study options coming soon...
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
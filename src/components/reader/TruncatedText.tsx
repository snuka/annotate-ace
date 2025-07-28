import { useRef, useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TruncatedTextProps {
  text: string;
  className?: string;
  children: React.ReactNode;
}

export const TruncatedText: React.FC<TruncatedTextProps> = ({ text, className, children }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsTruncated(element.scrollWidth > element.clientWidth);
    }
  }, [text]);

  if (isTruncated) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span ref={textRef} className={className}>
              {children}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );
};
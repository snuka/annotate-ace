import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Quote, X } from 'lucide-react';
import { Textbook, Annotation, Citation } from '@/types/textbook';
import { useToast } from '@/hooks/use-toast';

interface CitationGeneratorProps {
  book: Textbook;
  annotation: Annotation;
  isOpen: boolean;
  onClose: () => void;
  onSaveCitation: (citation: Omit<Citation, 'id' | 'createdAt'>) => void;
}

export default function CitationGenerator({
  book,
  annotation,
  isOpen,
  onClose,
  onSaveCitation
}: CitationGeneratorProps) {
  const [format, setFormat] = useState<Citation['format']>('APA');
  const { toast } = useToast();

  if (!isOpen) return null;

  const generateCitation = (style: Citation['format']): string => {
    const { metadata } = book;
    const year = metadata.publicationYear;
    const author = metadata.author;
    const title = metadata.title;
    const publisher = metadata.publisher;
    const page = annotation.pageNumber;

    switch (style) {
      case 'APA':
        return `${author} (${year}). ${title} (${metadata.edition}). ${publisher}. (p. ${page})`;
      
      case 'MLA':
        return `${author}. ${title}. ${metadata.edition}, ${publisher}, ${year}, p. ${page}.`;
      
      case 'Chicago':
        return `${author}. ${title}. ${metadata.edition}. ${publisher}, ${year}. ${page}.`;
      
      default:
        return '';
    }
  };

  const currentCitation = generateCitation(format);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCitation);
      toast({
        title: "Citation copied!",
        description: "The citation has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy citation to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    onSaveCitation({
      textbookId: book.metadata.id,
      annotationId: annotation.id,
      format,
      citationText: currentCitation,
      pageNumber: annotation.pageNumber
    });
    
    toast({
      title: "Citation saved!",
      description: "The citation has been added to your bibliography.",
    });
    
    onClose();
  };

  const handleDownload = () => {
    const content = `Citation for "${annotation.selectedText}"\n\n${currentCitation}\n\nQuoted text: "${annotation.selectedText}"\n\nGenerated on: ${new Date().toLocaleDateString()}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `citation-${book.metadata.title.replace(/\s+/g, '-').toLowerCase()}-p${annotation.pageNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Citation downloaded!",
      description: "The citation file has been downloaded to your device.",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Quote className="h-5 w-5" />
            Generate Citation
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Book Information */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Source Information</h3>
            <div className="p-3 bg-muted rounded-lg border space-y-1">
              <p className="font-medium">{book.metadata.title}</p>
              <p className="text-sm text-muted-foreground">by {book.metadata.author}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline">{book.metadata.edition}</Badge>
                <span>•</span>
                <span>{book.metadata.publisher}, {book.metadata.publicationYear}</span>
                <span>•</span>
                <span>Page {annotation.pageNumber}</span>
              </div>
            </div>
          </div>

          {/* Quoted Text */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Quoted Text</h3>
            <div className="p-3 bg-muted rounded-lg border">
              <p className="text-sm italic">"{annotation.selectedText}"</p>
              {annotation.note && (
                <div className="mt-2 pt-2 border-t">
                  <p className="text-xs text-muted-foreground">Your note: {annotation.note}</p>
                </div>
              )}
            </div>
          </div>

          {/* Citation Format Selection */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Citation Format</h3>
            <Select value={format} onValueChange={(value: Citation['format']) => setFormat(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select citation format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="APA">APA (American Psychological Association)</SelectItem>
                <SelectItem value="MLA">MLA (Modern Language Association)</SelectItem>
                <SelectItem value="Chicago">Chicago Manual of Style</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Generated Citation */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Generated Citation</h3>
            <Textarea
              value={currentCitation}
              readOnly
              rows={3}
              className="resize-none bg-muted"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" onClick={handleCopy} className="flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button onClick={handleSave}>
              Save Citation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
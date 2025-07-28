import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, Type, Palette, Layout, Monitor } from 'lucide-react';
import { ReadingSettings } from '@/types/textbook';

interface ReaderSettingsProps {
  settings: ReadingSettings;
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange: (settings: ReadingSettings) => void;
}

export default function ReaderSettings({ 
  settings, 
  isOpen, 
  onClose, 
  onSettingsChange 
}: ReaderSettingsProps) {
  const updateSetting = <K extends keyof ReadingSettings>(
    key: K,
    value: ReadingSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Reading Settings
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Typography */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <h3 className="font-medium">Typography</h3>
            </div>
            
            {/* Font Size */}
            <div className="space-y-2">
              <Label>Font Size: {settings.fontSize}px</Label>
              <Slider
                value={[settings.fontSize]}
                onValueChange={([value]) => updateSetting('fontSize', value)}
                min={12}
                max={24}
                step={1}
                className="w-full"
              />
            </div>

            {/* Font Family */}
            <div className="space-y-2">
              <Label>Font Family</Label>
              <RadioGroup 
                value={settings.fontFamily} 
                onValueChange={(value: 'serif' | 'sans-serif') => updateSetting('fontFamily', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="serif" id="serif" />
                  <Label htmlFor="serif" className="font-serif">Serif (Georgia)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sans-serif" id="sans-serif" />
                  <Label htmlFor="sans-serif" className="font-sans">Sans-serif (System)</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Line Height */}
            <div className="space-y-2">
              <Label>Line Height: {settings.lineHeight}</Label>
              <Slider
                value={[settings.lineHeight]}
                onValueChange={([value]) => updateSetting('lineHeight', value)}
                min={1.2}
                max={2.0}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          <Separator />

          {/* Appearance */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <h3 className="font-medium">Appearance</h3>
            </div>
            
            <div className="space-y-2">
              <Label>Theme</Label>
              <RadioGroup 
                value={settings.theme} 
                onValueChange={(value: 'light' | 'dark' | 'sepia') => updateSetting('theme', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark">Dark</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sepia" id="sepia" />
                  <Label htmlFor="sepia">Sepia</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <Separator />

          {/* Layout */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              <h3 className="font-medium">Layout</h3>
            </div>
            
            <div className="space-y-2">
              <Label>Page Layout</Label>
              <RadioGroup 
                value={settings.pageLayout} 
                onValueChange={(value: 'single' | 'spread') => updateSetting('pageLayout', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="single" />
                  <Label htmlFor="single">Single Page</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spread" id="spread" />
                  <Label htmlFor="spread">Two-Page Spread</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <Separator />

          {/* Display */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <h3 className="font-medium">Display</h3>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="fullscreen">Fullscreen Mode</Label>
              <Switch 
                id="fullscreen"
                checked={settings.fullscreen}
                onCheckedChange={(checked) => updateSetting('fullscreen', checked)}
              />
            </div>
          </div>

          <Separator />

          {/* Reset to Defaults */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onSettingsChange({
              fontSize: 16,
              fontFamily: 'serif',
              lineHeight: 1.6,
              theme: 'light',
              pageLayout: 'spread',
              fullscreen: false
            })}
          >
            Reset to Defaults
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/store/useTheme";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
  const {
    theme,
    primaryColor,
    fontSize,
    setTheme,
    setPrimaryColor,
    setFontSize,
  } = useTheme();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        {/* Primary Color */}
        <div className="flex items-center justify-between py-2">
          <span className="text-sm">Primary Color</span>
          <Select
            value={primaryColor}
            onValueChange={(val) => setPrimaryColor(val as any)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Theme */}
        <div className="flex items-center justify-between py-2">
          <span className="text-sm">Dark Mode</span>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
          />
        </div>

        {/* Font Size */}
        <div className="flex items-center justify-between py-2">
          <span className="text-sm">Font Size</span>
          <Select
            value={fontSize}
            onValueChange={(val) => setFontSize(val as any)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Font size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

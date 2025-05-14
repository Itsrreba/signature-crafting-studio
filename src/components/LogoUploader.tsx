
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Link, Image } from 'lucide-react';

interface LogoUploaderProps {
  logoUrl: string;
  onLogoChange: (logoUrl: string) => void;
}

const LogoUploader = ({ logoUrl, onLogoChange }: LogoUploaderProps) => {
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB. Please select a smaller image.');
      return;
    }
    
    // Convert to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onLogoChange(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label>Upload Method</Label>
        <div className="flex space-x-2">
          <Button
            type="button"
            onClick={() => setUploadMode('url')}
            variant={uploadMode === 'url' ? 'default' : 'outline'}
            size="sm"
            className="flex items-center gap-2"
          >
            <Link className="h-4 w-4" /> URL
          </Button>
          <Button
            type="button"
            onClick={() => setUploadMode('file')}
            variant={uploadMode === 'file' ? 'default' : 'outline'}
            size="sm"
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" /> Upload File
          </Button>
        </div>
      </div>
      
      {uploadMode === 'url' ? (
        <div className="space-y-2">
          <Label htmlFor="logoUrl">Logo URL</Label>
          <div className="flex items-center gap-2">
            <Image className="h-4 w-4 text-gray-500" />
            <Input
              id="logoUrl"
              value={logoUrl || ''}
              onChange={(e) => onLogoChange(e.target.value)}
              placeholder="https://example.com/logo.png"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="logoUpload">Upload Logo</Label>
          <div className="flex flex-col gap-3">
            <Input
              id="logoUpload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button 
              type="button" 
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" /> Select Image
            </Button>
            {logoUrl && logoUrl.startsWith('data:image/') && (
              <div className="mt-2">
                <p className="text-sm text-green-600">Image uploaded successfully</p>
                <div className="mt-2 p-2 border rounded">
                  <img src={logoUrl} alt="Preview" className="h-16 object-contain mx-auto" />
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Maximum file size: 2MB. Supported formats: PNG, JPEG, GIF
          </p>
        </div>
      )}
    </div>
  );
};

export default LogoUploader;

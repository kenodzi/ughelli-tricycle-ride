
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface DriverPhotoUploadProps {
  onPhotoChange: (file: File) => void;
  photoUrl?: string;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
}

const DriverPhotoUpload = ({ onPhotoChange, photoUrl, verificationStatus = 'pending' }: DriverPhotoUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onPhotoChange(file);
      }
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onPhotoChange(files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Driver Photo</h3>
        {verificationStatus === 'verified' && (
          <div className="flex items-center text-green-600 text-sm">
            <CheckCircle className="h-4 w-4 mr-1" />
            Verified
          </div>
        )}
        {verificationStatus === 'rejected' && (
          <div className="flex items-center text-red-600 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            Verification Failed
          </div>
        )}
        {verificationStatus === 'pending' && photoUrl && (
          <div className="text-yellow-600 text-sm">
            Pending Verification
          </div>
        )}
      </div>

      {photoUrl ? (
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-40 h-40">
            <AvatarImage src={photoUrl} alt="Driver photo" />
            <AvatarFallback>Photo</AvatarFallback>
          </Avatar>
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            Change Photo
          </Button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Your photo will be used for verification purposes and will be visible to passengers.
          </p>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-48 ${
            isDragging ? 'border-keke-primary bg-keke-primary/5' : 'border-gray-300'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Camera className="h-12 w-12 text-gray-400 mb-3" />
          <p className="text-sm text-gray-500 text-center mb-3">
            Drag & drop your photo here, or click to select
          </p>
          <Button 
            variant="secondary" 
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" /> Upload Photo
          </Button>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Photo Requirements:</strong>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Clear, front-facing photo showing your full face</li>
            <li>Good lighting with no shadows on your face</li>
            <li>No sunglasses or hats that obscure your face</li>
            <li>Recent photo (taken within the last 6 months)</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default DriverPhotoUpload;

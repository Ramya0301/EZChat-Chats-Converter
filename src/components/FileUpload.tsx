import React, { useCallback } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  error: string | null;
}

export function FileUpload({ onFileSelect, isProcessing, error }: FileUploadProps) {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/json") {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div className="flex justify-center">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="w-full max-w-md p-8 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors bg-white shadow-sm"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-blue-50 p-3 rounded-full">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              Drag and drop your JSON file here
            </p>
            <p className="text-sm text-gray-500 mt-1">or</p>
            <label className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-colors">
              <span>Select file</span>
              <input
                type="file"
                className="hidden"
                accept="application/json"
                onChange={handleFileInput}
                disabled={isProcessing}
              />
            </label>
          </div>
          {error && (
            <div className="flex items-center space-x-2 text-red-500 bg-red-50 px-3 py-2 rounded-md">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
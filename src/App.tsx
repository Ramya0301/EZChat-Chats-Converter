import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { ProcessingStatus } from './components/ProcessingStatus';
import { DownloadButton } from './components/DownloadButton';
import { convertLegacyChatFormat } from './utils/chatConverter';
import type { LegacyChat } from './types/chat';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processedData, setProcessedData] = useState<any | null>(null);
  const [showDownload, setShowDownload] = useState(true);
  const [originalFileName, setOriginalFileName] = useState<string>('');

  const handleFileSelect = useCallback(async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setProcessedData(null);
    setShowDownload(true);
    setOriginalFileName(file.name.replace('.json', ''));

    try {
      const text = await file.text();
      const json = JSON.parse(text) as LegacyChat;
      const processed = convertLegacyChatFormat(json);
      setProcessedData(processed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the file');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (!processedData) return;

    const blob = new Blob([JSON.stringify(processedData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${originalFileName}_преобразованный.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowDownload(false);
  }, [processedData, originalFileName]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <div className="space-y-8">
          <FileUpload
            onFileSelect={handleFileSelect}
            isProcessing={isProcessing}
            error={error}
          />
          
          {showDownload && (
            <div className="flex flex-col items-center space-y-4">
              <ProcessingStatus 
                isProcessing={isProcessing}
                isProcessed={!isProcessing && processedData !== null}
              />
              <DownloadButton
                onDownload={handleDownload}
                disabled={!processedData || isProcessing}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
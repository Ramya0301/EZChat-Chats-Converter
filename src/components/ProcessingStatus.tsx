import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface ProcessingStatusProps {
  isProcessing: boolean;
  isProcessed: boolean;
}

export function ProcessingStatus({ isProcessing, isProcessed }: ProcessingStatusProps) {
  if (isProcessing) {
    return (
      <div className="flex items-center justify-center space-x-2 text-blue-600">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Обработка файла...</span>
      </div>
    );
  }

  if (isProcessed) {
    return (
      <div className="flex items-center justify-center space-x-2 text-green-600">
        <CheckCircle2 className="w-5 h-5" />
        <span>Обработка завершена. Нажмите ниже для загрузки.</span>
      </div>
    );
  }

  return null;
}
import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  onDownload: () => void;
  disabled: boolean;
}

export function DownloadButton({ onDownload, disabled }: DownloadButtonProps) {
  if (disabled) return null;

  return (
    <button
      onClick={onDownload}
      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
    >
      <Download className="w-5 h-5 mr-2" />
      Скачать конвертированный файл
    </button>
  );
}
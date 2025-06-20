import React, { useState } from 'react';
import { Download, FileImage, FileText, X } from 'lucide-react';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: 'png' | 'pdf', quality: number) => void;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({
  isOpen,
  onClose,
  onExport
}) => {
  const [format, setFormat] = useState<'png' | 'pdf'>('png');
  const [quality, setQuality] = useState(0.9);

  if (!isOpen) return null;

  const handleExport = () => {
    onExport(format, quality);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Export Whiteboard</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFormat('png')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  format === 'png'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FileImage size={24} className="mx-auto mb-1" />
                <div className="text-sm font-medium">PNG</div>
                <div className="text-xs text-gray-500">High quality image</div>
              </button>
              
              <button
                onClick={() => setFormat('pdf')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  format === 'pdf'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FileText size={24} className="mx-auto mb-1" />
                <div className="text-sm font-medium">PDF</div>
                <div className="text-xs text-gray-500">Document format</div>
              </button>
            </div>
          </div>
          
          {/* Quality Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quality ({Math.round(quality * 100)}%)
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};
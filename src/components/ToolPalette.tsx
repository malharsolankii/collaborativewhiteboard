import React from 'react';
import { 
  Pen, 
  Eraser, 
  Square, 
  Circle, 
  Minus, 
  Type, 
  Palette,
  Undo,
  Redo,
  RotateCcw,
  Download
} from 'lucide-react';
import { DrawingTool } from '../types/whiteboard';

interface ToolPaletteProps {
  tool: DrawingTool;
  color: string;
  width: number;
  fontSize: number;
  onToolChange: (tool: DrawingTool) => void;
  onColorChange: (color: string) => void;
  onWidthChange: (width: number) => void;
  onFontSizeChange: (fontSize: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onExport: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const COLORS = [
  '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
  '#FF00FF', '#00FFFF', '#FF8000', '#8000FF', '#0080FF',
  '#80FF00', '#FF0080', '#808080', '#800000', '#008000'
];

const TOOLS = [
  { id: 'pen' as DrawingTool, icon: Pen, label: 'Pen' },
  { id: 'eraser' as DrawingTool, icon: Eraser, label: 'Eraser' },
  { id: 'rectangle' as DrawingTool, icon: Square, label: 'Rectangle' },
  { id: 'circle' as DrawingTool, icon: Circle, label: 'Circle' },
  { id: 'line' as DrawingTool, icon: Minus, label: 'Line' },
  { id: 'text' as DrawingTool, icon: Type, label: 'Text' }
];

export const ToolPalette: React.FC<ToolPaletteProps> = ({
  tool,
  color,
  width,
  fontSize,
  onToolChange,
  onColorChange,
  onWidthChange,
  onFontSizeChange,
  onUndo,
  onRedo,
  onClear,
  onExport,
  canUndo,
  canRedo
}) => {
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 space-y-4">
        {/* Drawing Tools */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Tools</h3>
          <div className="space-y-1">
            {TOOLS.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => onToolChange(id)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  tool === id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                title={label}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* Color Picker */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Color</h3>
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-10 h-10 rounded-xl border-2 border-gray-300 flex items-center justify-center transition-all duration-200 hover:border-gray-400"
              style={{ backgroundColor: color }}
              title="Choose Color"
            >
              <Palette size={16} className="text-white mix-blend-difference" />
            </button>
            
            {showColorPicker && (
              <div className="absolute left-12 top-0 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 p-3 grid grid-cols-3 gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      onColorChange(c);
                      setShowColorPicker(false);
                    }}
                    className="w-8 h-8 rounded-lg border-2 border-gray-300 transition-all duration-200 hover:scale-110"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Width Control */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Size</h3>
          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="20"
              value={width}
              onChange={(e) => onWidthChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-xs text-gray-500 text-center">{width}px</div>
          </div>
        </div>

        {/* Font Size (for text tool) */}
        {tool === 'text' && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Font Size</h3>
            <div className="space-y-2">
              <input
                type="range"
                min="12"
                max="48"
                value={fontSize}
                onChange={(e) => onFontSizeChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-xs text-gray-500 text-center">{fontSize}px</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</h3>
          <div className="space-y-1">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                canUndo
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
              title="Undo"
            >
              <Undo size={18} />
            </button>
            
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                canRedo
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
              title="Redo"
            >
              <Redo size={18} />
            </button>
            
            <button
              onClick={onClear}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 bg-red-100 hover:bg-red-200 text-red-700"
              title="Clear Canvas"
            >
              <RotateCcw size={18} />
            </button>
            
            <button
              onClick={onExport}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 bg-green-100 hover:bg-green-200 text-green-700"
              title="Export"
            >
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
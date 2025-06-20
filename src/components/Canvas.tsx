import React from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { DrawingStroke, Shape, TextElement, DrawingTool } from '../types/whiteboard';

interface CanvasProps {
  onStrokeComplete: (stroke: DrawingStroke) => void;
  onShapeComplete: (shape: Shape) => void;
  onTextComplete: (text: TextElement) => void;
  tool: DrawingTool;
  color: string;
  width: number;
  fontSize: number;
  fontFamily: string;
  strokes: DrawingStroke[];
  shapes: Shape[];
  textElements: TextElement[];
}

export const Canvas: React.FC<CanvasProps> = ({
  onStrokeComplete,
  onShapeComplete,
  onTextComplete,
  tool,
  color,
  width,
  fontSize,
  fontFamily,
  strokes,
  shapes,
  textElements
}) => {
  const { canvasRef } = useCanvas(
    onStrokeComplete,
    onShapeComplete,
    onTextComplete,
    tool,
    color,
    width,
    fontSize,
    fontFamily
  );

  return (
    <div className="flex-1 relative overflow-hidden bg-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        style={{ touchAction: 'none' }}
      />
      
      {/* Render text elements */}
      {textElements.map((textElement) => (
        <div
          key={textElement.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: textElement.x,
            top: textElement.y,
            color: textElement.color,
            fontSize: textElement.fontSize,
            fontFamily: textElement.fontFamily,
            transform: 'translateY(-50%)'
          }}
        >
          {textElement.text}
        </div>
      ))}
    </div>
  );
};
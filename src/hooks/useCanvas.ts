import { useRef, useEffect, useCallback } from 'react';
import { DrawingPoint, DrawingStroke, Shape, TextElement, DrawingTool } from '../types/whiteboard';

export const useCanvas = (
  onStrokeComplete: (stroke: DrawingStroke) => void,
  onShapeComplete: (shape: Shape) => void,
  onTextComplete: (text: TextElement) => void,
  tool: DrawingTool,
  color: string,
  width: number,
  fontSize: number,
  fontFamily: string
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);
  const currentStrokeRef = useRef<DrawingPoint[]>([]);
  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  const currentShapeRef = useRef<Shape | null>(null);
  const textInputRef = useRef<HTMLInputElement | null>(null);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // Set drawing properties
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.imageSmoothingEnabled = true;
    
    contextRef.current = context;
  }, []);

  const getMousePos = useCallback((e: MouseEvent | TouchEvent): DrawingPoint => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
      pressure: 'touches' in e ? e.touches[0].force || 0.5 : 0.5
    };
  }, []);

  const startDrawing = useCallback((e: MouseEvent | TouchEvent) => {
    const point = getMousePos(e);
    isDrawingRef.current = true;
    startPointRef.current = point;
    currentStrokeRef.current = [point];

    if (tool === 'text') {
      createTextInput(point.x, point.y);
      return;
    }

    if (tool === 'pen' || tool === 'eraser') {
      const context = contextRef.current;
      if (!context) return;

      context.beginPath();
      context.moveTo(point.x, point.y);
      context.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
      context.lineWidth = width;
      context.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    }
  }, [tool, color, width, getMousePos]);

  const draw = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDrawingRef.current) return;

    const point = getMousePos(e);
    currentStrokeRef.current.push(point);

    const context = contextRef.current;
    if (!context) return;

    if (tool === 'pen' || tool === 'eraser') {
      context.lineTo(point.x, point.y);
      context.stroke();
    } else if (tool === 'rectangle' || tool === 'circle' || tool === 'line') {
      // Clear and redraw for shape preview
      redrawCanvas();
      drawShapePreview(startPointRef.current!, point);
    }
  }, [tool, getMousePos]);

  const stopDrawing = useCallback(() => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    const context = contextRef.current;
    if (!context) return;

    if (tool === 'pen' || tool === 'eraser') {
      const stroke: DrawingStroke = {
        id: Date.now().toString(),
        points: [...currentStrokeRef.current],
        color: tool === 'eraser' ? '#FFFFFF' : color,
        width,
        tool,
        timestamp: Date.now()
      };
      onStrokeComplete(stroke);
    } else if ((tool === 'rectangle' || tool === 'circle' || tool === 'line') && startPointRef.current) {
      const endPoint = currentStrokeRef.current[currentStrokeRef.current.length - 1];
      if (endPoint) {
        const shape: Shape = {
          id: Date.now().toString(),
          type: tool as 'rectangle' | 'circle' | 'line',
          startX: startPointRef.current.x,
          startY: startPointRef.current.y,
          endX: endPoint.x,
          endY: endPoint.y,
          color,
          width,
          filled: false,
          timestamp: Date.now()
        };
        onShapeComplete(shape);
      }
    }

    currentStrokeRef.current = [];
    startPointRef.current = null;
    context.globalCompositeOperation = 'source-over';
  }, [tool, color, width, onStrokeComplete, onShapeComplete]);

  const createTextInput = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const input = document.createElement('input');
    input.type = 'text';
    input.style.position = 'absolute';
    input.style.left = `${x}px`;
    input.style.top = `${y}px`;
    input.style.fontSize = `${fontSize}px`;
    input.style.fontFamily = fontFamily;
    input.style.color = color;
    input.style.background = 'transparent';
    input.style.border = '1px dashed #ccc';
    input.style.outline = 'none';
    input.style.zIndex = '1000';

    const canvasRect = canvas.getBoundingClientRect();
    input.style.left = `${canvasRect.left + x}px`;
    input.style.top = `${canvasRect.top + y}px`;

    document.body.appendChild(input);
    input.focus();

    const handleComplete = () => {
      const text = input.value.trim();
      if (text) {
        const textElement: TextElement = {
          id: Date.now().toString(),
          x,
          y,
          text,
          color,
          fontSize,
          fontFamily,
          timestamp: Date.now()
        };
        onTextComplete(textElement);
      }
      document.body.removeChild(input);
      textInputRef.current = null;
    };

    input.addEventListener('blur', handleComplete);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleComplete();
      }
    });

    textInputRef.current = input;
  }, [color, fontSize, fontFamily, onTextComplete]);

  const drawShapePreview = useCallback((start: DrawingPoint, end: DrawingPoint) => {
    const context = contextRef.current;
    if (!context) return;

    context.strokeStyle = color;
    context.lineWidth = width;
    context.beginPath();

    switch (tool) {
      case 'rectangle':
        context.rect(start.x, start.y, end.x - start.x, end.y - start.y);
        break;
      case 'circle':
        const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        context.arc(start.x, start.y, radius, 0, 2 * Math.PI);
        break;
      case 'line':
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        break;
    }

    context.stroke();
  }, [tool, color, width]);

  const redrawCanvas = useCallback(() => {
    const context = contextRef.current;
    if (!context) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // Note: In a real implementation, you'd redraw all existing strokes/shapes here
  }, []);

  const clearCanvas = useCallback(() => {
    const context = contextRef.current;
    if (!context) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  useEffect(() => {
    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    return () => window.removeEventListener('resize', setupCanvas);
  }, [setupCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      startDrawing(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      draw(e);
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      stopDrawing();
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      startDrawing(e);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      draw(e);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      stopDrawing();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [startDrawing, draw, stopDrawing]);

  return {
    canvasRef,
    clearCanvas,
    setupCanvas
  };
};
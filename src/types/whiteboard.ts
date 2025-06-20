export interface DrawingPoint {
  x: number;
  y: number;
  pressure?: number;
}

export interface DrawingStroke {
  id: string;
  points: DrawingPoint[];
  color: string;
  width: number;
  tool: DrawingTool;
  timestamp: number;
}

export interface Shape {
  id: string;
  type: 'rectangle' | 'circle' | 'line';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  width: number;
  filled: boolean;
  timestamp: number;
}

export interface TextElement {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  fontSize: number;
  fontFamily: string;
  timestamp: number;
}

export type DrawingTool = 'pen' | 'eraser' | 'rectangle' | 'circle' | 'line' | 'text';

export interface DrawingState {
  strokes: DrawingStroke[];
  shapes: Shape[];
  textElements: TextElement[];
}

export interface User {
  id: string;
  name: string;
  color: string;
  cursor?: { x: number; y: number };
  isActive: boolean;
}

export interface Room {
  id: string;
  name: string;
  isPrivate: boolean;
  users: User[];
  drawingState: DrawingState;
  createdAt: number;
}

export interface ToolSettings {
  tool: DrawingTool;
  color: string;
  width: number;
  fontSize: number;
  fontFamily: string;
}
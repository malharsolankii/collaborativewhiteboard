import React, { useState, useCallback, useEffect } from 'react';
import { Canvas } from './components/Canvas';
import { ToolPalette } from './components/ToolPalette';
import { RoomManager } from './components/RoomManager';
import { ExportDialog } from './components/ExportDialog';
import { 
  DrawingStroke, 
  Shape, 
  TextElement, 
  DrawingTool, 
  Room, 
  User, 
  DrawingState 
} from './types/whiteboard';
import { 
  exportCanvasAsPNG, 
  exportCanvasAsPDF, 
  generateRoomId, 
  generateUserId, 
  generateUserColor 
} from './utils/export';

function App() {
  // Drawing state
  const [strokes, setStrokes] = useState<DrawingStroke[]>([]);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [history, setHistory] = useState<DrawingState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Tool state
  const [tool, setTool] = useState<DrawingTool>('pen');
  const [color, setColor] = useState('#000000');
  const [width, setWidth] = useState(3);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily] = useState('Arial, sans-serif');

  // Room state
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser] = useState<User>(() => ({
    id: generateUserId(),
    name: `User ${Math.floor(Math.random() * 1000)}`,
    color: generateUserColor(),
    isActive: true
  }));

  // UI state
  const [showExportDialog, setShowExportDialog] = useState(false);

  // Save to history
  const saveToHistory = useCallback(() => {
    const newState: DrawingState = { strokes, shapes, textElements };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [strokes, shapes, textElements, history, historyIndex]);

  // Handle drawing events
  const handleStrokeComplete = useCallback((stroke: DrawingStroke) => {
    setStrokes(prev => [...prev, stroke]);
    saveToHistory();
  }, [saveToHistory]);

  const handleShapeComplete = useCallback((shape: Shape) => {
    setShapes(prev => [...prev, shape]);
    saveToHistory();
  }, [saveToHistory]);

  const handleTextComplete = useCallback((text: TextElement) => {
    setTextElements(prev => [...prev, text]);
    saveToHistory();
  }, [saveToHistory]);

  // Undo/Redo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setStrokes(prevState.strokes);
      setShapes(prevState.shapes);
      setTextElements(prevState.textElements);
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setStrokes(nextState.strokes);
      setShapes(nextState.shapes);
      setTextElements(nextState.textElements);
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex]);

  // Clear canvas
  const handleClear = useCallback(() => {
    setStrokes([]);
    setShapes([]);
    setTextElements([]);
    saveToHistory();
  }, [saveToHistory]);

  // Room management
  const handleCreateRoom = useCallback((name: string, isPrivate: boolean) => {
    const room: Room = {
      id: generateRoomId(),
      name,
      isPrivate,
      users: [currentUser],
      drawingState: { strokes, shapes, textElements },
      createdAt: Date.now()
    };
    setCurrentRoom(room);
    setUsers([currentUser]);
  }, [currentUser, strokes, shapes, textElements]);

  const handleJoinRoom = useCallback((roomId: string) => {
    // In a real app, this would connect to a WebSocket server
    // For demo purposes, we'll create a mock room
    const room: Room = {
      id: roomId,
      name: `Room ${roomId.substring(0, 8)}`,
      isPrivate: false,
      users: [currentUser],
      drawingState: { strokes: [], shapes: [], textElements: [] },
      createdAt: Date.now()
    };
    setCurrentRoom(room);
    setUsers([currentUser]);
    
    // Simulate other users joining
    setTimeout(() => {
      const mockUser: User = {
        id: generateUserId(),
        name: `User ${Math.floor(Math.random() * 1000)}`,
        color: generateUserColor(),
        isActive: true
      };
      setUsers(prev => [...prev, mockUser]);
    }, 2000);
  }, [currentUser]);

  const handleLeaveRoom = useCallback(() => {
    setCurrentRoom(null);
    setUsers([]);
  }, []);

  // Export functionality
  const handleExport = useCallback((format: 'png' | 'pdf', quality: number) => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    if (format === 'png') {
      exportCanvasAsPNG(canvas, strokes, shapes, textElements, quality);
    } else {
      exportCanvasAsPDF(canvas, strokes, shapes, textElements, quality);
    }
  }, [strokes, shapes, textElements]);

  // Check URL for room parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('room');
    if (roomId) {
      handleJoinRoom(roomId);
    }
  }, [handleJoinRoom]);

  // Initialize history
  useEffect(() => {
    if (history.length === 0) {
      setHistory([{ strokes: [], shapes: [], textElements: [] }]);
      setHistoryIndex(0);
    }
  }, [history.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="fixed top-4 left-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 px-6 py-3">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Collaborative Whiteboard
          </h1>
        </div>
      </div>

      {/* Main Canvas */}
      <Canvas
        onStrokeComplete={handleStrokeComplete}
        onShapeComplete={handleShapeComplete}
        onTextComplete={handleTextComplete}
        tool={tool}
        color={color}
        width={width}
        fontSize={fontSize}
        fontFamily={fontFamily}
        strokes={strokes}
        shapes={shapes}
        textElements={textElements}
      />

      {/* Tool Palette */}
      <ToolPalette
        tool={tool}
        color={color}
        width={width}
        fontSize={fontSize}
        onToolChange={setTool}
        onColorChange={setColor}
        onWidthChange={setWidth}
        onFontSizeChange={setFontSize}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
        onExport={() => setShowExportDialog(true)}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
      />

      {/* Room Manager */}
      <RoomManager
        currentRoom={currentRoom}
        users={users}
        onCreateRoom={handleCreateRoom}
        onJoinRoom={handleJoinRoom}
        onLeaveRoom={handleLeaveRoom}
      />

      {/* Export Dialog */}
      <ExportDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        onExport={handleExport}
      />
    </div>
  );
}

export default App;
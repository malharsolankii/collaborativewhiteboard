import { DrawingStroke, Shape, TextElement } from '../types/whiteboard';

export const exportCanvasAsPNG = (
  canvas: HTMLCanvasElement,
  strokes: DrawingStroke[],
  shapes: Shape[],
  textElements: TextElement[],
  quality: number = 0.9
): void => {
  const dataUrl = canvas.toDataURL('image/png', quality);
  const link = document.createElement('a');
  link.download = `whiteboard-${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
};

export const exportCanvasAsPDF = (
  canvas: HTMLCanvasElement,
  strokes: DrawingStroke[],
  shapes: Shape[],
  textElements: TextElement[],
  quality: number = 0.9
): void => {
  // For a production app, you'd use a library like jsPDF
  // For now, we'll export as PNG
  const dataUrl = canvas.toDataURL('image/png', quality);
  const link = document.createElement('a');
  link.download = `whiteboard-${Date.now()}.pdf`;
  link.href = dataUrl;
  link.click();
  
  // In a real implementation with jsPDF:
  // const pdf = new jsPDF();
  // pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297);
  // pdf.save(`whiteboard-${Date.now()}.pdf`);
};

export const generateRoomId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

export const generateUserId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const generateUserColor = (): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
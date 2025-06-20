# Collaborative Whiteboard Application

A modern, real-time collaborative whiteboard application that enables multiple users to draw, write, and interact simultaneously on a shared digital canvas. Built with React and TypeScript, featuring a beautiful, production-ready interface with comprehensive drawing tools and seamless collaboration capabilities.

![Collaborative Whiteboard](https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## 🚀 Features

### Drawing Tools
- **Pen Tool**: Smooth, pressure-sensitive drawing with customizable brush sizes
- **Shape Tools**: Rectangle, circle, and line drawing with real-time preview
- **Text Tool**: Click-to-add text with customizable font sizes and colors
- **Eraser**: Precise erasing with adjustable eraser sizes
- **Color Picker**: 15 predefined colors plus custom color selection
- **Brush Settings**: Adjustable brush width (1-20px) and font sizes (12-48px)

### Collaboration Features
- **Real-time Sync**: Instant updates across all connected users
- **Room Management**: Create public or private collaboration rooms
- **Shareable Links**: Easy room sharing via generated URLs
- **Multi-user Presence**: Visual indicators showing active collaborators
- **User Identification**: Unique colors and names for each participant

### Canvas Management
- **Undo/Redo**: Full history management with unlimited undo/redo actions
- **Clear Canvas**: One-click canvas clearing with confirmation
- **Auto-save**: Automatic saving of drawing state
- **Responsive Canvas**: Adapts to different screen sizes and orientations

### Export & Save
- **PNG Export**: High-quality image export with adjustable quality settings
- **PDF Export**: Document-ready PDF generation
- **Quality Control**: Customizable export quality (10%-100%)
- **Instant Download**: Direct file download without server processing

### User Experience
- **Modern UI**: Apple-inspired design with glassmorphism effects
- **Smooth Animations**: Micro-interactions and hover states throughout
- **Touch Support**: Full mobile and tablet compatibility
- **Keyboard Shortcuts**: Quick access to common tools and actions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.5.3** - Type-safe development with full IntelliSense
- **Vite 5.4.2** - Lightning-fast build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework for rapid styling

### Drawing & Canvas
- **HTML5 Canvas API** - Native browser drawing capabilities
- **Custom Canvas Hook** - Optimized drawing performance and event handling
- **Touch Events** - Multi-touch support for mobile devices
- **High DPI Support** - Crisp rendering on retina displays

### UI Components & Icons
- **Lucide React 0.344.0** - Beautiful, customizable SVG icons
- **Custom Components** - Modular, reusable UI components
- **CSS Animations** - Smooth transitions and micro-interactions

### Development Tools
- **ESLint 9.9.1** - Code linting and quality enforcement
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS & Autoprefixer** - CSS processing and browser compatibility

### State Management
- **React Hooks** - useState, useEffect, useCallback for state management
- **Custom Hooks** - Specialized hooks for canvas and drawing logic
- **Local Storage** - Persistent settings and preferences

## 📋 Setup Instructions

### Prerequisites
- **Node.js** (version 16.0 or higher)
- **npm** or **yarn** package manager
- Modern web browser with HTML5 Canvas support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd collaborative-whiteboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

1. **Create production build**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

### Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🌐 Demo

**Live Demo**: [Collaborative Whiteboard Demo](https://cute-granita-817093.netlify.app/)

### Demo Features
- Try all drawing tools and features
- Create and join collaboration rooms
- Test real-time collaboration simulation
- Export your creations as PNG or PDF
- Experience the responsive design on different devices

## 🎯 Usage Guide

### Getting Started
1. **Open the application** in your web browser
2. **Start drawing** immediately on the main canvas
3. **Select tools** from the left-side tool palette
4. **Adjust settings** like color, brush size, and font size
5. **Create or join rooms** for collaboration

### Creating a Collaboration Room
1. Click **"Create Room"** in the room manager (top-right)
2. Enter a **room name** and choose privacy settings
3. **Share the generated link** with collaborators
4. Start collaborating in real-time!

### Joining a Room
1. Click **"Join Room"** or use a shared room link
2. Enter the **room ID** when prompted
3. Begin collaborating with other users instantly

### Keyboard Shortcuts
- `Ctrl/Cmd + Z` - Undo last action
- `Ctrl/Cmd + Y` - Redo last action
- `Ctrl/Cmd + S` - Export current canvas
- `Delete` - Clear selected elements

## 🔧 Customization

### Adding New Tools
1. Define tool type in `src/types/whiteboard.ts`
2. Add tool logic in `src/hooks/useCanvas.ts`
3. Update UI in `src/components/ToolPalette.tsx`

### Styling Modifications
- Modify `tailwind.config.js` for theme customization
- Update component styles in respective component files
- Adjust color schemes in the tool palette

### Real-time Integration
The current implementation includes simulation for real-time features. To integrate actual real-time functionality:

1. Set up a WebSocket server (Socket.io recommended)
2. Replace simulation logic with actual WebSocket connections
3. Implement server-side room management and state synchronization

## 📱 Browser Compatibility

- **Chrome** 90+ (Recommended)
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile browsers** with HTML5 Canvas support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Lucide React** for beautiful icons
- **Tailwind CSS** for rapid styling
- **Vite** for excellent development experience
- **React Team** for the amazing framework

---

**Built with ❤️ using React, TypeScript, and modern web technologies**

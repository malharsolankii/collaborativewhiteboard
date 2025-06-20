
-----

# Collaborative Whiteboard Application

A modern, real-time collaborative whiteboard application that enables multiple users to draw, write, and interact simultaneously on a shared digital canvas. Built with React and TypeScript, featuring a beautiful, production-ready interface with comprehensive drawing tools and seamless collaboration capabilities.

-----

## 🚀 Features

Our Collaborative Whiteboard is packed with functionalities designed to provide a rich, interactive, and efficient collaboration experience:

### Drawing Tools

  - **Pen Tool**: Smooth, pressure-sensitive drawing with customizable brush sizes and a versatile **color picker** (15 predefined colors plus custom selection).
  - **Shape Tools**: Intuitive drawing for **rectangles**, **circles**, and **lines** with real-time preview.
  - **Text Tool**: Click-to-add text functionality with customizable font sizes (12-48px) and colors.
  - **Eraser**: Precise erasing with adjustable eraser sizes.
  - **Brush Settings**: Adjustable brush width (1-20px) to fine-tune your drawing.

### Collaboration Features

  - **Real-time Sync**: Instant updates across all connected users facilitated by **WebSockets**, ensuring everyone sees changes as they happen.
  - **Room Management**: Ability to **create public or private collaboration rooms**, providing flexibility for different team needs.
  - **Shareable Links**: Easy room sharing via automatically generated URLs, allowing quick access for collaborators.
  - **Multi-user Presence**: Visual indicators showing active collaborators on the canvas.
  - **User Identification**: Unique colors and names assigned to each participant for easy identification.

### Canvas Management

  - **Undo/Redo**: Full history management with **unlimited undo/redo actions**, allowing users to easily correct mistakes or revisit previous states.
  - **Clear Canvas**: One-click canvas clearing with confirmation to start fresh.
  - **Auto-save**: Automatic saving of the drawing state to prevent data loss.
  - **Responsive Canvas**: The canvas intelligently adapts to different screen sizes and orientations, providing optimal viewing and interaction across devices.

### Export & Save

  - **PNG Export**: High-quality image export of the canvas with adjustable quality settings.
  - **PDF Export**: Document-ready PDF generation, suitable for printing or sharing.
  - **Quality Control**: Customizable export quality (10%-100%) for both PNG and PDF.
  - **Instant Download**: Direct file download without server-side processing for quick access to your creations.

### User Experience

  - **Modern UI**: An Apple-inspired design aesthetic featuring subtle glassmorphism effects for a contemporary look.
  - **Smooth Animations**: Engaging micro-interactions and hover states throughout the application for a fluid user experience.
  - **Touch Support**: Full mobile and tablet compatibility with optimized touch events for natural drawing and interaction.
  - **Keyboard Shortcuts**: Quick access to common tools and actions (e.g., `Ctrl/Cmd + Z` for undo, `Ctrl/Cmd + Y` for redo, `Ctrl/Cmd + S` for export, `Delete` to clear selected elements).
  - **Responsive Design**: Optimized layout and functionality for seamless usage across desktop, tablet, and mobile devices.

-----

## 🛠️ Tech Stack

### Frontend

  - **React 18.3.1** - Modern React with hooks and functional components for building dynamic UIs.
  - **TypeScript 5.5.3** - Type-safe development with full IntelliSense, enhancing code quality and maintainability.
  - **Vite 5.4.2** - Lightning-fast build tool and development server, ensuring rapid development cycles.
  - **Tailwind CSS 3.4.1** - Utility-first CSS framework for rapid and consistent styling.

### Drawing & Canvas

  - **HTML5 Canvas API** - Native browser drawing capabilities for high-performance rendering.
  - **Custom Canvas Hook** - Optimized drawing performance and robust event handling.
  - **Touch Events** - Implemented for multi-touch support on mobile devices.
  - **High DPI Support** - Ensures crisp rendering on retina displays.

### UI Components & Icons

  - **Lucide React 0.344.0** - Provides a collection of beautiful, customizable SVG icons.
  - **Custom Components** - Modular, reusable UI components for consistency and scalability.
  - **CSS Animations** - Smooth transitions and micro-interactions for an engaging user experience.

### Development Tools

  - **ESLint 9.9.1** - Code linting and quality enforcement to maintain code standards.
  - **TypeScript ESLint** - TypeScript-specific linting rules integrated with ESLint.
  - **PostCSS & Autoprefixer** - For CSS processing and ensuring broad browser compatibility.

### State Management

  - **React Hooks** - Leveraging `useState`, `useEffect`, `useCallback` for efficient state management within components.
  - **Custom Hooks** - Specialized hooks for encapsulating complex canvas and drawing logic.
  - **Local Storage** - Used for persistent settings and preferences, enhancing user convenience.

-----

## 📋 Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

  - **Node.js** (version 16.0 or higher)
  - **npm** or **yarn** package manager
  - A modern web browser with HTML5 Canvas support (e.g., Chrome, Firefox, Safari, Edge).

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/malharsolankii/collaborativewhiteboard.git
    cd collaborativewhiteboard
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

4.  **Open your browser**
    Navigate to `http://localhost:5173` to view the application.

### Build for Production

1.  **Create production build**

    ```bash
    npm run build
    ```

2.  **Preview production build**

    ```bash
    npm run preview
    ```

### Development Commands

  - `npm run dev` - Start development server with hot reload.
  - `npm run build` - Create optimized production build.
  - `npm run preview` - Preview production build locally.
  - `npm run lint` - Run ESLint for code quality checks.

-----

## 🌐 Demo

**Live Demo**: [Collaborative Whiteboard Demo](https://cute-granita-817093.netlify.app/)

### Demo Features

Explore the live demo to:

  - Try all drawing tools and features.
  - Create and join collaboration rooms.
  - Test real-time collaboration simulation.
  - Export your creations as PNG or PDF.
  - Experience the responsive design on different devices.

-----

## 🎯 Usage Guide

### Getting Started

1.  **Open the application** in your web browser.
2.  **Start drawing** immediately on the main canvas.
3.  **Select tools** from the left-side tool palette.
4.  **Adjust settings** like color, brush size, and font size using the options provided.
5.  **Create or join rooms** for collaborative sessions.

### Creating a Collaboration Room

1.  Click **"Create Room"** in the room manager (typically located at the top-right).
2.  Enter a **room name** and choose desired privacy settings (public/private).
3.  **Share the generated link** with your collaborators.
4.  Start collaborating in real-time with your team\!

### Joining a Room

1.  Click **"Join Room"** or use a shared room link directly.
2.  Enter the **room ID** when prompted (if not using a direct link).
3.  Begin collaborating with other users instantly.

### Keyboard Shortcuts

  - `Ctrl/Cmd + Z` - Undo last action
  - `Ctrl/Cmd + Y` - Redo last action
  - `Ctrl/Cmd + S` - Export current canvas
  - `Delete` - Clear selected elements (if selection functionality is implemented)

-----

## 🔧 Customization

### Adding New Tools

1.  Define the new tool type in `src/types/whiteboard.ts`.
2.  Implement the tool's logic and behavior within `src/hooks/useCanvas.ts`.
3.  Update the user interface in `src/components/ToolPalette.tsx` to include the new tool.

### Styling Modifications

  - Modify `tailwind.config.js` for theme customization and global styling adjustments.
  - Update individual component styles in their respective `.tsx` or `.css` files.
  - Adjust color schemes directly in the tool palette or through CSS variables.

### Real-time Integration

The current implementation includes a simulation for real-time features. To integrate actual real-time functionality:

1.  Set up a WebSocket server (Socket.io is a recommended library).
2.  Replace the existing simulation logic with actual WebSocket connections and event handling.
3.  Implement server-side room management and state synchronization logic.

-----

## 📱 Browser Compatibility

This application is designed to be compatible with modern web browsers:

  - **Chrome** 90+ (Recommended for best performance)
  - **Firefox** 88+
  - **Safari** 14+
  - **Edge** 90+
  - **Mobile browsers** with full HTML5 Canvas support.

-----

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star\! Thanks again\!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3.  Commit your Changes (`git commit -m 'Add amazing feature'`)
4.  Push to the Branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

-----

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

-----

## 🙏 Acknowledgments

  - **Lucide React** for beautiful and customizable SVG icons.
  - **Tailwind CSS** for its utility-first approach to rapid styling.
  - **Vite** for an excellent and fast development experience.
  - **React Team** for the amazing framework that powers this application.


-----


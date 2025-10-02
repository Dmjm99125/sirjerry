/**
 * Main Application Entry Point - Body Parts Fun Educational Game
 * 
 * This is the primary component that orchestrates the entire educational
 * application. It manages navigation between different game modes and
 * maintains the overall application state.
 * 
 * APPLICATION ARCHITECTURE:
 * - Single-page application with component-based navigation
 * - State-driven mode switching (no complex routing needed)
 * - Centralized back-to-menu functionality
 * - Clean separation of concerns between game modes
 * 
 * EDUCATIONAL FLOW:
 * 1. Main Menu - Children choose their preferred learning activity
 * 2. Game Mode - Engaged learning through interactive activities
 * 3. Return to Menu - Easy navigation to try different modes
 * 
 * DESIGN CONSIDERATIONS:
 * - Simple navigation suitable for young children
 * - No complex URL routing to prevent confusion
 * - Consistent back button behavior across all modes
 * - Immediate mode switching without loading delays
 * 
 * TARGET AUDIENCE: Kindergarten children (ages 4-7)
 * LEARNING OBJECTIVE: Body part identification and spatial awareness
 * USAGE CONTEXT: Classrooms, homes, therapy settings
 */

import { useState } from "react";
import { GameMenu } from "@/components/GameMenu";
import { LearnMode } from "@/components/LearnMode";
import { DragDropMode } from "@/components/DragDropMode";
import { QuizMode } from "@/components/QuizMode";
import { MemoryGame } from "@/components/MemoryGame";
import { SoundGame } from "@/components/SoundGame";
import { ColorMode } from "@/components/ColorMode";

/** 
 * Available game modes in the application
 * Each mode provides a different learning approach:
 * - menu: Main selection screen
 * - learn: Free exploration with audio feedback
 * - drag: Drag-and-drop matching game
 * - quiz: Knowledge testing with scoring
 * - memory: Card matching memory game
 * - sound: Audio-focused learning activities
 * - color: Creative coloring activities
 */
type GameMode = "menu" | "learn" | "drag" | "quiz" | "memory" | "sound" | "color";

/**
 * Main Application Component
 * 
 * Manages the overall application state and navigation between different
 * educational game modes. Uses conditional rendering to display the
 * appropriate component based on the current mode.
 */
const Index = () => {
  // Current active game mode
  const [mode, setMode] = useState<GameMode>("menu");

  /**
   * Handle game mode selection from the main menu
   * @param selectedMode - The chosen game mode to navigate to
   */
  const handleSelectMode = (selectedMode: "learn" | "drag" | "quiz" | "memory" | "sound" | "color") => {
    setMode(selectedMode);
  };

  /**
   * Handle returning to the main menu from any game mode
   * Provides consistent navigation behavior across all components
   */
  const handleBackToMenu = () => {
    setMode("menu");
  };

  // Conditional rendering based on current mode
  // Each game mode is completely self-contained
  return (
    <>
      {mode === "menu" && <GameMenu onSelectMode={handleSelectMode} />}
      {mode === "learn" && <LearnMode onBack={handleBackToMenu} />}
      {mode === "drag" && <DragDropMode onBack={handleBackToMenu} />}
      {mode === "quiz" && <QuizMode onBack={handleBackToMenu} />}
      {mode === "memory" && <MemoryGame onBack={handleBackToMenu} />}
      {mode === "sound" && <SoundGame onBack={handleBackToMenu} />}
      {mode === "color" && <ColorMode onBack={handleBackToMenu} />}
    </>
  );
};

export default Index;

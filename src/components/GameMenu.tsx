/**
 * Game Menu Component - Main Navigation Hub
 * 
 * This component serves as the central hub for selecting different game modes
 * in the Body Parts Fun educational application. It presents all available
 * learning activities in an engaging, kid-friendly interface.
 * 
 * DESIGN PRINCIPLES:
 * - Large, colorful buttons easy for young children to click
 * - Clear icons that represent each game type
 * - Hover effects that provide visual feedback
 * - Descriptive text to help children understand each mode
 * 
 * EDUCATIONAL STRUCTURE:
 * - Progressive difficulty from exploration to testing
 * - Multiple learning modalities (visual, audio, kinesthetic)
 * - Various game types to maintain engagement
 * - Self-directed learning through free choice
 * 
 * ACCESSIBILITY FEATURES:
 * - High contrast colors and clear typography
 * - Large touch targets for tablets and interactive whiteboards
 * - Consistent visual language across all buttons
 * - Descriptive text for emerging readers
 */

import { Book, Puzzle, Brain, Headphones, Grid3x3, Gamepad2 } from "lucide-react";

interface GameMenuProps {
  /** Callback function to handle game mode selection */
  onSelectMode: (mode: "learn" | "drag" | "quiz" | "memory" | "sound" | "simon") => void;
}

export const GameMenu = ({ onSelectMode }: GameMenuProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12 animate-bounce-in">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Body Parts Fun! 🎉
          </h1>
          <p className="text-2xl text-muted-foreground">
            Learn about your amazing body!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => onSelectMode("learn")}
            className="group bg-card hover:bg-gradient-primary rounded-3xl p-6 shadow-playful hover:shadow-xl transition-all hover:scale-105 border-4 border-primary/20 hover:border-primary"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="bg-primary/10 group-hover:bg-primary-foreground/20 rounded-full p-4 transition-colors">
                <Book className="w-12 h-12 text-primary group-hover:text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground group-hover:text-primary-foreground">
                Learn Mode
              </h2>
              <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80">
                Explore & learn about body parts!
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectMode("drag")}
            className="group bg-card hover:bg-gradient-fun rounded-3xl p-6 shadow-playful hover:shadow-xl transition-all hover:scale-105 border-4 border-secondary/20 hover:border-secondary"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="bg-secondary/10 group-hover:bg-secondary-foreground/20 rounded-full p-4 transition-colors">
                <Puzzle className="w-12 h-12 text-secondary group-hover:text-secondary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground group-hover:text-secondary-foreground">
                Match Game
              </h2>
              <p className="text-sm text-muted-foreground group-hover:text-secondary-foreground/80">
                Drag labels to body parts!
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectMode("quiz")}
            className="group bg-card hover:bg-gradient-success rounded-3xl p-6 shadow-playful hover:shadow-xl transition-all hover:scale-105 border-4 border-success/20 hover:border-success"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="bg-success/10 group-hover:bg-success-foreground/20 rounded-full p-4 transition-colors">
                <Brain className="w-12 h-12 text-success group-hover:text-success-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground group-hover:text-success-foreground">
                Quiz Time
              </h2>
              <p className="text-sm text-muted-foreground group-hover:text-success-foreground/80">
                Test what you learned!
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectMode("memory")}
            className="group bg-card hover:bg-gradient-primary rounded-3xl p-6 shadow-playful hover:shadow-xl transition-all hover:scale-105 border-4 border-primary/20 hover:border-primary"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="bg-primary/10 group-hover:bg-primary-foreground/20 rounded-full p-4 transition-colors">
                <Grid3x3 className="w-12 h-12 text-primary group-hover:text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground group-hover:text-primary-foreground">
                Memory Match
              </h2>
              <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80">
                Find matching pairs!
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectMode("sound")}
            className="group bg-card hover:bg-gradient-fun rounded-3xl p-6 shadow-playful hover:shadow-xl transition-all hover:scale-105 border-4 border-secondary/20 hover:border-secondary"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="bg-secondary/10 group-hover:bg-secondary-foreground/20 rounded-full p-4 transition-colors">
                <Headphones className="w-12 h-12 text-secondary group-hover:text-secondary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground group-hover:text-secondary-foreground">
                Listen & Find
              </h2>
              <p className="text-sm text-muted-foreground group-hover:text-secondary-foreground/80">
                Hear it, then find it!
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectMode("simon")}
            className="group bg-card hover:bg-gradient-success rounded-3xl p-6 shadow-playful hover:shadow-xl transition-all hover:scale-105 border-4 border-success/20 hover:border-success"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="bg-success/10 group-hover:bg-success-foreground/20 rounded-full p-4 transition-colors">
                <Gamepad2 className="w-12 h-12 text-success group-hover:text-success-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground group-hover:text-success-foreground">
                Simon Says
              </h2>
              <p className="text-sm text-muted-foreground group-hover:text-success-foreground/80">
                Quick! Tap what Simon says!
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

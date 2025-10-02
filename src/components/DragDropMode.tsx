/**
 * Drag & Drop Mode Component - Interactive Matching Game
 * 
 * This component creates a drag-and-drop matching game where children
 * drag body part labels to their correct locations on the character.
 * It develops fine motor skills and spatial reasoning.
 * 
 * EDUCATIONAL BENEFITS:
 * - Hand-eye coordination through drag and drop
 * - Spatial awareness and body part positioning
 * - Reading comprehension (matching words to images)
 * - Problem-solving through trial and error
 * - Sense of achievement through completion
 * 
 * GAME MECHANICS:
 * - Drag labels from left panel to body locations
 * - Visual feedback for correct/incorrect matches
 * - Progress tracking with match counter
 * - Celebration when all parts are matched
 * - Option to reset and play again
 * 
 * ACCESSIBILITY CONSIDERATIONS:
 * - Large drag targets for young children
 * - Clear visual states for dragged items
 * - Immediate feedback for all actions
 * - Disabled state for completed matches
 */

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import bodyImage from "@/assets/body-illustration.png";
import Confetti from "react-confetti";
import { bodyParts as allBodyParts } from "@/data/bodyParts";

interface DragDropModeProps {
  onBack: () => void;
}

/**
 * Curated selection of body parts for the drag-drop game
 * 
 * SELECTION CRITERIA:
 * - Most recognizable body parts for young children
 * - Mix of easy (head, hands) and challenging (elbows, thighs) targets
 * - Includes bilateral parts to teach left/right awareness
 * - Balanced difficulty progression
 */
// Select a subset for the drag-drop game
const bodyParts = allBodyParts.filter(part => 
  ["head", "eyes", "right-eye", "ears", "right-ear", "nose", "mouth", "arms", "right-arm", "hands", "right-hand", "belly", "legs", "right-leg", "thighs", "right-thigh", "knees", "right-knee", "feet", "right-foot"].includes(part.id)
);

export const DragDropMode = ({ onBack }: DragDropModeProps) => {
  // Game state management
  const [draggedItem, setDraggedItem] = useState<string | null>(null); // Currently dragged label
  const [matched, setMatched] = useState<string[]>([]); // Successfully matched items
  const [showConfetti, setShowConfetti] = useState(false); // Celebration animation

  /**
   * Handle start of drag operation
   * @param id - ID of the body part being dragged
   */
  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  /**
   * Handle drop operation on target area
   * 
   * @param targetId - ID of the drop target area
   * 
   * VALIDATION LOGIC:
   * 1. Check if dragged item matches target area
   * 2. Ensure item hasn't already been matched
   * 3. Update matched items list
   * 4. Provide appropriate feedback
   * 5. Check for game completion
   */
  const handleDrop = (targetId: string) => {
    // Check for correct match and prevent duplicate matches
    if (draggedItem === targetId && !matched.includes(targetId)) {
      // Add to matched items
      setMatched([...matched, targetId]);
      
      // Positive feedback for correct match
      toast.success("🎉 Perfect match!", {
        description: `You found the ${bodyParts.find((p) => p.id === targetId)?.name}!`,
      });

      // Check for game completion
      if (matched.length + 1 === bodyParts.length) {
        setShowConfetti(true);
        toast.success("🌟 Amazing! You matched all body parts!", {
          description: "You're a body parts expert!",
        });
        // Auto-hide confetti after celebration
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } else if (draggedItem !== targetId) {
      // Gentle feedback for incorrect match
      toast.error("Oops! Try again!", {
        description: "That's not the right spot!",
      });
    }
    
    // Clear the dragged item regardless of outcome
    setDraggedItem(null);
  };

  /**
   * Reset game to initial state for replay
   * Allows children to practice multiple times
   */
  const handleReset = () => {
    setMatched([]);
    setShowConfetti(false);
    toast.info("Let's try again!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-4">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button onClick={onBack} variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-fun bg-clip-text text-transparent">
            Match Game
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          <div className="bg-card rounded-3xl shadow-playful p-8 border-4 border-secondary/20 flex flex-col">
            <h2 className="text-3xl font-bold text-center mb-6 text-foreground">
              Drag the labels 👇
            </h2>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[60vh]">
              {bodyParts.map((part) => (
                <div
                  key={part.id}
                  draggable={!matched.includes(part.id)}
                  onDragStart={() => handleDragStart(part.id)}
                  className={`p-6 rounded-2xl text-2xl font-bold text-center cursor-move transition-all ${
                    matched.includes(part.id)
                      ? "bg-success/20 text-success line-through opacity-50"
                      : "bg-secondary text-secondary-foreground hover:scale-105 shadow-playful"
                  }`}
                >
                  {part.name}
                </div>
              ))}
            </div>

            <div className="mt-6 text-center flex-shrink-0">
              <p className="text-xl font-bold text-foreground">
                Matched: {matched.length} / {bodyParts.length}
              </p>
              {matched.length === bodyParts.length && (
                <Button onClick={handleReset} variant="playful" size="lg" className="mt-4">
                  Play Again
                </Button>
              )}
            </div>
          </div>

          <div className="bg-card rounded-3xl shadow-playful p-8 border-4 border-secondary/20">
            <h2 className="text-3xl font-bold text-center mb-6 text-foreground">
              Drop here! 🎯
            </h2>

            <div className="relative mx-auto max-w-md">
              <img
                src={bodyImage}
                alt="Body illustration"
                className="w-full h-auto"
              />

              {bodyParts.map((part) => (
                <div
                  key={part.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(part.id)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl font-bold transition-all ${
                    matched.includes(part.id)
                      ? "bg-success border-success text-success-foreground animate-bounce-in"
                      : "bg-card/50 border-dashed border-secondary hover:bg-secondary/20"
                  }`}
                  style={{ left: `${part.x}%`, top: `${part.y}%` }}
                >
                  {matched.includes(part.id) && "✓"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Match Game Component - Interactive Matching (Mobile-Optimized)
 * 
 * A mobile-friendly matching game where children tap body part labels
 * to select them, then tap the body part on the character to complete the match.
 * This works perfectly on both desktop and mobile devices.
 * 
 * EDUCATIONAL BENEFITS:
 * - Hand-eye coordination through tapping
 * - Spatial awareness and body part positioning
 * - Reading comprehension (matching words to images)
 * - Problem-solving through selection
 * - Sense of achievement through completion
 * 
 * GAME MECHANICS:
 * - Tap a label to select it (first step)
 * - Tap the body part location to complete the match (second step)
 * - Visual feedback for selection and matches
 * - Progress tracking with match counter
 * - Celebration when all parts are matched
 * - Option to reset and play again
 * 
 * ACCESSIBILITY CONSIDERATIONS:
 * - Large tap targets for young children
 * - Clear visual states for selected items
 * - Immediate feedback for all actions
 * - Works perfectly on mobile, tablet, and desktop
 */

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
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
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null); // Currently selected label
  const [matched, setMatched] = useState<string[]>([]); // Successfully matched items
  const [showConfetti, setShowConfetti] = useState(false); // Celebration animation

  /**
   * Handle label selection
   * @param id - ID of the body part label being selected
   */
  const handleSelectLabel = (id: string) => {
    if (matched.includes(id)) return; // Can't select already matched items
    setSelectedLabel(selectedLabel === id ? null : id); // Toggle selection
  };

  /**
   * Handle body part tap to complete match
   * 
   * @param targetId - ID of the body part being tapped
   * 
   * VALIDATION LOGIC:
   * 1. Check if a label is selected
   * 2. Check if the selected label matches the target
   * 3. Ensure item hasn't already been matched
   * 4. Update matched items list
   * 5. Provide appropriate feedback
   * 6. Check for game completion
   */
  const handleTapBodyPart = (targetId: string) => {
    // Check if a label is selected
    if (!selectedLabel) {
      toast.info("Pick a label first! 👆");
      return;
    }

    // Check for correct match and prevent duplicate matches
    if (selectedLabel === targetId && !matched.includes(targetId)) {
      // Add to matched items
      setMatched([...matched, targetId]);
      setSelectedLabel(null);
      
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
    } else if (selectedLabel !== targetId) {
      // Gentle feedback for incorrect match
      toast.error("Oops! Try again!", {
        description: "That's not the right spot!",
      });
    } else if (matched.includes(targetId)) {
      toast.info("Already matched! ✓");
    }
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
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button onClick={onBack} variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-fun bg-clip-text text-transparent">
            Match Game
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card className="p-6 text-center bg-gradient-to-r from-secondary to-secondary/50 text-secondary-foreground">
            <p className="text-2xl md:text-3xl font-bold">
              Matched: {matched.length} / {bodyParts.length}
            </p>
          </Card>

          {/* Instructions */}
          <Card className="p-6 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Step 1: Tap a label �
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {bodyParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => handleSelectLabel(part.id)}
                  disabled={matched.includes(part.id)}
                  className={`p-3 md:p-4 rounded-lg font-bold text-sm md:text-base transition-all transform hover:scale-105 active:scale-95 ${
                    matched.includes(part.id)
                      ? "bg-success/20 text-success line-through opacity-50 cursor-not-allowed"
                      : selectedLabel === part.id
                      ? "bg-primary text-primary-foreground scale-110 shadow-lg"
                      : "bg-secondary text-secondary-foreground hover:shadow-md shadow-sm"
                  }`}
                >
                  <div className="text-xl md:text-2xl mb-1">{part.emoji}</div>
                  {part.name}
                </button>
              ))}
            </div>
          </Card>

          {/* Step 2 Instructions */}
          <Card className="p-6 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Step 2: Tap the body part 👇
            </h2>
            
            {selectedLabel && (
              <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary text-center">
                <p className="text-sm text-muted-foreground mb-2">Looking for:</p>
                <p className="text-2xl md:text-3xl font-bold">
                  {bodyParts.find(p => p.id === selectedLabel)?.emoji} {bodyParts.find(p => p.id === selectedLabel)?.name}
                </p>
              </div>
            )}

            {/* Character with clickable body parts */}
            <div className="relative w-full mx-auto bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl p-8 min-h-96 flex items-center justify-center">
              {/* Character */}
              <div className="text-8xl md:text-9xl">🧍</div>

              {/* Clickable body part markers */}
              {bodyParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => handleTapBodyPart(part.id)}
                  disabled={matched.includes(part.id)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                    matched.includes(part.id)
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-125 cursor-pointer active:scale-90"
                  }`}
                  style={{ left: `${part.x}%`, top: `${part.y}%` }}
                  title={part.name}
                >
                  <div
                    className={`text-5xl md:text-6xl p-2 rounded-full transition-all flex items-center justify-center ${
                      matched.includes(part.id)
                        ? "bg-success text-success-foreground shadow-lg scale-110"
                        : selectedLabel === part.id
                        ? "bg-primary text-primary-foreground shadow-xl scale-110 animate-pulse"
                        : "bg-white/70 hover:bg-blue-200 shadow-md"
                    }`}
                  >
                    {matched.includes(part.id) ? "✓" : part.emoji}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Reset Button */}
          {matched.length === bodyParts.length && (
            <Card className="p-8 text-center bg-gradient-to-r from-success to-success/50 text-success-foreground space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">🌟 Amazing!</h2>
              <p className="text-lg md:text-xl">You matched all the body parts!</p>
              <Button onClick={handleReset} size="lg" className="text-lg px-8 py-6 bg-success-foreground text-success hover:bg-success-foreground/90">
                Play Again 🎮
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

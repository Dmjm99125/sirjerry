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

// Select a subset for the drag-drop game
const bodyParts = allBodyParts.filter(part => 
  ["head", "eyes", "nose", "mouth", "arms", "hands", "belly", "legs", "feet"].includes(part.id)
);

export const DragDropMode = ({ onBack }: DragDropModeProps) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDrop = (targetId: string) => {
    if (draggedItem === targetId && !matched.includes(targetId)) {
      setMatched([...matched, targetId]);
      toast.success("🎉 Perfect match!", {
        description: `You found the ${bodyParts.find((p) => p.id === targetId)?.name}!`,
      });

      if (matched.length + 1 === bodyParts.length) {
        setShowConfetti(true);
        toast.success("🌟 Amazing! You matched all body parts!", {
          description: "You're a body parts expert!",
        });
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } else if (draggedItem !== targetId) {
      toast.error("Oops! Try again!", {
        description: "That's not the right spot!",
      });
    }
    setDraggedItem(null);
  };

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

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-3xl shadow-playful p-8 border-4 border-secondary/20">
            <h2 className="text-3xl font-bold text-center mb-6 text-foreground">
              Drag the labels 👇
            </h2>
            
            <div className="space-y-4">
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

            <div className="mt-6 text-center">
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

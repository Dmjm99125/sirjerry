import { useState } from "react";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import bodyImage from "@/assets/body-illustration.png";
import { bodyParts } from "@/data/bodyParts";

interface LearnModeProps {
  onBack: () => void;
}

export const LearnMode = ({ onBack }: LearnModeProps) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const handlePartClick = (part: typeof bodyParts[0]) => {
    setSelectedPart(part.id);
    const utterance = new SpeechSynthesisUtterance(part.name);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button onClick={onBack} variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Learn Mode
          </h1>
        </div>

        <div className="bg-card rounded-3xl shadow-playful p-8 border-4 border-primary/20">
          <p className="text-center text-2xl text-muted-foreground mb-8">
            👆 Click on the body to learn!
          </p>

          <div className="relative mx-auto max-w-md">
            <img
              src={bodyImage}
              alt="Body illustration"
              className="w-full h-auto"
            />

            {bodyParts.map((part) => (
              <button
                key={part.id}
                onClick={() => handlePartClick(part)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                  selectedPart === part.id
                    ? "scale-125 animate-bounce-in"
                    : "hover:scale-110"
                }`}
                style={{ left: `${part.x}%`, top: `${part.y}%` }}
              >
                <div
                  className={`text-4xl cursor-pointer ${
                    selectedPart === part.id ? "animate-wiggle" : ""
                  }`}
                >
                  {part.emoji}
                </div>
              </button>
            ))}
          </div>

          {selectedPart && (
            <div className="mt-8 animate-bounce-in">
              <Card className="bg-gradient-primary p-6 border-0 shadow-playful">
                <div className="text-center mb-4">
                  <p className="text-5xl font-bold text-primary-foreground mb-2">
                    {bodyParts.find((p) => p.id === selectedPart)?.name}
                  </p>
                </div>
                <div className="bg-primary-foreground/20 rounded-2xl p-4 mb-3">
                  <p className="text-xl text-primary-foreground leading-relaxed">
                    {bodyParts.find((p) => p.id === selectedPart)?.description}
                  </p>
                </div>
                <div className="bg-accent/20 rounded-2xl p-4 flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-accent-foreground flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-bold text-accent-foreground mb-1">Fun Fact:</p>
                    <p className="text-base text-primary-foreground">
                      {bodyParts.find((p) => p.id === selectedPart)?.funFact}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

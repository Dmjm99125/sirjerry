import { useState, useEffect } from "react";
import { ArrowLeft, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import bodyImage from "@/assets/body-illustration.png";
import Confetti from "react-confetti";
import { bodyParts as allBodyParts } from "@/data/bodyParts";

interface SoundGameProps {
  onBack: () => void;
}

// Select body parts for sound game
const bodyParts = allBodyParts.filter(part => 
  ["head", "eyes", "nose", "mouth", "ears", "arms", "hands", "belly", "legs", "feet"].includes(part.id)
);

export const SoundGame = ({ onBack }: SoundGameProps) => {
  const [currentPart, setCurrentPart] = useState(bodyParts[0]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    playSound();
  }, [currentPart]);

  const playSound = () => {
    const utterance = new SpeechSynthesisUtterance(`Find the ${currentPart.name}`);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (selectedX: number, selectedY: number) => {
    const distance = Math.sqrt(
      Math.pow(selectedX - currentPart.x, 2) + Math.pow(selectedY - currentPart.y, 2)
    );

    if (distance < 15) {
      setScore(score + 1);
      toast.success("🎉 Perfect!", {
        description: `That's the ${currentPart.name}!`,
      });

      // Speak encouragement
      const encouragement = new SpeechSynthesisUtterance("Great job!");
      encouragement.rate = 0.9;
      window.speechSynthesis.speak(encouragement);
    } else {
      toast.error("Try again!", {
        description: "Listen carefully and try once more!",
      });
    }

    if (round < bodyParts.length) {
      setTimeout(() => {
        setRound(round + 1);
        setCurrentPart(bodyParts[round]);
      }, 1500);
    } else {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const handleReset = () => {
    setRound(1);
    setScore(0);
    setCurrentPart(bodyParts[0]);
    setShowConfetti(false);
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
            Listen & Find
          </h1>
        </div>

        {round <= bodyParts.length ? (
          <div className="bg-card rounded-3xl shadow-playful p-8 border-4 border-secondary/20">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-2xl font-bold text-foreground">
                Round {round} of {bodyParts.length}
              </p>
              <p className="text-2xl font-bold text-success">
                Score: {score}
              </p>
            </div>

            <div className="text-center mb-8 bg-gradient-fun rounded-3xl p-6 animate-bounce-in">
              <Button
                onClick={playSound}
                variant="playful"
                size="lg"
                className="mb-4 gap-3"
              >
                <Volume2 className="w-8 h-8" />
                <span className="text-2xl">Listen Again</span>
              </Button>
              <p className="text-3xl font-bold text-secondary-foreground mt-4">
                🎧 Listen carefully and find the body part!
              </p>
            </div>

            <div className="relative mx-auto max-w-md cursor-pointer">
              <img
                src={bodyImage}
                alt="Body illustration"
                className="w-full h-auto"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  handleAnswer(x, y);
                }}
              />
            </div>

            <p className="text-center text-xl text-muted-foreground mt-6">
              👆 Click on the body to answer!
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-3xl shadow-success p-12 border-4 border-secondary text-center animate-bounce-in">
            <h2 className="text-6xl font-bold text-secondary mb-6">
              🎵 Game Complete! 🎵
            </h2>
            <p className="text-4xl font-bold text-foreground mb-4">
              Your Score: {score} / {bodyParts.length}
            </p>
            <p className="text-2xl text-muted-foreground mb-8">
              {score === bodyParts.length
                ? "Perfect listening! 🏆"
                : score >= bodyParts.length / 2
                ? "Great job listening! 🎉"
                : "Keep practicing! 💪"}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleReset} variant="playful" size="lg">
                Play Again
              </Button>
              <Button onClick={onBack} variant="outline" size="lg">
                Back to Menu
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Simon Says Game Component - Interactive Body Parts Challenge (Mobile-Optimized)
 * 
 * An exciting, fast-paced game where children have to quickly tap the correct
 * body part on the character when "Simon says"! This game combines learning with 
 * reaction time and listening skills, optimized for mobile with scaled character.
 * 
 * GAME MECHANICS:
 * - Simon calls out a body part (text + emoji)
 * - Child must quickly tap the exact spot on the character's body
 * - Points awarded for correct taps (more points for faster)
 * - Timer adds excitement and challenge
 * - Positional accuracy is key - real gameplay challenge
 * 
 * EDUCATIONAL BENEFITS:
 * - Reinforces body part recognition through spatial learning
 * - Develops quick thinking and reaction time
 * - Improves listening and following directions
 * - Builds confidence through positive feedback
 * - Spatial awareness and fine motor skills
 * 
 * DESIGN FEATURES:
 * - Mobile-optimized character scaling
 * - Properly sized tap targets for all screen sizes
 * - Large, clear instructions
 * - Visual and audio feedback
 * - Score tracking for motivation
 * - Full responsive design
 */

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bodyParts, BodyPart } from "@/data/bodyParts";
import { ArrowLeft, Trophy, Timer, Star } from "lucide-react";

interface SimonSaysGameProps {
  onBack: () => void;
}

export const SimonSaysGame = ({ onBack }: SimonSaysGameProps) => {
  const [currentPart, setCurrentPart] = useState<BodyPart | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(5);
  const [gameState, setGameState] = useState<"ready" | "playing" | "correct" | "wrong" | "finished">("ready");
  const [message, setMessage] = useState("");
  const [streak, setStreak] = useState(0);
  const [totalRounds] = useState(10);

  // Start new round
  const startNewRound = useCallback(() => {
    if (round > totalRounds) {
      setGameState("finished");
      return;
    }

    const randomPart = bodyParts[Math.floor(Math.random() * bodyParts.length)];
    setCurrentPart(randomPart);
    setTimeLeft(5);
    setGameState("playing");
    setMessage("");
  }, [round, totalRounds]);

  // Handle wrong answer
  const handleWrongAnswer = useCallback(() => {
    setStreak(0);
    setGameState("wrong");
    setMessage(`Oops! That was the ${currentPart?.name}. Try again next time!`);

    setTimeout(() => {
      setRound(prev => prev + 1);
      startNewRound();
    }, 2000);
  }, [currentPart, startNewRound]);

  // Handle correct answer
  const handleCorrectAnswer = useCallback(() => {
    const points = Math.max(1, timeLeft); // More points for faster answers
    setScore(prev => prev + points);
    setStreak(prev => prev + 1);
    setGameState("correct");
    
    const messages = [
      "🎉 Awesome! You found it!",
      "⭐ Perfect! Great job!",
      "🌟 Amazing! You're so smart!",
      "💫 Fantastic! Keep going!",
      "🏆 Brilliant! You did it!"
    ];
    setMessage(messages[Math.floor(Math.random() * messages.length)]);

    setTimeout(() => {
      setRound(prev => prev + 1);
      startNewRound();
    }, 1500);
  }, [timeLeft, startNewRound]);

  // Timer countdown
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === "playing" && timeLeft === 0) {
      handleWrongAnswer();
    }
  }, [timeLeft, gameState, handleWrongAnswer]);

  // Handle body part click
  const handlePartClick = (part: BodyPart) => {
    if (gameState !== "playing") return;

    if (part.id === currentPart?.id) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  };

  // Start game
  const handleStartGame = () => {
    setScore(0);
    setRound(1);
    setStreak(0);
    startNewRound();
  };

  // Restart game
  const handleRestart = () => {
    setScore(0);
    setRound(1);
    setStreak(0);
    setGameState("ready");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-2 md:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6 gap-2">
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            className="gap-2 text-xs md:text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex gap-2">
            <Card className="px-2 md:px-3 py-1 md:py-2 flex items-center gap-1 text-xs md:text-sm">
              <Trophy className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
              <span className="font-bold">{score}</span>
            </Card>
            <Card className="px-2 md:px-3 py-1 md:py-2 flex items-center gap-1 text-xs md:text-sm">
              <Star className="w-3 h-3 md:w-4 md:h-4 text-orange-500" />
              <span className="font-bold">{streak}</span>
            </Card>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          {/* Left Panel - Instructions */}
          <div className="md:col-span-1 space-y-3 md:space-y-4">
            {gameState === "ready" && (
              <Card className="p-4 md:p-6 space-y-4 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-purple-600">
                  Simon Says 🎮
                </h1>
                <p className="text-sm md:text-lg font-semibold">
                  Tap the body part Simon calls out!
                </p>
                <p className="text-xs md:text-base text-muted-foreground">
                  Be fast to get more points! ⚡
                </p>
                <Button
                  onClick={handleStartGame}
                  size="lg"
                  className="w-full text-base md:text-lg px-4 md:px-6 py-2 md:py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Start! 🚀
                </Button>
              </Card>
            )}

            {gameState === "playing" && currentPart && (
              <Card className="p-4 md:p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Timer className={`w-5 h-5 md:w-6 md:h-6 ${timeLeft <= 2 ? 'animate-pulse text-red-300' : ''}`} />
                  <span className={`text-4xl md:text-5xl font-bold ${timeLeft <= 2 ? 'text-red-300' : ''}`}>
                    {timeLeft}s
                  </span>
                </div>
                <p className="text-xs md:text-sm">Simon Says:</p>
                <div className="text-4xl md:text-5xl">{currentPart.emoji}</div>
                <p className="text-base md:text-xl font-bold">
                  Find the {currentPart.name}!
                </p>
                <p className="text-xs md:text-sm">Round {round}/{totalRounds}</p>
              </Card>
            )}

            {gameState === "correct" && (
              <Card className="p-4 md:p-6 space-y-3 text-center bg-green-50 border-2 border-green-300">
                <div className="text-5xl md:text-6xl animate-bounce">🎉</div>
                <p className="text-lg md:text-2xl font-bold text-green-600">
                  {message}
                </p>
                <p className="text-sm md:text-lg font-bold text-green-700">
                  +{Math.max(1, timeLeft)} pts!
                </p>
              </Card>
            )}

            {gameState === "wrong" && (
              <Card className="p-4 md:p-6 space-y-3 text-center bg-orange-50 border-2 border-orange-300">
                <div className="text-5xl md:text-6xl animate-bounce">😅</div>
                <p className="text-base md:text-xl font-bold text-orange-600">
                  {message}
                </p>
              </Card>
            )}

            {gameState === "finished" && (
              <Card className="p-4 md:p-6 space-y-3 text-center">
                <div className="text-5xl md:text-6xl">🏆</div>
                <h2 className="text-2xl md:text-3xl font-bold text-purple-600">
                  Game Over!
                </h2>
                <div className="space-y-2">
                  <p className="text-xl md:text-2xl font-bold text-green-600">
                    {score} pts
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {score >= 40 ? "🌟 Outstanding!" :
                     score >= 30 ? "⭐ Great job!" :
                     score >= 20 ? "👍 Good work!" :
                     "💪 Nice try!"}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleRestart}
                    size="lg"
                    className="text-sm md:text-base px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Play Again!
                  </Button>
                  <Button
                    onClick={onBack}
                    size="lg"
                    variant="outline"
                    className="text-sm md:text-base"
                  >
                    Menu
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Right Panel - Character with clickable body parts */}
          <div className="md:col-span-2">
            <Card className="p-3 md:p-6 h-full">
              <div className="relative w-full mx-auto bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl md:rounded-2xl aspect-square md:aspect-auto min-h-96 md:min-h-full flex items-center justify-center overflow-hidden">
                {/* Character - scales based on container */}
                <div className="text-7xl md:text-9xl leading-none">🧍</div>

                {/* Clickable body part markers - scaled based on screen size */}
                {bodyParts.map((part) => (
                  <button
                    key={part.id}
                    onClick={() => handlePartClick(part)}
                    disabled={gameState !== "playing"}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                      gameState === "playing"
                        ? "hover:scale-125 cursor-pointer active:scale-90"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    style={{
                      left: `${part.x}%`,
                      top: `${part.y}%`,
                    }}
                    title={part.name}
                  >
                    <div
                      className={`p-1 md:p-2 rounded-full transition-all flex items-center justify-center text-3xl md:text-4xl w-10 h-10 md:w-12 md:h-12 ${
                        gameState === "playing"
                          ? "bg-white/70 hover:bg-blue-200 shadow-md hover:shadow-lg"
                          : "bg-gray-100"
                      } ${
                        gameState === "correct" && currentPart?.id === part.id
                          ? "bg-green-300 animate-pulse scale-125 shadow-lg"
                          : ""
                      } ${
                        gameState === "wrong" && currentPart?.id === part.id
                          ? "bg-red-300 animate-pulse scale-125 shadow-lg"
                          : ""
                      }`}
                    >
                      {part.emoji}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

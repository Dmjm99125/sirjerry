/**
 * Quiz Mode Component - Interactive Body Parts Quiz Game
 * 
 * This component creates an engaging quiz experience where children click on
 * body parts to answer questions. It includes scoring, visual feedback,
 * and prevents cheating through spam-clicking.
 * 
 * EDUCATIONAL GOALS:
 * - Test body part identification knowledge
 * - Improve hand-eye coordination through clicking
 * - Build confidence through positive feedback
 * - Encourage learning through immediate responses
 * 
 * GAME MECHANICS:
 * - One question at a time with clear instructions
 * - Click anywhere on the character image to answer
 * - Tolerance zone around correct answer (15% radius)
 * - Score tracking with encouraging messages
 * - Visual and audio feedback for responses
 * 
 * ANTI-CHEAT MEASURES:
 * - Only one click allowed per question
 * - Visual indication when question is answered
 * - Automatic progression to prevent rushing
 */

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import bodyImage from "@/assets/body-illustration.png";
import Confetti from "react-confetti";
import { bodyParts as allBodyParts } from "@/data/bodyParts";

interface QuizModeProps {
  onBack: () => void;
}

/**
 * Filter body parts for quiz questions
 * 
 * Selected parts focus on the most recognizable and important body parts
 * for kindergarten learning objectives. Includes both left/right variants
 * to teach bilateral awareness.
 */
// Select a subset for the quiz
const bodyParts = allBodyParts.filter(part => 
  ["head", "eyes", "right-eye", "nose", "mouth", "ears", "right-ear", "shoulders", "right-shoulder", "arms", "right-arm", "hands", "right-hand", "belly", "legs", "right-leg", "thighs", "right-thigh", "knees", "right-knee", "feet", "right-foot"].includes(part.id)
);

export const QuizMode = ({ onBack }: QuizModeProps) => {
  // Game state management
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answered, setAnswered] = useState(false); // Prevents spam clicking

  const currentPart = bodyParts[currentQuestion];

  /**
   * Handle answer submission when user clicks on the character
   * 
   * @param selectedX - X coordinate of click (0-100%)
   * @param selectedY - Y coordinate of click (0-100%)
   * 
   * LOGIC:
   * 1. Check if question already answered (prevent spam)
   * 2. Calculate distance from click to correct answer
   * 3. Determine if click is within tolerance zone
   * 4. Update score and show feedback
   * 5. Progress to next question or complete quiz
   */
  const handleAnswer = (selectedX: number, selectedY: number) => {
    // Prevent multiple clicks on the same question
    if (answered) return;
    
    setAnswered(true);
    
    // Calculate distance between click and correct answer
    // Uses Euclidean distance formula: √((x₂-x₁)² + (y₂-y₁)²)
    const distance = Math.sqrt(
      Math.pow(selectedX - currentPart.x, 2) + Math.pow(selectedY - currentPart.y, 2)
    );

    // Check if click is within acceptable range (15% tolerance)
    // This generous tolerance accounts for:
    // - Young children's motor skills
    // - Different screen sizes and resolutions
    // - Approximate nature of body part locations
    if (distance < 15) {
      setScore(score + 1);
      toast.success("🎉 Correct!", {
        description: `That's the ${currentPart.name}!`,
      });
    } else {
      toast.error("Try again next time!", {
        description: `That's not the ${currentPart.name}`,
      });
    }

    // Progress to next question or complete quiz
    if (currentQuestion + 1 < bodyParts.length) {
      // 1-second delay allows children to:
      // - See the feedback message
      // - Process whether they were correct
      // - Prepare for the next question
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setAnswered(false); // Reset for next question
      }, 1000);
    } else {
      // Quiz completed - show celebration
      setQuizComplete(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  /**
   * Reset quiz to initial state for replay
   * Useful for repeated practice and learning reinforcement
   */
  const handleReset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
    setAnswered(false);
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
          <h1 className="text-4xl font-bold bg-gradient-success bg-clip-text text-transparent">
            Quiz Time
          </h1>
        </div>

        {!quizComplete ? (
          <div className="bg-card rounded-3xl shadow-playful p-8 border-4 border-success/20">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-2xl font-bold text-foreground">
                Question {currentQuestion + 1} of {bodyParts.length}
              </p>
              <p className="text-2xl font-bold text-success">
                Score: {score}
              </p>
            </div>

            <div className="text-center mb-8 bg-gradient-success rounded-3xl p-6 animate-bounce-in">
              <p className="text-4xl font-bold text-success-foreground">
                Where is the {currentPart.name}?
              </p>
            </div>

            <div className={`relative mx-auto max-w-md ${answered ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
              <img
                src={bodyImage}
                alt="Body illustration"
                className="w-full h-auto"
                onClick={(e) => {
                  if (answered) return; // Prevent clicks after answering
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
          <div className="bg-card rounded-3xl shadow-success p-12 border-4 border-success text-center animate-bounce-in">
            <h2 className="text-6xl font-bold text-success mb-6">
              🌟 Quiz Complete! 🌟
            </h2>
            <p className="text-4xl font-bold text-foreground mb-4">
              Your Score: {score} / {bodyParts.length}
            </p>
            <p className="text-2xl text-muted-foreground mb-8">
              {score === bodyParts.length
                ? "Perfect! You're a body parts expert! 🏆"
                : score >= bodyParts.length / 2
                ? "Great job! Keep learning! 🎉"
                : "Good try! Practice more! 💪"}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleReset} variant="success" size="lg">
                Try Again
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

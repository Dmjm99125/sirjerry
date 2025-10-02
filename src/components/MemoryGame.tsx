import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Confetti from "react-confetti";
import { bodyParts as allBodyParts } from "@/data/bodyParts";

interface MemoryGameProps {
  onBack: () => void;
}

// Select 6 body parts for memory game (12 cards total)
const selectedParts = allBodyParts
  .filter(part => ["head", "eyes", "nose", "mouth", "hands", "feet"].includes(part.id));

interface Card {
  id: string;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  pairId: string;
}

export const MemoryGame = ({ onBack }: MemoryGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    
    selectedParts.forEach((part) => {
      // Add emoji card
      gameCards.push({
        id: `${part.id}-emoji`,
        content: part.emoji,
        isFlipped: false,
        isMatched: false,
        pairId: part.id,
      });
      
      // Add name card
      gameCards.push({
        id: `${part.id}-name`,
        content: part.name,
        isFlipped: false,
        isMatched: false,
        pairId: part.id,
      });
    });

    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setMoves(0);
    setFlippedCards([]);
  };

  const handleCardClick = (cardId: string) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      checkMatch(newFlipped, newCards);
    }
  };

  const checkMatch = (flipped: string[], currentCards: Card[]) => {
    const [first, second] = flipped.map(id => currentCards.find(c => c.id === id)!);

    setTimeout(() => {
      if (first.pairId === second.pairId) {
        const matched = currentCards.map(c =>
          flipped.includes(c.id) ? { ...c, isMatched: true } : c
        );
        setCards(matched);
        toast.success("🎉 Great match!", {
          description: `You found the ${first.pairId}!`,
        });

        const allMatched = matched.every(c => c.isMatched);
        if (allMatched) {
          setShowConfetti(true);
          toast.success("🌟 Amazing! You found all pairs!", {
            description: `You did it in ${moves + 1} moves!`,
          });
          setTimeout(() => setShowConfetti(false), 5000);
        }
      } else {
        const unflipped = currentCards.map(c =>
          flipped.includes(c.id) && !c.isMatched ? { ...c, isFlipped: false } : c
        );
        setCards(unflipped);
        toast.error("Not a match! Try again!");
      }
      setFlippedCards([]);
    }, 1000);
  };

  const matchedCount = cards.filter(c => c.isMatched).length / 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-4">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button onClick={onBack} variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Memory Match
          </h1>
        </div>

        <div className="bg-card rounded-3xl shadow-playful p-8 border-4 border-primary/20 mb-6">
          <div className="flex justify-between items-center text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">Moves: {moves}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                Matched: {matchedCount} / {selectedParts.length}
              </p>
            </div>
            <Button onClick={initializeGame} variant="playful" size="lg">
              New Game
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched}
              className={`aspect-square rounded-2xl text-3xl font-bold transition-all ${
                card.isFlipped || card.isMatched
                  ? "bg-gradient-primary text-primary-foreground shadow-playful scale-105"
                  : "bg-secondary hover:bg-secondary/80 text-secondary-foreground hover:scale-105"
              } ${card.isMatched ? "opacity-70" : ""}`}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="flex items-center justify-center h-full animate-bounce-in">
                  {card.content}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-6xl">
                  ?
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

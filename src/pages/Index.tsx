import { useState } from "react";
import { GameMenu } from "@/components/GameMenu";
import { LearnMode } from "@/components/LearnMode";
import { DragDropMode } from "@/components/DragDropMode";
import { QuizMode } from "@/components/QuizMode";
import { MemoryGame } from "@/components/MemoryGame";
import { SoundGame } from "@/components/SoundGame";
import { ColorMode } from "@/components/ColorMode";

type GameMode = "menu" | "learn" | "drag" | "quiz" | "memory" | "sound" | "color";

const Index = () => {
  const [mode, setMode] = useState<GameMode>("menu");

  const handleSelectMode = (selectedMode: "learn" | "drag" | "quiz" | "memory" | "sound" | "color") => {
    setMode(selectedMode);
  };

  const handleBackToMenu = () => {
    setMode("menu");
  };

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

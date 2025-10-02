import { useState } from "react";
import { ArrowLeft, Palette, Eraser, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { bodyParts } from "@/data/bodyParts";

interface ColorModeProps {
  onBack: () => void;
}

const colors = [
  { name: "Red", value: "#ef4444", class: "bg-red-500" },
  { name: "Orange", value: "#f97316", class: "bg-orange-500" },
  { name: "Yellow", value: "#eab308", class: "bg-yellow-500" },
  { name: "Green", value: "#22c55e", class: "bg-green-500" },
  { name: "Blue", value: "#3b82f6", class: "bg-blue-500" },
  { name: "Purple", value: "#a855f7", class: "bg-purple-500" },
  { name: "Pink", value: "#ec4899", class: "bg-pink-500" },
  { name: "Brown", value: "#a16207", class: "bg-yellow-700" },
];

export const ColorMode = ({ onBack }: ColorModeProps) => {
  const [selectedColor, setSelectedColor] = useState(colors[0].value);
  const [coloredParts, setColoredParts] = useState<{ [key: string]: string }>({});
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const handlePartClick = (partId: string) => {
    setSelectedPart(partId);
    setColoredParts({ ...coloredParts, [partId]: selectedColor });
    toast.success("Colored!", {
      description: `You colored the ${bodyParts.find(p => p.id === partId)?.name}!`,
    });
  };

  const handleClear = () => {
    setColoredParts({});
    setSelectedPart(null);
    toast.info("Canvas cleared!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button onClick={onBack} variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-success bg-clip-text text-transparent">
            Color & Learn
          </h1>
        </div>

        <div className="grid md:grid-cols-[300px,1fr] gap-6">
          {/* Color Palette & Info */}
          <div className="space-y-6">
            <Card className="bg-card rounded-3xl shadow-playful p-6 border-4 border-success/20">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-6 h-6 text-success" />
                <h2 className="text-2xl font-bold text-foreground">Pick a Color</h2>
              </div>
              
              <div className="grid grid-cols-4 gap-3 mb-4">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`aspect-square rounded-xl ${color.class} transition-all hover:scale-110 ${
                      selectedColor === color.value
                        ? "ring-4 ring-foreground scale-110"
                        : "ring-2 ring-border"
                    }`}
                    title={color.name}
                  />
                ))}
              </div>

              <Button
                onClick={handleClear}
                variant="outline"
                className="w-full gap-2"
                size="lg"
              >
                <RotateCcw className="w-5 h-5" />
                Clear All
              </Button>
            </Card>

            {selectedPart && (
              <Card className="bg-gradient-success rounded-3xl p-6 border-0 shadow-playful animate-bounce-in">
                <h3 className="text-2xl font-bold text-success-foreground mb-3">
                  {bodyParts.find(p => p.id === selectedPart)?.name}
                </h3>
                <div className="bg-success-foreground/20 rounded-xl p-3 mb-3">
                  <p className="text-sm text-success-foreground">
                    {bodyParts.find(p => p.id === selectedPart)?.description}
                  </p>
                </div>
                <div className="bg-accent/20 rounded-xl p-3">
                  <p className="text-xs font-bold text-accent-foreground mb-1">Fun Fact:</p>
                  <p className="text-sm text-success-foreground">
                    {bodyParts.find(p => p.id === selectedPart)?.funFact}
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* Body Diagram */}
          <Card className="bg-card rounded-3xl shadow-playful p-8 border-4 border-success/20">
            <p className="text-center text-2xl text-muted-foreground mb-6">
              🎨 Click body parts to color them!
            </p>

            <div className="relative mx-auto max-w-md">
              <svg
                viewBox="0 0 200 300"
                className="w-full h-auto"
              >
                {/* Head */}
                <circle
                  cx="100"
                  cy="30"
                  r="25"
                  fill={coloredParts["head"] || "#e5e7eb"}
                  stroke="#1f2937"
                  strokeWidth="2"
                  onClick={() => handlePartClick("head")}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                
                {/* Body/Chest */}
                <rect
                  x="75"
                  y="55"
                  width="50"
                  height="70"
                  rx="10"
                  fill={coloredParts["chest"] || "#e5e7eb"}
                  stroke="#1f2937"
                  strokeWidth="2"
                  onClick={() => handlePartClick("chest")}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                
                {/* Belly */}
                <rect
                  x="80"
                  y="125"
                  width="40"
                  height="40"
                  rx="8"
                  fill={coloredParts["belly"] || "#e5e7eb"}
                  stroke="#1f2937"
                  strokeWidth="2"
                  onClick={() => handlePartClick("belly")}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                
                {/* Left Arm */}
                <rect
                  x="50"
                  y="60"
                  width="20"
                  height="60"
                  rx="10"
                  fill={coloredParts["arms"] || "#e5e7eb"}
                  stroke="#1f2937"
                  strokeWidth="2"
                  onClick={() => handlePartClick("arms")}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                
                {/* Right Arm */}
                <rect
                  x="130"
                  y="60"
                  width="20"
                  height="60"
                  rx="10"
                  fill={coloredParts["arms"] || "#e5e7eb"}
                  stroke="#1f2937"
                  strokeWidth="2"
                  onClick={() => handlePartClick("arms")}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                
                {/* Left Hand */}
                <circle
                  cx="60"
                  cy="130"
                  r="12"
                  fill={coloredParts["hands"] || "#e5e7eb"}
                  stroke="#1f2937"
                  strokeWidth="2"
                  onClick={() => handlePartClick("hands")}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                
                {/* Right Hand */}
                <circle
                  cx="140"
                  cy="130"
                  r="12"
                  fill={coloredParts["hands"] || "#e5e7eb"}
                  stroke="#1f2937"
                  strokeWidth="2"
                  onClick={() => handlePartClick("hands")}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                
                {/* Left Leg */}
                <rect
                  x="80"
                  y="165"
                  width="20"
                  height="80"
                  rx="10"
                  fill={coloredParts["legs"] || "#e5e7eb"}
                  stroke="#1f2937"
                  strokeWidth="2"
                  onClick={() => handlePartClick("legs")}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                
                {/* Right Leg */}
                <rect
                  x="100"
                  y="165"
                  width="20"
                  height="80"
                  rx="10"
                  fill={coloredParts["legs"] || "#e5e7eb"}
                  stroke="#1f2937"
                  strokeWidth="2"
                  onClick={() => handlePartClick("legs")}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                
                {/* Left Foot */}
                <ellipse
                  cx="90"
                  cy="255"
                  rx="15"
                  ry="10"
                  fill={coloredParts["feet"] || "#e5e7eb"}
                  stroke="#1f2937"
                  strokeWidth="2"
                  onClick={() => handlePartClick("feet")}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                
                {/* Right Foot */}
                <ellipse
                  cx="110"
                  cy="255"
                  rx="15"
                  ry="10"
                  fill={coloredParts["feet"] || "#e5e7eb"}
                  stroke="#1f2937"
                  strokeWidth="2"
                  onClick={() => handlePartClick("feet")}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
              </svg>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};


import React from "react";
import { Strategy } from "@/utils/predictionAlgorithms";

interface StrategySelectorProps {
  selectedStrategy: Strategy;
  onSelectStrategy: (strategy: Strategy) => void;
  disabled: boolean;
}

const StrategySelector: React.FC<StrategySelectorProps> = ({
  selectedStrategy,
  onSelectStrategy,
  disabled
}) => {
  const strategies: { id: Strategy; name: string; description: string }[] = [
    {
      id: "value",
      name: "Value Investing",
      description: "Find undervalued stocks based on fundamental analysis"
    },
    {
      id: "growth",
      name: "Growth Investing",
      description: "Focus on stocks with potential for above-average growth"
    },
    {
      id: "dividend",
      name: "Dividend Investing",
      description: "Identify stocks with sustainable dividend payments"
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-6">
      <h2 className="text-lg font-medium mb-3 text-center">Select Investment Strategy</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {strategies.map((strategy) => (
          <button
            key={strategy.id}
            onClick={() => onSelectStrategy(strategy.id)}
            disabled={disabled}
            className={`relative group p-6 rounded-xl transition-all duration-300 border-2 ${
              selectedStrategy === strategy.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30 hover:bg-secondary/50"
            } flex flex-col items-start h-full`}
          >
            <div className={`w-full h-full flex flex-col ${disabled ? "opacity-50" : ""}`}>
              <h3 className="font-medium text-base mb-2">{strategy.name}</h3>
              <p className="text-sm text-muted-foreground">{strategy.description}</p>
            </div>
            {selectedStrategy === strategy.id && (
              <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary animate-pulse-slow" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StrategySelector;

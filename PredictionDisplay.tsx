
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Prediction, Strategy } from "@/utils/predictionAlgorithms";
import { Check, Clock, AlertCircle } from "lucide-react";

interface PredictionDisplayProps {
  prediction: Prediction;
  strategy: Strategy;
}

const getStrategyName = (strategy: Strategy): string => {
  switch (strategy) {
    case "value":
      return "Value Investing";
    case "growth":
      return "Growth Investing";
    case "dividend":
      return "Dividend Investing";
    default:
      return "Investment Strategy";
  }
};

const PredictionDisplay: React.FC<PredictionDisplayProps> = ({ prediction, strategy }) => {
  if (prediction.loading) {
    return (
      <Card className="w-full animate-pulse-slow animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex justify-between">
            <span>Analyzing {getStrategyName(strategy)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-6 w-3/4 bg-secondary rounded-md shimmer-effect" />
            <div className="h-4 w-1/2 bg-secondary rounded-md shimmer-effect" />
            <div className="h-4 w-2/3 bg-secondary rounded-md shimmer-effect" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden animate-slide-in-up transition-all duration-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex justify-between">
          <span>{getStrategyName(strategy)}</span>
          <span className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-normal">
            {prediction.recommendation}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Confidence</span>
            <span className="text-sm">{prediction.confidence}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                prediction.confidence >= 70 
                  ? "bg-green-600" 
                  : prediction.confidence >= 50 
                  ? "bg-yellow-500" 
                  : "bg-red-500"
              }`}
              style={{ width: `${prediction.confidence}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            {prediction.recommendation === "Buy" ? (
              <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
            ) : (
              <Clock className="h-5 w-5 text-yellow-500 flex-shrink-0" />
            )}
            <span>
              <strong>{prediction.recommendation === "Buy" ? "Recommended" : "Wait for better conditions"}</strong>
            </span>
          </div>
          
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-2">Analysis Factors:</h4>
            <ul className="space-y-2">
              {prediction.details.map((detail, index) => (
                <li key={index} className="text-sm flex items-start space-x-2">
                  <span className="block w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t text-xs text-muted-foreground flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          <span>This is a simplified model for demonstration purposes only.</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionDisplay;

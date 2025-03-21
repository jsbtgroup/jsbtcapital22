
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import StockSearch from "@/components/StockSearch";
import StrategySelector from "@/components/StrategySelector";
import PredictionDisplay from "@/components/PredictionDisplay";
import StockCard from "@/components/StockCard";
import { Strategy, StockData, Prediction, getPrediction } from "@/utils/predictionAlgorithms";

const Index = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [strategy, setStrategy] = useState<Strategy>("value");
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleStrategySelect = (newStrategy: Strategy) => {
    setStrategy(newStrategy);
    
    if (stockData) {
      setPrediction({
        confidence: 0,
        recommendation: "Hold",
        details: [],
        loading: true
      });
      
      // Simulate AI processing time
      setTimeout(() => {
        setPrediction(getPrediction(stockData, newStrategy));
      }, 1500);
    }
  };
  
  const handleStockData = (data: StockData | null) => {
    setStockData(data);
    
    if (data) {
      setPrediction({
        confidence: 0,
        recommendation: "Hold",
        details: [],
        loading: true
      });
      
      // Simulate AI processing time
      setTimeout(() => {
        setPrediction(getPrediction(data, strategy));
      }, 1500);
    } else {
      setPrediction(null);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container px-4 py-8 mx-auto max-w-5xl">
        <Header />
        
        <div className="my-6">
          <StockSearch 
            onStockData={handleStockData} 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
        
        {stockData && (
          <div className="space-y-8 animate-fade-in">
            <StockCard stockData={stockData} />
            
            <Separator className="my-8" />
            
            <StrategySelector 
              selectedStrategy={strategy}
              onSelectStrategy={handleStrategySelect}
              disabled={isLoading} 
            />
            
            {prediction && (
              <div className="my-8">
                <PredictionDisplay prediction={prediction} strategy={strategy} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;


import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import type { StockData } from "@/utils/predictionAlgorithms";

interface StockCardProps {
  stockData: StockData;
}

const formatLargeNumber = (num: number): string => {
  if (num >= 1000000000) {
    return `$${(num / 1000000000).toFixed(2)}B`;
  }
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  }
  return `$${num.toLocaleString()}`;
};

const StockCard: React.FC<StockCardProps> = ({ stockData }) => {
  const isPositiveChange = stockData.change >= 0;
  
  return (
    <Card className="w-full overflow-hidden animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold tracking-tight">{stockData.ticker}</h2>
              <span className="text-sm text-muted-foreground">{stockData.primaryExchange}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{stockData.name}</p>
            
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">${stockData.price.toFixed(2)}</span>
              <div className={`flex items-center space-x-1 ${isPositiveChange ? 'text-green-600' : 'text-red-500'}`}>
                {isPositiveChange ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                <span className="text-sm font-medium">{Math.abs(stockData.change).toFixed(2)}%</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground">Open</span>
              <span className="font-medium">${stockData.open.toFixed(2)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Volume</span>
              <span className="font-medium">{stockData.volume.toLocaleString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">High</span>
              <span className="font-medium">${stockData.high.toFixed(2)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Low</span>
              <span className="font-medium">${stockData.low.toFixed(2)}</span>
            </div>
            {stockData.marketCap && (
              <div className="flex flex-col col-span-2 md:col-span-1">
                <span className="text-muted-foreground">Market Cap</span>
                <span className="font-medium">{formatLargeNumber(stockData.marketCap)}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockCard;

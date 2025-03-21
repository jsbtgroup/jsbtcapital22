
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { getStockData } from "@/utils/api";
import { toast } from "sonner";
import type { StockData } from "@/utils/predictionAlgorithms";

interface StockSearchProps {
  onStockData: (data: StockData | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const StockSearch: React.FC<StockSearchProps> = ({ 
  onStockData, 
  isLoading, 
  setIsLoading 
}) => {
  const [ticker, setTicker] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ticker) {
      toast.error("Please enter a stock ticker");
      return;
    }
    
    setIsLoading(true);
    const stockData = await getStockData(ticker);
    setIsLoading(false);
    
    if (stockData) {
      onStockData(stockData);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Enter stock ticker (e.g. AAPL)"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="pr-20 h-12 text-base rounded-xl transition-all duration-300 border-2 hover:border-primary/50 focus-visible:ring-0 focus-visible:border-primary"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-lg h-10 px-4 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StockSearch;

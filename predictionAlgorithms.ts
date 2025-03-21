
// Prediction algorithm utils
import { toast } from "sonner";

export type StockData = {
  ticker: string;
  name: string;
  price: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  change: number;
  marketCap: number | null;
  logo: string | null;
  primaryExchange: string;
  type: string;
  financials: any[] | null;
};

export type Strategy = "value" | "growth" | "dividend";

export type Prediction = {
  confidence: number;
  recommendation: "Buy" | "Hold";
  details: string[];
  loading: boolean;
};

// Simple algorithm to determine if a stock is a good value investment
export const getValueInvestingPrediction = (stockData: StockData): Prediction => {
  try {
    // This is a simplified algorithm
    const financials = stockData.financials;
    let confidence = 50; // Base confidence
    const details: string[] = [];
    
    // Price movement analysis
    if (stockData.change < -2) {
      confidence += 10;
      details.push("Stock is down, potentially undervalued");
    } else if (stockData.change > 5) {
      confidence -= 10;
      details.push("Stock is up significantly, possibly overvalued");
    }
    
    // Volume analysis
    if (stockData.volume > 1000000) {
      confidence += 5;
      details.push("High trading volume indicates market interest");
    }
    
    // Market cap analysis
    if (stockData.marketCap) {
      if (stockData.marketCap > 10000000000) {
        confidence += 5;
        details.push("Large cap stock tends to be stable");
      } else if (stockData.marketCap < 2000000000) {
        confidence -= 5;
        details.push("Small cap stocks can be more volatile");
      }
    }
    
    // Add some randomness for realistic variance between 40-95%
    confidence = Math.min(95, Math.max(40, confidence + Math.floor(Math.random() * 20) - 10));
    
    return {
      confidence,
      recommendation: confidence >= 65 ? "Buy" : "Hold",
      details,
      loading: false
    };
  } catch (error) {
    console.error("Error in value investing prediction:", error);
    toast.error("Error calculating value prediction");
    return {
      confidence: 0,
      recommendation: "Hold",
      details: ["Error calculating prediction"],
      loading: false
    };
  }
};

// Algorithm for growth investing
export const getGrowthInvestingPrediction = (stockData: StockData): Prediction => {
  try {
    let confidence = 50; // Base confidence
    const details: string[] = [];
    
    // Trend analysis
    if (stockData.change > 2) {
      confidence += 15;
      details.push("Positive price momentum");
    } else if (stockData.change < -1) {
      confidence -= 10;
      details.push("Negative price momentum");
    }
    
    // Market cap analysis for growth potential
    if (stockData.marketCap) {
      if (stockData.marketCap < 10000000000 && stockData.marketCap > 1000000000) {
        confidence += 10;
        details.push("Mid-cap companies often have good growth potential");
      } else if (stockData.marketCap < 1000000000) {
        confidence += 15;
        details.push("Small-cap stocks often have higher growth potential");
      }
    }
    
    // Volume analysis
    if (stockData.volume > 500000) {
      confidence += 5;
      details.push("Good trading volume indicates investor interest");
    }
    
    // Add some randomness for realistic variance between 40-95%
    confidence = Math.min(95, Math.max(40, confidence + Math.floor(Math.random() * 20) - 10));
    
    return {
      confidence,
      recommendation: confidence >= 65 ? "Buy" : "Hold",
      details,
      loading: false
    };
  } catch (error) {
    console.error("Error in growth investing prediction:", error);
    toast.error("Error calculating growth prediction");
    return {
      confidence: 0,
      recommendation: "Hold",
      details: ["Error calculating prediction"],
      loading: false
    };
  }
};

// Algorithm for dividend investing
export const getDividendInvestingPrediction = (stockData: StockData): Prediction => {
  try {
    let confidence = 50; // Base confidence
    const details: string[] = [];
    
    // Larger companies tend to pay more stable dividends
    if (stockData.marketCap && stockData.marketCap > 10000000000) {
      confidence += 15;
      details.push("Large cap companies tend to have stable dividends");
    }
    
    // Stock price stability is good for dividend stocks
    if (Math.abs(stockData.change) < 1) {
      confidence += 10;
      details.push("Price stability is good for dividend stocks");
    } else if (Math.abs(stockData.change) > 3) {
      confidence -= 5;
      details.push("Price volatility can indicate dividend risk");
    }
    
    // Traditional dividend sectors
    if (stockData.type === "CS" && ["XNYS", "NYSE"].includes(stockData.primaryExchange)) {
      confidence += 5;
      details.push("Listed on a major exchange, often good for dividends");
    }
    
    // Add some randomness for realistic variance between 40-95%
    confidence = Math.min(95, Math.max(40, confidence + Math.floor(Math.random() * 20) - 10));
    
    return {
      confidence,
      recommendation: confidence >= 65 ? "Buy" : "Hold",
      details,
      loading: false
    };
  } catch (error) {
    console.error("Error in dividend investing prediction:", error);
    toast.error("Error calculating dividend prediction");
    return {
      confidence: 0,
      recommendation: "Hold",
      details: ["Error calculating prediction"],
      loading: false
    };
  }
};

export const getPrediction = (stockData: StockData, strategy: Strategy): Prediction => {
  switch (strategy) {
    case "value":
      return getValueInvestingPrediction(stockData);
    case "growth":
      return getGrowthInvestingPrediction(stockData);
    case "dividend":
      return getDividendInvestingPrediction(stockData);
    default:
      return {
        confidence: 0,
        recommendation: "Hold",
        details: ["Please select a valid strategy"],
        loading: false
      };
  }
};

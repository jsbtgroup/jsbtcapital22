
import { toast } from "sonner";

const API_KEY = "TCY0P7kHWQVzeTuHHvXWIBE4Mw0zmhip";
const BASE_URL = "https://api.polygon.io";

// Get previous day's stock data
export const getStockData = async (ticker: string) => {
  try {
    const formattedTicker = ticker.toUpperCase().trim();
    
    // Get previous day's data
    const response = await fetch(
      `${BASE_URL}/v2/aggs/ticker/${formattedTicker}/prev?apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch stock data");
    }
    
    const data = await response.json();
    
    if (data.resultsCount === 0) {
      throw new Error("No data found for this ticker");
    }
    
    // Get ticker details
    const detailsResponse = await fetch(
      `${BASE_URL}/v3/reference/tickers/${formattedTicker}?apiKey=${API_KEY}`
    );
    
    if (!detailsResponse.ok) {
      throw new Error("Failed to fetch ticker details");
    }
    
    const detailsData = await detailsResponse.json();
    
    if (!detailsData.results) {
      throw new Error("No ticker details found");
    }
    
    // Get additional financial data
    const financialsResponse = await fetch(
      `${BASE_URL}/vX/reference/financials/${formattedTicker}?limit=4&sort=period_of_report_date&apiKey=${API_KEY}`
    );
    
    let financials = null;
    if (financialsResponse.ok) {
      const financialsData = await financialsResponse.json();
      financials = financialsData.results || null;
    }
    
    return {
      ticker: formattedTicker,
      name: detailsData.results.name,
      price: data.results[0].c,
      open: data.results[0].o,
      high: data.results[0].h,
      low: data.results[0].l,
      volume: data.results[0].v,
      change: ((data.results[0].c - data.results[0].o) / data.results[0].o) * 100,
      marketCap: detailsData.results.market_cap || null,
      logo: detailsData.results.branding?.logo_url || null,
      primaryExchange: detailsData.results.primary_exchange,
      type: detailsData.results.type,
      financials: financials,
    };
  } catch (error) {
    console.error("Error fetching stock data:", error);
    toast.error(error instanceof Error ? error.message : "Failed to fetch stock data");
    return null;
  }
};

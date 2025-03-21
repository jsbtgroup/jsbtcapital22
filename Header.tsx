
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 flex flex-col items-center justify-center animate-fade-in">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">JSBT Investing</h1>
        </div>
        <p className="text-sm text-muted-foreground text-balance text-center max-w-md">
          AI-Powered Stock Investment Strategies
        </p>
      </div>
    </header>
  );
};

export default Header;

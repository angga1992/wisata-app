'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"

interface IncrementDecrementProps {
  initialValue?: number;
  onCountChange?: (newCount: number) => void;
}

const IncrementDecrement: React.FC<IncrementDecrementProps> = ({ initialValue = 0, onCountChange }) => {
  const [count, setCount] = useState<number>(initialValue);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    if (onCountChange) {
      onCountChange(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
      if (onCountChange) {
        onCountChange(count - 1);
      }
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <Button
        className="p-1 bg-gray-300 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
        onClick={handleDecrement}
      >
        -
      </Button>
      <span className="text-md font-bold">{count}</span>
      <Button
        className="p-1 bg-gray-300 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        onClick={handleIncrement}
      >
        +
      </Button>
    </div>
  );
};

export default IncrementDecrement;

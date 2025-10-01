'use client';
import { useState, useEffect } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Generate a pseudo-random number for display purposes.
    // This will only run on the client side after hydration.
    setCount(Math.floor(Math.random() * (250000 - 150000 + 1)) + 150000);
  }, []);

  const formatCount = (num: number | null) => {
    if (num === null) {
      return 'Loading...';
    }
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return <div className="text-sm text-gray-400">Visitors: {formatCount(count)}</div>;
}

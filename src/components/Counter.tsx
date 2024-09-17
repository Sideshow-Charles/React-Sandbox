import React from "react";
import { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = (): void => setCount(count + 1);
  const decrement = (): void => setCount(count - 1);
    return (
        <div className="counter">
          <h1>{count}</h1>
          <button onClick={increment}>click to increase</button>
          <button onClick={decrement}>click to decrease</button>
        </div>
    );
}

export default Counter;
import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // This line is new!

  function transition(newMode, replace = false) {
    if (replace) {
      history[history.length - 1] = newMode;
      return setMode(newMode);
    }

    setHistory((prev) => [...prev, newMode]);
    return setMode(newMode);
  }

  function back() {
    console.log("inside back function");
    const lastElement = history.slice(0, -1);
    setHistory(lastElement);
    if (history.length >= 1) setMode(lastElement[lastElement.length - 1]);
  }

  return { mode, transition, back, history };
}

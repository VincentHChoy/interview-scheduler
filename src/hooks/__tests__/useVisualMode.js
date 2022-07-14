import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // This line is new!

  function transition(newMode,replace = false) {
    if(replace) {
      history[history.length - 1] = newMode
      return setMode(newMode);
    }

    setHistory(prev => [...prev,newMode])
    return setMode(newMode);
  }

  function back() {
    if(history.length > 1) history.pop();

    return setMode(history.slice(-1)[0])
  }

  return { mode, transition, back, history };
}

import { useState, useCallback, useRef } from "react";

export type PronunciationState =
  | "idle"
  | "speaking"
  | "listening"
  | "match"
  | "close"
  | "miss"
  | "unsupported";

export function usePronunciation(targetWord: string) {
  const [state, setState] = useState<PronunciationState>("idle");
  const [heard, setHeard] = useState<string>("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const speak = useCallback(() => {
    if (!("speechSynthesis" in window)) {
      setState("unsupported");
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(targetWord.toLowerCase());
    utter.lang = "fil-PH";
    utter.rate = 0.85;
    utter.pitch = 1;
    setState("speaking");
    utter.onend = () => setState("idle");
    utter.onerror = () => setState("idle");
    window.speechSynthesis.speak(utter);
  }, [targetWord]);

  const listen = useCallback(() => {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: typeof window.SpeechRecognition; webkitSpeechRecognition?: typeof window.SpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setState("unsupported");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "fil-PH";
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;

    setState("listening");

    recognition.onresult = (event) => {
      const alternatives: string[] = [];
      for (let i = 0; i < event.results[0].length; i++) {
        alternatives.push(event.results[0][i].transcript.trim().toLowerCase());
      }

      const target = targetWord.toLowerCase();
      const best = alternatives.find((a) => a === target) || alternatives[0] || "";
      setHeard(best);

      if (alternatives.some((a) => a === target)) {
        setState("match");
      } else if (alternatives.some((a) => similarity(a, target) >= 0.6)) {
        setState("close");
      } else {
        setState("miss");
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed") {
        setState("unsupported");
      } else {
        setState("idle");
      }
    };

    recognition.onend = () => {
      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
      }
    };

    recognition.start();
  }, [targetWord]);

  const reset = useCallback(() => {
    window.speechSynthesis?.cancel();
    recognitionRef.current?.abort();
    setState("idle");
    setHeard("");
  }, []);

  return { state, heard, speak, listen, reset };
}

function similarity(a: string, b: string): number {
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  if (longer.length === 0) return 1;
  return (longer.length - editDistance(longer, shorter)) / longer.length;
}

function editDistance(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

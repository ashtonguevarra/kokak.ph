import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation } from "wouter";
import { useGetRandomPuzzle, useGetPuzzleById } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, ArrowRight, Volume2, Mic, MicOff, CheckCircle2, AlertCircle, XCircle, Lightbulb } from "lucide-react";
import { usePronunciation } from "@/hooks/use-pronunciation";

type GameStatus = "playing" | "won" | "lost";

export default function Play() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const langCode = searchParams.get("lang");
  
  // Game State
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [hintedPositions, setHintedPositions] = useState<Record<number, string>>({});
  const MAX_HINTS = 3;

  useEffect(() => {
    if (!langCode) {
      setLocation("/");
    }
  }, [langCode, setLocation]);

  const { 
    data: puzzle, 
    isLoading: isLoadingPuzzle, 
    refetch: refetchPuzzle,
    isFetching: isFetchingPuzzle
  } = useGetRandomPuzzle(
    { languageCode: langCode || "" },
    { query: { enabled: !!langCode } }
  );

  const { data: puzzleDetail, isLoading: isLoadingDetail } = useGetPuzzleById(
    puzzle?.id || 0,
    { query: { enabled: gameStatus !== "playing" && !!puzzle?.id } }
  );

  const targetWord = puzzle?.targetWord.toUpperCase() || "";
  const maxAttempts = 6;
  const wordLength = puzzle?.wordLength || 5;

  const onKeyPress = useCallback((key: string) => {
    if (gameStatus !== "playing") return;

    if (key === "Enter") {
      // Merge typed letters with hinted positions to form full guess
      const merged = Array.from({ length: wordLength }, (_, i) => {
        if (i in hintedPositions) return hintedPositions[i];
        const typedIndex = Array.from({ length: wordLength }, (_, j) => j)
          .filter((j) => !(j in hintedPositions))
          .indexOf(i);
        return typedIndex >= 0 ? currentGuess[typedIndex] || "" : "";
      });
      if (merged.some((l) => !l)) return;
      const fullGuess = merged.join("");
      const newGuesses = [...guesses, fullGuess];
      setGuesses(newGuesses);
      setCurrentGuess("");

      if (fullGuess === targetWord) {
        setGameStatus("won");
      } else if (newGuesses.length >= maxAttempts) {
        setGameStatus("lost");
      }
    } else if (key === "Backspace") {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key)) {
      // Only fill non-hinted slots
      const freeSlots = wordLength - Object.keys(hintedPositions).length;
      if (currentGuess.length < freeSlots) {
        setCurrentGuess(prev => prev + key);
      }
    }
  }, [currentGuess, gameStatus, guesses, hintedPositions, targetWord, wordLength]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let key = e.key;
      if (key === "Enter" || key === "Backspace") {
        onKeyPress(key);
      } else {
        key = key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
          onKeyPress(key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyPress]);

  const getLetterStatus = (letter: string, i: number, guess: string) => {
    if (!targetWord) return "unused";
    if (targetWord[i] === letter) return "correct";
    if (targetWord.includes(letter)) {
      return "present";
    }
    return "absent";
  };

  const pronunciation = usePronunciation(puzzleDetail?.targetWord || "");

  const hintsUsed = Object.keys(hintedPositions).length;
  const canHint = gameStatus === "playing" && hintsUsed < MAX_HINTS && !!targetWord;

  const handleHint = useCallback(() => {
    if (!targetWord || !canHint) return;
    const alreadyHinted = new Set(Object.keys(hintedPositions).map(Number));
    const available = Array.from({ length: wordLength }, (_, i) => i).filter(
      (i) => !alreadyHinted.has(i)
    );
    if (!available.length) return;
    const pos = available[Math.floor(Math.random() * available.length)];
    const letter = targetWord[pos];
    setHintedPositions((prev) => ({ ...prev, [pos]: letter }));
  }, [targetWord, canHint, hintedPositions, wordLength]);

  const handleNext = () => {
    pronunciation.reset();
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
    setHintedPositions({});
    refetchPuzzle();
  };

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"]
  ];

  const letterStatuses = useMemo(() => {
    const statuses: Record<string, string> = {};
    guesses.forEach(guess => {
      guess.split("").forEach((letter, i) => {
        const status = getLetterStatus(letter, i, guess);
        if (statuses[letter] !== "correct") {
          statuses[letter] = status;
        }
      });
    });
    return statuses;
  }, [guesses, targetWord]);

  if (!langCode) return null;

  if (isLoadingPuzzle || isFetchingPuzzle && guesses.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Preparing your puzzle...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">
          {puzzle?.languageName}
        </h2>
        <h1 className="text-3xl font-serif mb-2">Translate: {puzzle?.filipinoWord}</h1>
        <p className="text-sm text-muted-foreground">
          {wordLength} letters &bull; {maxAttempts - guesses.length} attempts left
        </p>
        {gameStatus === "playing" && (
          <div className="mt-3 flex items-center justify-center gap-4">
            <button
              onClick={handleHint}
              disabled={!canHint}
              className="flex items-center gap-1.5 text-xs font-medium text-amber-700 border border-amber-300 bg-amber-50 px-3 py-1.5 rounded-full hover:bg-amber-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Lightbulb className="h-3 w-3" />
              Hint {hintsUsed > 0 ? `(${MAX_HINTS - hintsUsed} left)` : ""}
            </button>
            <button
              onClick={() => setGameStatus("lost")}
              className="text-xs text-muted-foreground/60 underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              Give up
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between max-h-[800px]">
        {/* Grid */}
        <div className="grid gap-2 mb-8 mx-auto" style={{ gridTemplateRows: `repeat(${maxAttempts}, minmax(0, 1fr))` }}>
          {Array.from({ length: maxAttempts }).map((_, rowIndex) => {
            const isCurrentRow = rowIndex === guesses.length;
            const submittedGuess = rowIndex < guesses.length ? guesses[rowIndex] : "";
            
            return (
              <div key={rowIndex} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${wordLength}, minmax(0, 1fr))` }}>
                {Array.from({ length: wordLength }).map((_, colIndex) => {
                  const isHinted = isCurrentRow && colIndex in hintedPositions;
                  const letter = submittedGuess
                    ? submittedGuess[colIndex] || ""
                    : isCurrentRow
                    ? hintedPositions[colIndex] ?? currentGuess[colIndex] ?? ""
                    : "";

                  let status = "empty";
                  if (submittedGuess) {
                    status = getLetterStatus(letter, colIndex, submittedGuess);
                  } else if (isHinted) {
                    status = "hint";
                  } else if (letter) {
                    status = "tbd";
                  }

                  const bgColors: Record<string, string> = {
                    empty: "bg-transparent border-border",
                    tbd: "bg-transparent border-foreground/30 text-foreground",
                    hint: "bg-amber-50 border-amber-400 text-amber-800",
                    correct: "bg-secondary border-secondary text-primary-foreground",
                    present: "bg-accent border-accent text-accent-foreground",
                    absent: "bg-muted border-muted text-muted-foreground"
                  };

                  return (
                    <div
                      key={colIndex}
                      className={`w-12 h-12 md:w-14 md:h-14 border-2 flex items-center justify-center text-2xl font-bold font-mono transition-all duration-300 ${bgColors[status]} ${status === "hint" ? "animate-in fade-in zoom-in-95" : ""} ${status !== 'empty' && status !== 'tbd' && status !== 'hint' ? 'animate-in fade-in zoom-in-95' : ''}`}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Post Game Reveal */}
        {gameStatus !== "playing" && (
          <div className="mb-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <Card className="border-primary/20 bg-primary/5 shadow-md">
              <CardContent className="pt-6">
                {isLoadingDetail ? (
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-1/3 bg-primary/10" />
                    <Skeleton className="h-4 w-full bg-primary/10" />
                    <Skeleton className="h-4 w-5/6 bg-primary/10" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center border-b border-primary/10 pb-4">
                      <h3 className="text-2xl font-serif text-foreground font-bold mb-1">
                        {puzzleDetail?.targetWord}
                      </h3>
                      <p className="text-sm text-muted-foreground italic font-serif mb-3">
                        [{puzzleDetail?.pronunciation}]
                      </p>

                      {/* Pronunciation Practice */}
                      {pronunciation.state !== "unsupported" && (
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          <button
                            onClick={pronunciation.speak}
                            disabled={pronunciation.state === "speaking" || pronunciation.state === "listening"}
                            title="Hear pronunciation"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {pronunciation.state === "speaking" ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Volume2 className="h-3.5 w-3.5" />
                            )}
                            Listen
                          </button>

                          <button
                            onClick={pronunciation.state === "listening" ? pronunciation.reset : pronunciation.listen}
                            disabled={pronunciation.state === "speaking"}
                            title={pronunciation.state === "listening" ? "Stop recording" : "Try saying it"}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                              pronunciation.state === "listening"
                                ? "border-red-400 bg-red-50 text-red-600 animate-pulse"
                                : "border-border bg-card text-foreground hover:bg-muted"
                            }`}
                          >
                            {pronunciation.state === "listening" ? (
                              <MicOff className="h-3.5 w-3.5" />
                            ) : (
                              <Mic className="h-3.5 w-3.5" />
                            )}
                            {pronunciation.state === "listening" ? "Listening..." : "Try it"}
                          </button>
                        </div>
                      )}

                      {/* Result feedback */}
                      {pronunciation.state === "match" && (
                        <div className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-green-700 animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <CheckCircle2 className="h-4 w-4" />
                          Perfect! You said it correctly.
                        </div>
                      )}
                      {pronunciation.state === "close" && (
                        <div className="mt-3 space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <div className="flex items-center justify-center gap-1.5 text-sm font-medium text-amber-700">
                            <AlertCircle className="h-4 w-4" />
                            Close! I heard: <span className="font-mono italic">{pronunciation.heard}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Keep practicing.</p>
                        </div>
                      )}
                      {pronunciation.state === "miss" && (
                        <div className="mt-3 space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <div className="flex items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground">
                            <XCircle className="h-4 w-4" />
                            I heard: <span className="font-mono italic">{pronunciation.heard || "..."}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Try listening first, then repeat.</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-xs uppercase tracking-wider font-bold mb-1 text-primary">Meaning</p>
                      <p className="text-foreground">{puzzleDetail?.meaning}</p>
                    </div>

                    {puzzleDetail?.exampleSentence && (
                      <div className="pt-2">
                        <p className="text-xs uppercase tracking-wider font-bold mb-1 text-primary">Example</p>
                        <p className="text-foreground italic font-serif text-lg">{puzzleDetail.exampleSentence}</p>
                      </div>
                    )}

                    {puzzleDetail?.usageNotes && (
                      <div className="pt-2 text-sm text-muted-foreground bg-background p-3 rounded-md border border-border/50">
                        {puzzleDetail.usageNotes}
                      </div>
                    )}

                    <div className="pt-4 flex justify-center">
                      <Button onClick={handleNext} disabled={isFetchingPuzzle} size="lg" className="w-full sm:w-auto font-bold shadow-md">
                        {isFetchingPuzzle ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Next Word"}
                        {!isFetchingPuzzle && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

                {/* Keyboard */}
        {gameStatus === "playing" && (
          <div className="w-full space-y-2 mt-auto pb-4">
            {keyboardRows.map((row, i) => (
              <div key={i} className="flex justify-center gap-1 md:gap-1.5">
                {row.map((key) => {
                  const isSpecial = key.length > 1;
                  const status = letterStatuses[key];

                  const bgColors: Record<string, string> = {
                    correct:
                      "bg-secondary text-primary-foreground hover:bg-secondary/90 border-secondary",
                    present:
                      "bg-accent text-accent-foreground hover:bg-accent/90 border-accent",
                    absent:
                      "bg-muted text-muted-foreground hover:bg-muted/90 border-muted",
                    unused:
                      "bg-card text-card-foreground border border-border hover:bg-muted",
                  };

                  const bgColor = status ? bgColors[status] : bgColors.unused;

                  return (
                    <button
                      key={key}
                      onClick={() => onKeyPress(key)}
                      className={`
                        ${
                          isSpecial
                            ? "px-3 md:px-4 text-xs font-bold"
                            : "w-8 md:w-10 text-sm font-bold font-mono"
                        }
                        h-12 md:h-14 rounded-md flex items-center justify-center
                        transition-colors shadow-sm ${bgColor}
                      `}
                    >
                      {key === "Backspace" ? "DEL" : key}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
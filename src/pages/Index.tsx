import { useState, useCallback, useEffect } from "react";
import HangmanDrawing from "@/components/HangmanDrawing";
import Keyboard from "@/components/Keyboard";
import { getRandomWord } from "@/data/words";

const MAX_WRONG = 6;

const Index = () => {
  const [word, setWord] = useState(getRandomWord);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());

  const correctLetters = new Set([...guessedLetters].filter((l) => word.includes(l)));
  const wrongLetters = new Set([...guessedLetters].filter((l) => !word.includes(l)));
  const wrongCount = wrongLetters.size;
  const isWin = word.split("").every((l) => correctLetters.has(l));
  const isLose = wrongCount >= MAX_WRONG;
  const gameOver = isWin || isLose;

  const handleGuess = useCallback(
    (letter: string) => {
      if (gameOver || guessedLetters.has(letter)) return;
      setGuessedLetters((prev) => new Set([...prev, letter]));
    },
    [gameOver, guessedLetters]
  );

  const restart = () => {
    setWord(getRandomWord());
    setGuessedLetters(new Set());
  };

  // Keyboard input
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key.length === 1 && key >= "a" && key <= "z") handleGuess(key);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleGuess]);

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center px-4 py-8">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold neon-text text-primary mb-2 tracking-tight">
        Hangman Game
      </h1>
      <p className="text-muted-foreground text-sm mb-6">
        Shoolini University, Solan — B.Tech Project
      </p>

      {/* Game Card */}
      <div className="w-full max-w-lg bg-card rounded-2xl p-6 sm:p-8 card-glow neon-border border border-border">
        {/* Hangman Drawing */}
        <HangmanDrawing wrongGuesses={wrongCount} />

        {/* Wrong Guesses Counter */}
        <div className="flex justify-center mt-4 mb-6">
          <div className="flex gap-1.5">
            {Array.from({ length: MAX_WRONG }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i < wrongCount ? "bg-destructive scale-110" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <span className="ml-3 text-sm text-muted-foreground font-mono-game">
            {wrongCount}/{MAX_WRONG}
          </span>
        </div>

        {/* Word Display */}
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap mb-8">
          {word.split("").map((letter, i) => (
            <div
              key={i}
              className={`letter-slot ${correctLetters.has(letter) ? "revealed" : ""} ${
                isLose && !correctLetters.has(letter) ? "!text-destructive !border-destructive/50" : ""
              }`}
            >
              {correctLetters.has(letter) ? letter.toUpperCase() : isLose ? letter.toUpperCase() : ""}
            </div>
          ))}
        </div>

        {/* Game Status Message */}
        {gameOver && (
          <div className={`text-center mb-6 animate-scale-in`}>
            <p
              className={`text-2xl font-bold ${
                isWin ? "text-accent" : "text-destructive"
              }`}
            >
              {isWin ? "🎉 You Win!" : "💀 Game Over"}
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              {isWin
                ? "Brilliant! You guessed the word!"
                : `The word was "${word.toUpperCase()}"`}
            </p>
          </div>
        )}

        {/* Keyboard */}
        <Keyboard
          correctLetters={correctLetters}
          wrongLetters={wrongLetters}
          onGuess={handleGuess}
          disabled={gameOver}
        />

        {/* New Game Button */}
        <div className="flex justify-center mt-6">
          <button onClick={restart} className="btn-neon px-8 py-3 text-base">
            {gameOver ? "Play Again" : "New Game"}
          </button>
        </div>
      </div>

      {/* Credits */}
      <div className="mt-8 text-center text-muted-foreground text-xs sm:text-sm space-y-1">
        <p className="font-semibold text-foreground/70">Game Owners</p>
        <p>Rohit Kumar (GF202220522)</p>
        <p>Lakshay Sharma (GF202216641)</p>
      </div>
    </div>
  );
};

export default Index;

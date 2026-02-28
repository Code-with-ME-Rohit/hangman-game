interface KeyboardProps {
  correctLetters: Set<string>;
  wrongLetters: Set<string>;
  onGuess: (letter: string) => void;
  disabled: boolean;
}

const ROWS = [
  'QWERTYUIOP'.split(''),
  'ASDFGHJKL'.split(''),
  'ZXCVBNM'.split(''),
];

const Keyboard = ({ correctLetters, wrongLetters, onGuess, disabled }: KeyboardProps) => {
  const getKeyClass = (letter: string) => {
    const l = letter.toLowerCase();
    if (correctLetters.has(l)) return 'keyboard-key correct';
    if (wrongLetters.has(l)) return 'keyboard-key wrong';
    return 'keyboard-key';
  };

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-1 sm:gap-1.5">
          {row.map((letter) => {
            const l = letter.toLowerCase();
            const used = correctLetters.has(l) || wrongLetters.has(l);
            return (
              <button
                key={letter}
                className={getKeyClass(letter)}
                onClick={() => onGuess(l)}
                disabled={disabled || used}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;

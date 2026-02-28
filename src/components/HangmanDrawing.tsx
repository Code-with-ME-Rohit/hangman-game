interface HangmanDrawingProps {
  wrongGuesses: number;
}

const BODY_PARTS = [
  // Head
  <circle key="head" cx="200" cy="80" r="20" className="stroke-primary fill-none stroke-[3]" />,
  // Body
  <line key="body" x1="200" y1="100" x2="200" y2="160" className="stroke-primary stroke-[3]" />,
  // Left arm
  <line key="left-arm" x1="200" y1="120" x2="165" y2="145" className="stroke-primary stroke-[3]" />,
  // Right arm
  <line key="right-arm" x1="200" y1="120" x2="235" y2="145" className="stroke-primary stroke-[3]" />,
  // Left leg
  <line key="left-leg" x1="200" y1="160" x2="170" y2="200" className="stroke-primary stroke-[3]" />,
  // Right leg
  <line key="right-leg" x1="200" y1="160" x2="230" y2="200" className="stroke-primary stroke-[3]" />,
];

const HangmanDrawing = ({ wrongGuesses }: HangmanDrawingProps) => {
  return (
    <svg viewBox="0 0 300 240" className="w-full max-w-[250px] sm:max-w-[280px] mx-auto">
      {/* Gallows */}
      <line x1="60" y1="230" x2="240" y2="230" className="stroke-muted-foreground/40 stroke-[3]" />
      <line x1="100" y1="230" x2="100" y2="20" className="stroke-muted-foreground/40 stroke-[3]" />
      <line x1="100" y1="20" x2="200" y2="20" className="stroke-muted-foreground/40 stroke-[3]" />
      <line x1="200" y1="20" x2="200" y2="60" className="stroke-muted-foreground/40 stroke-[3]" />
      
      {/* Body parts based on wrong guesses */}
      {BODY_PARTS.slice(0, wrongGuesses).map((part, i) => (
        <g key={i} className="animate-fade-in">{part}</g>
      ))}

      {/* X eyes when dead */}
      {wrongGuesses >= 6 && (
        <g className="animate-fade-in">
          <line x1="190" y1="73" x2="196" y2="79" className="stroke-destructive stroke-[2]" />
          <line x1="196" y1="73" x2="190" y2="79" className="stroke-destructive stroke-[2]" />
          <line x1="204" y1="73" x2="210" y2="79" className="stroke-destructive stroke-[2]" />
          <line x1="210" y1="73" x2="204" y2="79" className="stroke-destructive stroke-[2]" />
          <line x1="194" y1="90" x2="206" y2="90" className="stroke-destructive stroke-[2]" />
        </g>
      )}

      {/* Smile when alive and guesses < 6 */}
      {wrongGuesses > 0 && wrongGuesses < 6 && (
        <g className="animate-fade-in">
          <circle cx="193" cy="76" r="2" className="fill-primary" />
          <circle cx="207" cy="76" r="2" className="fill-primary" />
        </g>
      )}
    </svg>
  );
};

export default HangmanDrawing;

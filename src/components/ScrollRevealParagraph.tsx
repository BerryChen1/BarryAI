import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealParagraphProps {
  text: string;
  highlightWords?: string[];
  className?: string;
  id?: string;
}

export function ScrollRevealParagraph({ text, highlightWords = [], className, id }: ScrollRevealParagraphProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start tracking when the top of the element hits 80% of viewport height
    // End tracking when the bottom of the element leaves 20% of viewport height
    offset: ["start 80%", "end 30%"]
  });

  const words = useMemo(() => text.split(/\s+/), [text]);

  return (
    <p 
      ref={containerRef} 
      id={id} 
      className={`${className} flex flex-wrap leading-tight md:leading-[1.15] justify-start content-start select-none`}
    >
      {words.map((word, index) => {
        // Calculate a safe delay window for this specific word
        const start = index / words.length;
        const end = Math.min((index + 1.2) / words.length, 1);
        
        // Match base words avoiding punctuation
        const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()—\s]/g, "").toLowerCase();
        const isHighlight = highlightWords.some(hw => cleanWord === hw.toLowerCase());

        return (
          <Word
            key={index}
            word={word}
            progress={scrollYProgress}
            start={start}
            end={end}
            isHighlight={isHighlight}
          />
        );
      })}
    </p>
  );
}

interface WordProps {
  key?: any;
  word: string;
  progress: any;
  start: number;
  end: number;
  isHighlight: boolean;
}

function Word({ word, progress, start, end, isHighlight }: WordProps) {
  // Map our opacity from 0.15 to 1
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.25em] transition-colors duration-200 ${
        isHighlight 
          ? 'text-foreground font-semibold' 
          : 'text-[hsl(var(--hero-subtitle))] font-light'
      }`}
    >
      {word}
    </motion.span>
  );
}

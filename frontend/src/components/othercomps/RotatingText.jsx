"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

/** Utility function to combine class names */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** RotatingText component with hover effect */
const RotatingText = forwardRef((props, ref) => {
  const {
    texts, // Array of text strings to rotate through
    transition = { type: "spring", damping: 25, stiffness: 300 }, // Text animation transition
    initial = { y: "100%", opacity: 0 }, // Initial text animation state
    animate = { y: 0, opacity: 1 }, // Animate text animation state
    exit = { y: "-120%", opacity: 0 }, // Exit text animation state
    animatePresenceMode = "wait", // AnimatePresence mode
    animatePresenceInitial = false, // AnimatePresence initial render
    rotationInterval = 2000, // Time between text rotations (ms)
    staggerDuration = 0, // Delay between character animations
    staggerFrom = "first", // Stagger animation starting point
    loop = true, // Loop back to start after last text
    auto = true, // Auto-rotate text
    splitBy = "characters", // How to split text (characters, words, lines)
    onNext, // Callback for next text
    mainClassName, // Class for outer span
    splitLevelClassName, // Class for split groups
    elementLevelClassName, // Class for individual elements
    containerClassName, // Class for motion.div container
    ...rest // Additional props
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const blueBackgroundControls = useAnimation(); // Controls for blue background animation

  /** Split text into characters using Intl.Segmenter if available */
  const splitIntoCharacters = (text) => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  };

  /** Memoized text elements based on splitBy prop */
  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    if (splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    if (splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }
    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [texts, currentTextIndex, splitBy]);

  /** Calculate stagger delay for animations */
  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      const total = totalChars;
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  /** Handle index change with callback */
  const handleIndexChange = useCallback(
    (newIndex) => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  /** Move to next text */
  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop
          ? 0
          : currentTextIndex
        : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  /** Move to previous text */
  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0
        ? loop
          ? texts.length - 1
          : currentTextIndex
        : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) {
      handleIndexChange(prevIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  /** Jump to specific text index */
  const jumpTo = useCallback(
    (index) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) {
        handleIndexChange(validIndex);
      }
    },
    [texts.length, currentTextIndex, handleIndexChange]
  );

  /** Reset to first text */
  const reset = useCallback(() => {
    if (currentTextIndex !== 0) {
      handleIndexChange(0);
    }
  }, [currentTextIndex, handleIndexChange]);

  /** Expose methods via ref */
  useImperativeHandle(
    ref,
    () => ({
      next,
      previous,
      jumpTo,
      reset,
    }),
    [next, previous, jumpTo, reset]
  );

  /** Auto-rotation effect */
  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  return (
    <motion.span
      className={cn(
        "flex flex-wrap whitespace-pre-wrap relative",
        mainClassName
      )}
      {...rest}
      layout
      transition={transition}
    >
      {/* Screen reader text */}
      <span className="sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.div
          key={currentTextIndex} // Remounts on text change
          className={cn(
            splitBy === "lines"
              ? "flex flex-col w-full"
              : "flex flex-wrap whitespace-pre-wrap relative",
            "relative bg-[#C4960F] bg-opacity-75 rounded-full md:px-10 md:py-5 overflow-hidden px-2 py-3",
            containerClassName
          )}
          layout
          aria-hidden="true"
          onHoverStart={() =>
            blueBackgroundControls.start({
              y: "0%",
              transition: { duration: 0.3, ease: "easeInOut" },
            })
          }
          onHoverEnd={() => {
            blueBackgroundControls
              .start({
                y: "-100%",
                transition: { duration: 0.3, ease: "easeInOut" },
              })
              .then(() => {
                blueBackgroundControls.set({ y: "100%" });
              });
          }}
        >
          {/* Blue background with animation */}
          <motion.span
            className="absolute inset-0 z-0 bg-transparent rounded-full"
            initial={{ y: "100%" }} // Starts below container
            animate={blueBackgroundControls} // Controlled by hover events
          />
          {/* Text elements */}
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array
              .slice(0, wordIndex)
              .reduce((sum, word) => sum + word.characters.length, 0);
            return (
              <span
                key={wordIndex}
                className={cn("inline-flex", splitLevelClassName)}
              >
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(
                        previousCharsCount + charIndex,
                        array.reduce(
                          (sum, word) => sum + word.characters.length,
                          0
                        )
                      ),
                    }}
                    className={cn(
                      "relative inline-block z-10", // Above background
                      elementLevelClassName
                    )}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
              </span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingText.displayName = "RotatingText";
export default RotatingText;
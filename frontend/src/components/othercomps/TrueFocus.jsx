import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const TrueFocus = ({
  sentence = "True Focus",
  blurAmount = 5,
  borderColor = "green",
  glowColor = "rgba(0, 255, 0, 0.6)",
  animationDuration = 0.5,
  wordLinks = {}, // Add this prop to accept route mappings
}) => {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState(null);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (currentIndex === null) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]?.getBoundingClientRect();
    if (!activeRect) return;

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
    
    setAnimationKey(prev => prev + 1);
  }, [currentIndex]);

  const handleMouseEnter = (index) => {
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    setCurrentIndex(null);
  };

  return (
    <div className="relative flex gap-4 justify-center items-start flex-wrap" ref={containerRef}>
      {words.map((word, index) => {
        // Check if this word has a corresponding link
        const linkTo = wordLinks[word.toLowerCase()];
        
        // Wrap the word in a Link if it has a route
        const wordElement = linkTo ? (
          <Link 
            to={linkTo} 
            className="relative text-[3rem] font-black cursor-pointer text-white transition-all"
            style={{
              filter: index === currentIndex ? 'blur(0px)' : `blur(${blurAmount}px)`,
              "--border-color": borderColor,
              "--glow-color": glowColor,
              transition: `filter ${animationDuration}s ease`,
              textDecoration: 'none' // Remove underline from links
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </Link>
        ) : (
          <span
            className="relative text-[3rem] font-black cursor-pointer text-white transition-all"
            style={{
              filter: index === currentIndex ? 'blur(0px)' : `blur(${blurAmount}px)`,
              "--border-color": borderColor,
              "--glow-color": glowColor,
              transition: `filter ${animationDuration}s ease`,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );

        return (
          <div key={index} ref={(el) => (wordRefs.current[index] = el)}>
            {wordElement}
          </div>
        );
      })}

      {/* Rest of your border animation code remains the same */}
      {currentIndex !== null && (
        <motion.div
          key={animationKey}
          className="absolute pointer-events-none"
          initial={{
            x: focusRect.x,
            y: focusRect.y,
            width: focusRect.width,
            height: focusRect.height,
          }}
          animate={{
            x: focusRect.x,
            y: focusRect.y,
            width: focusRect.width,
            height: focusRect.height,
          }}
          transition={{ duration: animationDuration, ease: "easeInOut" }}
          style={{
            "--border-color": borderColor,
            "--glow-color": glowColor,
          }}
        >
          {[
            { class: "top-[-10px] left-[-10px] border-r-0 border-b-0", initialY: -20, animateY: -10 },
            { class: "top-[-10px] right-[-10px] border-l-0 border-b-0", initialY: -20, animateY: -10 },
            { class: "bottom-[-10px] left-[-10px] border-r-0 border-t-0", initialY: -20, animateY: -10 },
            { class: "bottom-[-10px] right-[-10px] border-l-0 border-t-0", initialY: -20, animateY: -10 },
          ].map((border, i) => (
            <motion.span
              key={i}
              className={`absolute w-4 h-4 border-[3px] rounded-[3px] ${border.class}`}
              initial={{ y: border.initialY }}
              animate={{ y: border.animateY }}
              transition={{ duration: animationDuration, ease: "easeOut" }}
              style={{
                borderColor: "var(--border-color)",
                filter: "drop-shadow(0 0 4px var(--border-color))",
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TrueFocus;
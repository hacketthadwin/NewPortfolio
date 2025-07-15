"use client"

import { useEffect, useRef, useMemo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const ScrollReveal = ({
  children,
  // scrollContainerRef, // This prop is no longer needed
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 8,
  blurStrength = 30,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef(null)

  const splitText = useMemo(() => {
    // Ensure children is treated as a string for splitting
    const text = typeof children === "string" ? children : ""
    return text.split(/(\s+)/).map((word, index) => {
      // Check for whitespace to render it correctly
      if (word.match(/^\s+$/)) return word
      return (
        <span className="inline-block word" key={index} style={{ backfaceVisibility: "hidden" }}>
          {word}
        </span>
      )
    })
  }, [children])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Since Lenis is integrated with ScrollTrigger at the App.js level,
    // ScrollTrigger's default 'scroller: window' will correctly pick up
    // the Lenis scroll events.
    const scroller = window; // Explicitly set to window for clarity

    // Rotation animation
    gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller, // Use window as the scroller
          start: "top bottom",
          end: rotationEnd,
          scrub: true,
        },
      },
    )

    const wordElements = el.querySelectorAll(".word")

    // Opacity animation
    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity },
      {
        ease: "none",
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller, // Use window as the scroller
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
      },
    )

    // Blur animation - Fixed implementation
    if (enableBlur) {
      // Set initial blur directly with inline styles for better browser support
      wordElements.forEach((word) => {
        word.style.filter = `blur(${blurStrength}px)`
      })

      gsap.to(wordElements, {
        filter: "blur(0px)",
        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller, // Use window as the scroller
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
        onUpdate: () => {
          // Force GPU rendering to help with blur performance
          wordElements.forEach((word) => {
            word.style.willChange = "filter"
          })
        },
        onComplete: () => {
          // Clean up willChange after animation completes
          wordElements.forEach((word) => {
            word.style.willChange = "auto"
          })
        },
      })
    }

    return () => {
      // Clean up all ScrollTriggers associated with this component instance
      // when the component unmounts.
      // This is important to prevent memory leaks, especially within reusable components.
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === el || Array.from(wordElements).includes(trigger.trigger)) {
          trigger.kill();
        }
      });
    }
    // Removed scrollContainerRef from dependency array as it's no longer a prop
  }, [enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, children])

  return (
    <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p className={`${textClassName} leading-[1.5]`}>{splitText}</p>
    </h2>
  )
}

export default ScrollReveal

"use client"

import { useEffect, useRef, useMemo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const ScrollReveal = ({
  children,
  scrollContainerRef,
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
    const text = typeof children === "string" ? children : ""
    return text.split(/(\s+)/).map((word, index) => {
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

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window

    // Rotation animation
    gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
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
          scroller,
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
          scroller,
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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength])

  return (
    <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p className={`${textClassName} leading-[1.5]`}>{splitText}</p>
    </h2>
  )
}

export default ScrollReveal

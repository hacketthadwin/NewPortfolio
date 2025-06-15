"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const CustomCursor = ({ onTextEnter, onTextLeave, scrollVelocity = { x: 0, y: 0 } }) => {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const lastPosition = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)
  const [mounted, setMounted] = useState(false)

  // Check if we're on a medium or larger device
  useEffect(() => {
    // Only run on client side
    setMounted(true)

    // Check if device is medium or larger (>=768px)
    const checkDevice = () => {
      return window.matchMedia("(min-width: 768px)").matches
    }

    // Set initial value
    const isMediumOrLarger = checkDevice()

    // If it's not a medium or larger device, don't set up the cursor
    if (!isMediumOrLarger) return

    // Initialize cursor position once DOM is ready
    if (cursorRef.current && dotRef.current) {
      // Set initial position to center of screen
      const initialX = window.innerWidth / 2
      const initialY = window.innerHeight / 2

      lastPosition.current = { x: initialX, y: initialY }

      gsap.set(cursorRef.current, {
        x: initialX,
        y: initialY,
        xPercent: -50,
        yPercent: -50,
        opacity: 0, // Start invisible until mouse moves
      })

      gsap.set(dotRef.current, { x: 0, y: 0 })
    }

    // Update dot position based on velocity
    const updateDot = () => {
      if (!dotRef.current) return

      const maxOffset = 8.4 // Adjusted for larger circle (34px - 8.5px dot)

      // Combine mouse and scroll velocity
      const dotX = gsap.utils.clamp(
        -maxOffset,
        maxOffset,
        (velocity.current.x + scrollVelocity.y * 0.5) * 3, // Increased sensitivity
      )

      const dotY = gsap.utils.clamp(-maxOffset, maxOffset, (velocity.current.y + scrollVelocity.y * 0.5) * 3)

      gsap.to(dotRef.current, {
        x: dotX,
        y: dotY,
        duration: 0.2,
        ease: "power2.out",
      })
    }

    // Mouse move handler
    let rafId = null
    const mouseMove = (e) => {
      if (rafId || !cursorRef.current) return

      rafId = requestAnimationFrame(() => {
        const newX = e.clientX
        const newY = e.clientY

        // Show cursor on first move
        if (cursorRef.current.style.opacity === "0") {
          gsap.to(cursorRef.current, {
            opacity: 1,
            duration: 0.3,
          })
        }

        // Calculate mouse velocity
        const deltaX = newX - lastPosition.current.x
        const deltaY = newY - lastPosition.current.y

        velocity.current.x = deltaX
        velocity.current.y = deltaY

        // Update cursor position
        gsap.to(cursorRef.current, {
          x: newX,
          y: newY,
          duration: 0.1,
          ease: "power2.out",
        })

        // Update dot position
        updateDot()

        // Update last position
        lastPosition.current = { x: newX, y: newY }
        rafId = null
      })
    }

    // Hide cursor when mouse leaves viewport
    const handleMouseLeave = () => {
      if (!cursorRef.current) return

      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      })
    }

    // Show cursor when mouse enters viewport
    const handleMouseEnter = () => {
      if (!cursorRef.current) return

      gsap.to(cursorRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      })
    }

    // Hover handlers
    const handleTextEnter = () => {
      if (!cursorRef.current) return

      isHovering.current = true
      gsap.to(cursorRef.current, {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out",
      })

      if (typeof onTextEnter === "function") {
        onTextEnter()
      }
    }

    const handleTextLeave = () => {
      if (!cursorRef.current) return

      isHovering.current = false
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })

      if (typeof onTextLeave === "function") {
        onTextLeave()
      }
    }

    // Add event listeners
    window.addEventListener("mousemove", mouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    if (cursorRef.current) {
      cursorRef.current.addEventListener("mouseenter", handleTextEnter)
      cursorRef.current.addEventListener("mouseleave", handleTextLeave)
    }

    // Update dot on scroll (even without mouse movement)
    gsap.ticker.add(updateDot)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", mouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)

      if (cursorRef.current) {
        cursorRef.current.removeEventListener("mouseenter", handleTextEnter)
        cursorRef.current.removeEventListener("mouseleave", handleTextLeave)
      }

      gsap.ticker.remove(updateDot)

      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [onTextEnter, onTextLeave, scrollVelocity])

  // Only render on client-side and check for medium or larger devices
  if (!mounted) return null

  // Check if we're on a medium or larger device
  const isMediumOrLarger = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches

  // Don't render on small devices
  if (!isMediumOrLarger) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform opacity-0"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div className="w-[34px] h-[34px] border-2 border-white rounded-full flex items-center justify-center bg-transparent">
        <div ref={dotRef} className="w-[8.5px] h-[8.5px] bg-white rounded-full" />
      </div>
    </div>
  )
}

export default CustomCursor

"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const getPageTitle = (pathname) => {
  if (pathname === "/") return "Home"
  return pathname.split("/")[1].charAt(0).toUpperCase() + pathname.slice(2)
}

const containerVariants = {
  initial: { opacity: 1 }, // Start fully visible
  animate: { opacity: 1, transition: { duration: 0.6 } }, // Stay visible
  exit: { opacity: 0, transition: { duration: 0.4 } }, // Fade out at the end
}

const barVariants = {
  initial: { y: "100%" },
  animate: (i) => ({
    y: 0,
    transition: {
      duration: 0.6 + i * 0.1,
      ease: "easeInOut",
    },
  }),
  exit: (i) => ({
    y: "-100%",
    transition: {
      duration: 0.6 + i * 0.1,
      ease: "easeInOut",
    },
  }),
}

const textVariants = {
  initial: { opacity: 0, y: 30 }, // Start invisible
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: 0.4 }, // Appear quickly after bars
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.4 },
  },
}

const MotionWrapper = ({ children, initialLoad }) => {
  const location = useLocation()
  const [showTransition, setShowTransition] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (!initialLoad) {
      setShowTransition(true)
      setExiting(false)

      const timeout = setTimeout(() => {
        setExiting(true)
      }, 1600)

      return () => clearTimeout(timeout)
    }
  }, [location.pathname, initialLoad])

  const bars = Array.from({ length: 5 })

  return (
    <>
      <AnimatePresence>
        {showTransition && !exiting && (
          <motion.div
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center pointer-events-none"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onAnimationComplete={() => {
              if (exiting) setShowTransition(false)
            }}
          >
            {bars.map((_, i) => (
              <motion.div key={i} custom={i} variants={barVariants} className="w-full h-[20%] bg-black" />
            ))}

            <motion.h1 variants={textVariants} className="absolute text-white text-5xl font-bold">
              {getPageTitle(location.pathname)}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  )
}

export default MotionWrapper

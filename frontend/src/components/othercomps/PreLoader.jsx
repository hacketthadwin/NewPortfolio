"use client"

import { useEffect, useState } from 'react'

const greetings = [
  { lang: 'English', text: 'Hello' },
  { lang: 'Spanish', text: 'Hola' },
  { lang: 'French', text: 'Bonjour' },
  { lang: 'German', text: 'Hallo' },
  { lang: 'Chinese', text: '你好' },
  { lang: 'Japanese', text: 'こんにちは' },
  { lang: 'Arabic', text: 'مرحبا' },
  { lang: 'Russian', text: 'Привет' },
  { lang: 'Hindi', text: 'नमस्ते' },
  { lang: 'Portuguese', text: 'Olá' },
  { lang: 'Italian', text: 'Ciao' },
  { lang: 'Korean', text: '안녕하세요' },
  { lang: 'Dutch', text: 'Hallo' },
  { lang: 'Swahili', text: 'Habari' },
  { lang: 'Turkish', text: 'Merhaba' },
]

const imageList = [
  '/images/arrow button.png',
  '/images/Chess.jpg',
  '/images/Ipaid.jpg',
  '/images/Password.jpg',
  '/images/Studynotion.jpg',
  '/images/Superheroes.jpg',
  '/images/Weather.jpg',
]

const preloadImages = (srcArray) => {
  return Promise.all(
    srcArray.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image()
          img.src = src
          img.onload = resolve
          img.onerror = reject
        })
    )
  )
}

const PreLoader = ({ onComplete = () => {} }) => {
  const [currentGreeting, setCurrentGreeting] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    // This hides the body's scrollbar while the preloader is active.
    document.body.style.overflowY = 'hidden';

    const getInterval = (index) => {
      const total = greetings.length
      const progress = index / (total - 1)
      const minInterval = 150
      const maxInterval = 400
      const a = 4 * (maxInterval - minInterval)
      return a * (progress - 0.5) * (progress - 0.5) + minInterval
    }

    let intervalId

    const updateGreeting = () => {
      setCurrentGreeting((prev) => {
        const next = prev + 1
        if (next >= greetings.length) {
          clearInterval(intervalId)
          return prev
        }
        clearInterval(intervalId)
        intervalId = setInterval(updateGreeting, getInterval(next))
        return next
      })
    }

    intervalId = setInterval(updateGreeting, getInterval(0))

    preloadImages(imageList).then(() => {
      // This timeout controls how long the preloader is fully visible.
      const timeout = setTimeout(() => {
        setIsVisible(false) // Start fade-out/slide-out animation of preloader
        // This inner timeout allows the preloader's exit animation to complete
        setTimeout(() => {
          setIsMounted(false) // Unmount preloader from DOM
          document.body.style.overflowY = 'auto'; // ⭐ Re-enable scroll after preloader is fully gone ⭐
          onComplete(); // Notify App.js that preloader is done
        }, 600) // Matches transition duration of preloader element
      }, 2000) // Preloader's main display time (2 seconds)

      return () => clearTimeout(timeout)
    })

    return () => {
      clearInterval(intervalId);
      // Ensure scroll is re-enabled if component unmounts for any reason before timeout completes
      document.body.style.overflowY = 'auto';
    };
  }, [onComplete]); // Dependency array should include onComplete

  return isMounted ? (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-transparent">
        <div
          className={`absolute inset-0 bg-black transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            !isVisible ? 'translate-y-full' : 'translate-y-0'
          }`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex items-center text-4xl sm:text-6xl md:text-8xl lg:text-9xxl text-white font-bold">
              <span className="inline-block w-4 h-4 bg-white rounded-full mr-2 sm:mr-3 md:mr-4"></span>
              {greetings[currentGreeting]?.text || ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default PreLoader;

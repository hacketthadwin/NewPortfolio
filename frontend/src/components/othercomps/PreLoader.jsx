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
      document.body.style.overflowY = 'hidden'; // ✅ Lock scroll on mount
    // Function to calculate dynamic interval based on progress
    const getInterval = (index) => {
      const total = greetings.length
      const progress = index / (total - 1) // Normalized progress (0 to 1)
      // Quadratic function: slow at start/end, fast in middle
      const minInterval = 150 // Fastest (middle)
      const maxInterval = 400 // Slowest (start/end)
      // y = a(x-0.5)^2 + minInterval, where a is scaled to reach maxInterval at edges
      const a = 4 * (maxInterval - minInterval) // Scale factor for parabola
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
        // Clear previous interval and set new one with updated speed
        clearInterval(intervalId)
        intervalId = setInterval(updateGreeting, getInterval(next))
        return next
      })
    }

    // Start with initial interval
    intervalId = setInterval(updateGreeting, getInterval(0))

    preloadImages(imageList).then(() => {
      const timeout = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          setIsMounted(false)
          document.body.style.overflowY = 'auto'; // ✅ Unlock scroll when preloader ends
          onComplete()
        }, 600)
      }, 4000)

      return () => clearTimeout(timeout)
    })

  return () => {
    clearInterval(intervalId);
    document.body.style.overflowY = 'auto'; // ✅ Safety net on unmount
  };
}, [onComplete]);

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

export default PreLoader

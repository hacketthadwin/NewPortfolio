"use client"

import { useState } from "react"
import ProfileImg from "./imgs/ProfileImg.png"
import ScrollVelocity from "./othercomps/ScrollVelocity"
import ScrollReveal from "./othercomps/ScrollReveal.jsx"
import RotatingText from "./othercomps/RotatingText.jsx"
import Magnet from "./othercomps/Magnet.jsx"
import TiltedCard from "./othercomps/TiltedCard"
import Dock from "./othercomps/Dock.jsx"
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import MotionWrapper from "./MotionWrapper.jsx"
import ResponsiveParticles from "./othercomps/ResponsiveParticles.jsx"

function Carousel({ items, onTextEnter, onTextLeave }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1));
  };

  return (
    <div className="flex items-center justify-center w-full max-w-4xl mx-auto py-4 sm:py-5 md:py-6 lg:py-7 xl:py-8 2xl:py-9">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        onMouseEnter={onTextEnter}
        onMouseLeave={onTextLeave}
        className={`mr-0 sm:mr-2 md:mr-3 lg:mr-3 xl:mr-4 2xl:mr-4 p-0 sm:p-1.5 md:p-2 lg:p-2 xl:p-2.5 2xl:p-3 rounded-full transition ${
          currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } w-[2.5rem] sm:w-[3rem] md:w-[3.5rem] lg:w-[4rem] xl:w-[4.5rem] 2xl:w-[5rem] h-[2.5rem] sm:h-[3rem] md:h-[3.5rem] lg:h-[4rem] xl:h-[4.5rem] 2xl:h-[5rem] flex items-center justify-center z-10`}
        aria-label="Previous item"
      >
        <img
          src="/images/arrow button.png"
          alt="Previous"
          className="w-[1.5rem] sm:w-[2rem] md:w-[2rem] lg:w-[2rem] xl:w-[2rem] 2xl:w-[2rem] h-[1.5rem] sm:h-[2rem] md:h-[2rem] lg:h-[2rem] xl:h-[2rem] 2xl:h-[2rem] transform -rotate-90 invert scale-[2] sm:scale-[4] md:scale-[4] lg:scale-[4] xl:scale-[4] 2xl:scale-[4] "
        />
      </button>

      {/* Tilted Card */}
      <div className="w-[22rem] sm:w-[22rem] md:w-[42rem] lg:w-[62rem] xl:w-[82rem] 2xl:w-[102rem] h-[18rem] sm:h-[21rem] md:h-[24rem] lg:h-[27rem] xl:h-[30rem] 2xl:h-[43rem] px-0">
        <TiltedCard
          imageSrc={items[currentIndex].content}
          altText={items[currentIndex].text}
          captionText={items[currentIndex].text}
          containerHeight="100%"
          containerWidth="100%"
          imageHeight="100%"
          imageWidth="100%"
        />
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        onMouseEnter={onTextEnter}
        onMouseLeave={onTextLeave}
        className={`ml-0 sm:ml-2 md:ml-3 lg:ml-3 xl:ml-4 2xl:ml-4 p-0 sm:p-1.5 md:p-2 lg:p-2 xl:p-2.5 2xl:p-3 rounded-full transition ${
          currentIndex === items.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } w-[2.5rem] sm:w-[3rem] md:w-[3.5rem] lg:w-[4rem] xl:w-[4.5rem] 2xl:w-[5rem] h-[2.5rem] sm:h-[3rem] md:h-[3.5rem] lg:h-[4rem] xl:h-[4.5rem] 2xl:h-[5rem] flex items-center justify-center z-10`}
        aria-label="Next item"
      >
        <img
          src="/images/arrow button.png"
          alt="Next"
          className="w-[1.5rem] sm:w-[2rem] md:w-[2rem] lg:w-[2rem] xl:w-[2rem] 2xl:w-[2rem] h-[1.5rem] sm:h-[2rem] md:h-[2rem] lg:h-[2rem] xl:h-[2rem] 2xl:h-[2rem] transform rotate-90 invert scale-[2] sm:scale-[4] md:scale-[4] lg:scale-[4] xl:scale-[4] 2xl:scale-[4]"
        />
      </button>
    </div>
  );
}

const Home = () => {
  const items = [
    { content: "/images/Chess.jpg", text: "Chess" },
    { content: "/images/Ipaid.jpg", text: "Ipaid" },
    { content: "/images/Password.jpg", text: "Password" },
    { content: "/images/Studynotion.jpg", text: "Studynotion" },
    { content: "/images/Superheroes.jpg", text: "Superheroes" },
    { content: "/images/Weather.jpg", text: "Weather" },
  ]

  const GithubIcon = () => (
    <svg
      className="w-4 sm:w-4 md:w-5 lg:w-5 xl:w-5 2xl:w-6 h-4 sm:h-4 md:h-5 lg:h-5 xl:h-5 2xl:h-6 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )

  const InstagramIcon = () => (
    <svg
      className="w-4 sm:w-4 md:w-5 lg:w-5 xl:w-5 2xl:w-6 h-4 sm:h-4 md:h-5 lg:h-5 xl:h-5 2xl:h-6 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.285.058-2.678.284-3.885 1.491S1.02 4.256 1.02 5.542c-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.058 1.285.284 2.678 1.491 3.885s2.598 1.433 3.885 1.491c1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.285-.058 2.678-.284 3.885-1.491s1.433-2.598 1.491-3.885c.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.285-.284-2.678-1.491-3.885s-2.598-1.433-3.885-1.491c-1.28-.058-1.688-.072-4.947-.072z" />
      <path d="M12 5.838c-3.405 0-6.162 2.757-6.162 6.162s2.757 6.162 6.162 6.162 6.162-2.757 6.162-6.162-2.757-6.162-6.162-6.162zm0 10.162c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
      <circle cx="18.406" cy="5.594" r="1.44" />
    </svg>
  )

  const items2 = [
    {
      icon: <GithubIcon />,
      label: "GitHub",
      onClick: () => window.open("https://github.com/hacketthadwin", "_blank"),
    },
    {
      icon: <InstagramIcon />,
      label: "Instagram",
      onClick: () => window.open("https://www.instagram.com/_not_so_adarsh/", "_blank"),
    },
    {
      icon: <EnvelopeIcon className="w-6 h-6 text-white" />,
      label: "Email",
      onClick: () => (window.location.href = "mailto:adarsh12345678jha@gmail.com"),
    },
  ]

  return (
    <MotionWrapper>
      {/* Change is on the line below: overflow-x-hidden is now overflow-hidden */}
      <div
        style={{
          minHeight: "170vh",
        }}
        className="overflow-hidden border-[0rem] lg:border-[0rem] border-[#323332] absolute top-[2rem] left-[1.5rem] sm:left-[1rem] md:left-[1.3rem] xl:left-[2.3rem] 2xl:left-[14rem] md:top-0 scale-[1.12] sm:scale-105 mt-40 2xl:mt-56 2xl:ml-[-12rem] sm:ml-[0rem] max-w-[90vw] sm:max-w-[95vw] "
      >
        <div>
          <ResponsiveParticles/>

          <div className="relative group">
            <img
              src={ProfileImg || "/placeholder.svg"}
              alt="myimage"
              className="w-[8rem] sm:w-[11rem] md:w-[13rem] lg:w-[20rem] xl:w-[27rem] 2xl:w-[30rem] ml-[-1rem] sm:ml-[-1rem] md:ml-[-2rem] lg:ml-[-2rem] xl:ml-[-5rem] 2xl:ml-[0rem] grayscale hover:grayscale-0 mt-[1rem] sm:mt-[2rem] md:mt-[5rem] lg:mt-[5rem] xl:mt-[6rem] 2xl:mt-[4rem]
                transition-all duration-300 border-[0.1rem] lg:border-[0.2rem] border-white/20 hover:border-white/80
                rounded-lg"
              style={{
                zIndex: 1,
                transform: "perspective(20rem) rotateY(5deg)",
              }}
            />
            <Magnet
              wrapperClassName="absolute top-[-9rem] sm:top-[-12rem] md:top-[-16rem] lg:top-[-25rem] xl:top-[-27rem] 2xl:top-[-29rem] left-[12rem] sm:left-[20rem] md:left-[20rem] lg:left-[40rem] xl:left-[52rem] 2xl:left-[50rem] flex items-center justify-center w-[10rem] sm:w-[20rem] md:w-[30rem] lg:w-[50rem] xl:w-[50rem] 2xl:w-[50rem] h-[10rem] sm:h-[20rem] md:h-[30rem] lg:h-[40rem] xl:h-[50rem] 2xl:h-[50rem] z-[200]"
              innerClassName="bg-[#C4960F] text-white text-[0.4rem] sm:text-[0.5rem] md:text-[0.8rem] lg:text-[1.1rem] xl:text-[1.5rem] 2xl:text-[1.4rem] p-1.5 sm:p-2.5 md:p-3 lg:p-3.5 xl:p-4 2xl:p-5 font-bold rounded-full flex items-center justify-center text-center leading-none transition-all duration-700 hover:bg-transparent hover:border-2 hover:border-white hover:shadow-lg hover:scale-125 w-12 sm:w-16 md:w-24 lg:w-32 xl:w-[10rem] 2xl:w-[12rem] h-12 sm:h-16 md:h-24 lg:h-32 xl:h-[10rem] 2xl:h-[12rem] "
              disabled={false}
              padding={500}
              magnetStrength={5}
            >
              <a
                href="https://drive.google.com/file/d/1tvznfQzTQzabS36IP9uvSAd-HMjHZAyr/view?usp=drive_link"
                className="flex items-center justify-center gap-1 w-full h-full text-center"
              >
                Download CV
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="
                    w-5 h-5
                    hidden xs:block 2xl:block
                    2xl:scale-[2]
                    relative top-0.5 left-0.5
                    transition-transform duration-300
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 16V4m0 12l-4-4m4 4l4-4"
                  />
                </svg>
              </a>
            </Magnet>
          </div>
          <div className="absolute top-[4rem] sm:top-[10rem] md:top-[17rem] lg:top-[25rem] xl:top-[36rem] 2xl:top-[36rem] left-[-9rem] sm:left-[-8rem] md:left-[-2rem] lg:left-[-2rem] xl:left-[-8rem] 2xl:left-[-14.3rem]">
            <ScrollVelocity
              texts={["ADARSH JHA -  ", "DESIGN - DEVELOP - DELIVER - REPEAT - "]}
              velocity={200}
              className="text-[1.6rem] sm:text-[2.2rem] md:text-[3rem] lg:text-[4rem] xl:text-[7rem] 2xl:text-[9rem] font-light text-gray-300 noto-sans-display hover:text-white"
              parallaxStyle={{
                zIndex: 2,
                position: "absolute",
                top: "0% ",
                left: "0%",
                width: "screen",
                minHeight: "6rem sm:14rem md:16rem lg:18rem xl:20rem 2xl:1rem",
                minWidth: "100vw",
              }}
              scrollerStyle={{ zIndex: 2, position: "relative" }}
            />
          </div>
        </div>

        <ScrollReveal
          baseOpacity={0.1}
          enableBlur={true}
          baseRotation={8}
          blurStrength={4}
          textClassName="text-[1.2rem] sm:text-[2.8rem] md:text-[3.7rem] lg:text-[5.5rem] xl:text-[4rem] 2xl:text-[4rem] font-bold text-gray-300 custom-oswald"
          containerClassName="w-screen mt-[-8rem] sm:mt-[-20rem] md:mt-[-28rem] lg:mt-[-30rem] xl:mt-[-25rem] 2xl:mt-[-40rem] ml-[0rem] sm:ml-[-2rem] md:ml-[-2rem] lg:ml-[-2rem] xl:ml-[-4rem] 2xl:ml-[-2rem] p-[1rem] sm:p-[3rem] md:p-[4rem] lg:p-[5rem] xl:p-[6rem] 2xl:p-[8rem]"
        >
          Hi, My Name is
        </ScrollReveal>
        <ScrollReveal
          baseOpacity={0.1}
          enableBlur={true}
          baseRotation={8}
          blurStrength={4}
          textClassName="text-[1.4rem] sm:text-[2.8rem] md:text-[3.7rem] lg:text-[5.5rem] xl:text-[4rem] 2xl:text-[4rem] font-bold text-[#C4960F] custom-oswald"
          containerClassName="w-screen mt-[-5.25rem] sm:mt-[-11.4rem] md:mt-[-14.9rem] lg:mt-[-19.4rem] xl:mt-[-19.1rem] 2xl:mt-[-23.3rem] ml-[7.5rem] sm:ml-[15.5rem] md:ml-[21.2rem] lg:ml-[32rem] xl:ml-[21rem] 2xl:ml-[23rem] p-[1rem] sm:p-[3rem] md:p-[4rem] lg:p-[5rem] xl:p-[6rem] 2xl:p-[8rem]"
        >
          Adarsh Jha,
        </ScrollReveal>
        <ScrollReveal
          baseOpacity={0.1}
          enableBlur={true}
          baseRotation={8}
          blurStrength={4}
          textClassName="text-[0.7rem] sm:text-[1.4rem] md:text-[2rem] lg:text-[3rem] xl:text-[3rem] 2xl:text-[3rem] font-medium text-gray-200 dosis-font"
          containerClassName="w-screen mt-[-6rem] sm:mt-[-9rem] md:mt-[-10rem] lg:mt-[-12rem] xl:mt-[-14rem] 2xl:mt-[-15rem] ml-[-3rem] sm:ml-[-4.8rem] md:ml-[-6.6rem] lg:ml-[-5rem] xl:ml-[-6rem] 2xl:ml-[-10rem] pl-[4rem] pr-[0.5rem] sm:pr-[1rem] md:pr-[2rem] lg:pr-[3rem] xl:pr-[10rem] 2xl:pr-[15rem] sm:pl-[6rem] md:pl-[8rem] lg:pl-[8rem] xl:pl-[8rem] 2xl:pl-[16rem] py-[4rem] sm:py-[6rem] md:py-[8rem] lg:py-[8rem] xl:py-[8rem] 2xl:py-[8rem]"
        >
          I am a 3rd student of Electrical Engineering Department at National Institute of Technology, Raipur. This is
          my personal portfolio website where i showcase my projects and skills.
        </ScrollReveal>
        <div className="text-[0.5rem] sm:text-[0.8rem] md:text-[0.8rem] lg:text-[1.1rem] xl:text-[1.7rem] 2xl:text-[2.5rem] font-bold text-white mt-[-2rem] sm:mt-[-3rem] md:mt-[0rem] lg:mt-[0rem] xl:mt-[0rem] 2xl:mt-[0rem] ml-[1rem] sm:ml-[1rem] md:ml-[3rem] lg:ml-[1.5rem] xl:ml-[1rem] 2xl:ml-[5rem]">
          I am
        </div>
        <RotatingText
          texts={["Web Developer", "Competitive Programmer", "Freelancer", "Video Editor"]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-140%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          animatePresenceMode="wait"
          animatePresenceInitial={false}
          rotationInterval={1700}
          staggerDuration={0}
          staggerFrom="first"
          loop={true}
          auto={true}
          splitBy="characters"
          mainClassName="text-[0.5rem] sm:text-[0.8rem] md:text-[0.8rem] lg:text-[1.1rem] xl:text-[1.7rem] 2xl:text-[2.5rem] font-bold text-white mt-[-1.5rem] sm:mt-[-2.0rem] md:mt-[-2.4rem] lg:mt-[-2.8rem] xl:mt-[-3.7rem] 2xl:mt-[-4.7rem] ml-[2.3rem] sm:ml-[3.2rem] md:ml-[5.5rem] lg:ml-[4.5rem] xl:ml-[5.2rem] 2xl:ml-[12rem]"
        />


        <div className="mt-[-6rem] sm:mt-[-12rem] md:mt-[-15.5rem] lg:mt-[-19rem] xl:mt-[-23rem] 2xl:mt-[-29rem] ml-[-10.8rem] sm:ml-[-20rem] md:ml-[-21rem] lg:ml-[-26rem] xl:ml-[-26rem] 2xl:ml-[-25rem] w-[30rem] sm:w-[50rem] md:w-[60rem] lg:w-[70rem] xl:w-[75rem] 2xl:w-[80rem] h-[15rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem] xl:h-[40rem] 2xl:h-[50rem] scale-[0.2] sm:scale-[0.25] md:scale-[0.35] lg:scale-[0.45] xl:scale-[0.6] 2xl:scale-[0.5]">
          <Dock items={items2} panelHeight={68} baseItemSize={50} magnification={70} />
        </div>
      </div>
    </MotionWrapper>
  )
}

export default Home

"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import TextPressure from "./othercomps/TextPressure.jsx"
import TrueFocus from "./othercomps/TrueFocus.jsx"

const HeaderSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const navLinks = [
    { path: "/projects", text: "Projects" },
    { path: "/competitive", text: "Competitive" },
    { path: "/contact", text: "Contact" },
  ]

  return (
    <header className="w-full z-200 top-0 bg-dark relative">
      {/* Top bar: logo + hamburger */}
      <div className="relative flex items-center mx-auto px-2 sm:px-2 md:px-3 lg:px-3 xl:px-3.5 2xl:px-4 py-3 sm:py-3 md:py-4 lg:py-4.5 xl:py-5 2xl:py-6">
        {/* Logo */}
        <div className="w-32 sm:w-40 md:w-48 lg:w-52 xl:w-56 2xl:w-64 flex-none ml-2 sm:ml-2.5 md:ml-3 lg:ml-4 xl:ml-4.5 2xl:ml-5">
          <Link to="/" className="inline-block hover:opacity-90 transition-opacity w-full">
            <TextPressure text="Adarsh" textColor="#ffffff" strokeColor="#ff0000" minFontSize={48} maxFontSize={64} />
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="xl:hidden text-white focus:outline-none ml-auto"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex justify-center ml-auto gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 mr-2 sm:mr-2 md:mr-2.5 lg:mr-3 xl:mr-3.5 2xl:mr-4">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="hover:no-underline group relative">
              <TrueFocus sentence={link.text} blurAmount={5} borderColor="#70B8F2" animationDuration={0.5} />
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay with transition */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div
        className={`xl:hidden bg-dark w-full absolute top-full left-0 shadow-lg border-t border-gray-700 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out z-50
          ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="flex flex-col items-end py-4 pr-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover:no-underline group relative py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <TrueFocus sentence={link.text} blurAmount={0} borderColor="#70B8F2" animationDuration={0.5} />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default HeaderSection

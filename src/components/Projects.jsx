import MotionWrapper from "./MotionWrapper"

const Projects = () => {
  const projects = [
    {
      id: "01",
      content: "/images/Chess.jpg",
      link:"https://github.com/hacketthadwin/ChessEngine",
      text: "Chess",
      para: "I developed a fully functional chess game using Python and the Pygame library, integrating complete chess logic with an interactive graphical interface. The game supports all standard rules, including legal piece movements, castling, en passant, pawn promotion, and proper detection of check, checkmate, and stalemate. The interface allows players to interact with the board intuitively, while the backend ensures turn-based logic and valid move enforcement. This project showcases my ability to combine game development with algorithmic problem-solving in Python.",
    },
    {
      id: "02",
      content: "/images/Ipaid.jpg",
      link:"https://github.com/hacketthadwin/IPaid",
      text: "Ipaid",
      para: "I developed IPaid, a modern and responsive fintech website frontend built using HTML, CSS, and JavaScript. It features a clean layout, smooth animations, and well-structured sections that highlight products, testimonials, and partners, showcasing strong UI/UX and front-end development skills.",
    },
    {
      id: "03",
      content: "/images/Password.jpg",
      link:"https://github.com/hacketthadwin/Mini-Projects/tree/main/PASSWORD_GENERATOR",
      text: "Password",
      para: "I developed a random password generator as a ReactJS application featuring a sleek and user-friendly interface. The app lets users customize password length and character types, generating secure passwords instantly. With responsive design and smooth interactions, it highlights my ability to build dynamic, state-driven front-end applications focused on usability and security.",
    },
    {
      id: "04",
      content: "/images/Studynotion.jpg",
      link:"https://github.com/hacketthadwin/Mini-Projects/tree/main/STUDYNOTION",
      text: "Studynotion",
      para: "I built StudyNotion, a ReactJS website featuring multiple course-specific login pages managed seamlessly with React Router. Each course has its own dedicated login route and page, enabling smooth navigation and a structured user experience. This project demonstrates my proficiency in ReactJS for building scalable, multi-page applications with dynamic routing and component-based architecture.",
    },
    {
      id: "05",
      content: "/images/Superheroes.jpg",
      link:"https://github.com/hacketthadwin/Mini-Projects/tree/main/ParallaxWebsite",
      text: "Superheroes",
      para: "I created a simple parallax website using HTML and CSS to showcase different superheroes. Designed purely for practice, the site features smooth scrolling effects and layered backgrounds that create depth and visual interest, helping me strengthen my skills in layout design and CSS animations.",
    },
    {
      id: "06",
      content: "/images/Weather.jpg",
      link:"https://github.com/hacketthadwin/Mini-Projects/tree/main/WEATHER_OF_DIFFERENT_CITIES",
      text: "Weather",
      para: "I developed a ReactJS weather app that allows users to search and view the weather for multiple cities. Users can easily add cities to their list and remove any they no longer want to track, providing a simple and interactive way to manage weather information with a clean and responsive interface.",
    },
  ]

  return (
    <MotionWrapper>
      <div className="container mx-auto px-4 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 group"
            >
              <div className="relative">
                <div className="absolute top-4 left-4 rubik-burned-regular text-4xl text-white font-bold z-10">
                  {project.id}
                </div>
                <img
                  src={project.content || "/placeholder.svg"}
                  alt={project.text}
                  className="w-full h-64 object-cover border-b-2 border-white/30 group-hover:scale-125 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="bangers-regular text-3xl text-white font-bold mb-4">{project.text}</h3>
                <div className="dosis-font text-white text-lg line-clamp-4 mb-4">{project.para}</div>
                <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-md transition-colors duration-300" onClick={() => window.open(project.link, "_blank")}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MotionWrapper>
  )
}

export default Projects

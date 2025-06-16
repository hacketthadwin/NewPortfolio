import React from 'react';
import ChromaGrid from './othercomps/ChromaGrid'; // Make sure this path is correct
import MotionWrapper from './MotionWrapper'; // Make sure this path is correct

const Projects = () => {
  // Your original projects data
  const projects = [
    {
      id: "01",
      content: "/images/Chess.jpg",
      link: "https://github.com/hacketthadwin/ChessEngine",
      text: "Chess Engine",
      para: "A fully functional chess game with an interactive GUI, built using Python and Pygame.",
    },
    {
      id: "02",
      content: "/images/Ipaid.jpg",
      link: "https://github.com/hacketthadwin/IPaid",
      text: "IPaid Fintech Frontend",
      para: "A modern fintech website frontend featuring a clean UI, smooth animations, and responsive design.",
    },
    {
      id: "03",
      content: "/images/Password.jpg",
      link: "https://github.com/hacketthadwin/Mini-Projects/tree/main/PASSWORD_GENERATOR",
      text: "React Password Generator",
      para: "A sleek, customizable password generator built with ReactJS for dynamic and secure password creation.",
    },
    {
      id: "04",
      content: "/images/Studynotion.jpg",
      link: "https://github.com/hacketthadwin/Mini-Projects/tree/main/STUDYNOTION",
      text: "StudyNotion Platform",
      para: "A multi-page educational website using ReactJS and React Router for seamless navigation.",
    },
    {
      id: "05",
      content: "/images/Superheroes.jpg",
      link: "https://github.com/hacketthadwin/Mini-Projects/tree/main/ParallaxWebsite",
      text: "Parallax Superheroes Site",
      para: "A simple and visually engaging parallax scrolling website built with HTML and CSS.",
    },
    {
      id: "06",
      content: "/images/Weather.jpg",
      link: "https://github.com/hacketthadwin/Mini-Projects/tree/main/WEATHER_OF_DIFFERENT_CITIES",
      text: "React Weather App",
      para: "An interactive weather application for searching and managing weather information for multiple cities.",
    },
  ];

  // A color palette for the grid items
  const colors = [
    { borderColor: "#3B82F6", gradient: "linear-gradient(145deg, #3B82F6, #000)" },
    { borderColor: "#10B981", gradient: "linear-gradient(145deg, #10B981, #000)" },
    { borderColor: "#EF4444", gradient: "linear-gradient(145deg, #EF4444, #000)" },
    { borderColor: "#F59E0B", gradient: "linear-gradient(145deg, #F59E0B, #000)" },
    { borderColor: "#8B5CF6", gradient: "linear-gradient(145deg, #8B5CF6, #000)" },
    { borderColor: "#EC4899", gradient: "linear-gradient(145deg, #EC4899, #000)" },
  ];

  // Map your projects to the format required by ChromaGrid
  const items = projects.map((project, index) => ({
    image: project.content,
    title: project.text,
    subtitle: project.para, // Using 'para' as the subtitle
    handle: `Project ${project.id}`, // Using the project ID as the handle
    url: project.link,
    ...colors[index % colors.length], // Cycle through the color palette
  }));

  return (
    <MotionWrapper>
      <div className="container mx-auto px-4 py-8 mt-[12rem]">
        <h2 className="text-4xl font-bold text-center text-white mb-12">My Projects</h2>
        <div style={{ height: '600px', position: 'relative' }}>
          <ChromaGrid
            items={items}
            radius={350}       // Increased radius for better spacing
            damping={0.5}      // Adjusted damping for smoother physics
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>
      </div>
    </MotionWrapper>
  );
};

export default Projects;

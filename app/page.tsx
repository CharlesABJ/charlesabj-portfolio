"use client";
import About from "../_components/_About/About";
import Contact from "../_components/_Contact/Contact";
import Home from "../_components/_Home/Home";
import Portfolio from "../_components/_Portfolio/Portfolio";
import Recommendations from "../_components/_Recommendations/Recommendations";
import Skills from "../_components/_Skills/Skills";
import { useThemeContext } from "../_contexts/ThemeContext";

export default function App() {
  // Home
  const lightAvatar = "/images/logos/logo-light.webp";
  const darkAvatar = "/images/logos/logo-dark.webp";

  // About
  const illustrationSrc = "/images/about-image.webp";
  // const illustrationSrc2 = "/images/about-image-colored.webp";
  const illustrationSrc2 = "/images/about-image-colored.jpeg";

  // Portfolio

  // Skills

  // Contact

  const { theme } = useThemeContext();

  if (!theme) {
    return (
      <div className="loading">

      </div>
    )
  }

  return (
    <>
      <Home dataHome={{ avatarSrc: theme === "dark-mode" ? darkAvatar : lightAvatar }} />
      <About dataAbout={{ illustrationSrc: illustrationSrc, illustrationSrc2: illustrationSrc2 }} />
      <Portfolio />
      <Skills />
      <Recommendations />
      <Contact />
    </>
  );
}

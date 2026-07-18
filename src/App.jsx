import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Navbar from "./components/Navbar";
import ProfileHero from "./components/ProfileHero";
import ProjectsSection from "./components/ProjectsSection";
import ScrollRevealController from "./components/ScrollRevealController";

export default function App() {
  return (
    <>
      <ScrollRevealController />
      <Navbar />
      <ProfileHero />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}

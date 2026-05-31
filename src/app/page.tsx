import Contact from "@/components/Contact";
import GitHubRepos from "@/components/GitHubRepos";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <GitHubRepos username="naveens441" />
      <Contact />
    </>
  );
}

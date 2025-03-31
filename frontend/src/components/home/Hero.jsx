import Section from "../shared/Section";
import Container from "../shared/Container";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.jpg";

const Hero = () => {
  return (
    <Section className="h-screen relative">
      <Container className="flex-col items-center text-center h-full relative z-20 justify-center">
        <h1 className="text-4xl font-extralight">
          Sei bereit für deinen Traumjob – Practice with AI!
        </h1>
        <Link
          to="/start-interview"
          className="mt-8 px-6 py-3 font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-700 hover:from-violet-800 hover:to-blue-800 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Starte jetzt
        </Link>
      </Container>
      <div className="gradient opacity-90 absolute top-0 w-full h-full z-10"></div>
      <img
        className="absolute w-full h-full top-0 object-cover"
        src={heroImage}
        alt="Job interview"
      />
    </Section>
  );
};

export default Hero;

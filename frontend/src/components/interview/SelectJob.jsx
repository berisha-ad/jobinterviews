import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../shared/Section";
import Container from "../shared/Container";
import ChatBot from "./ChatBot";
import heroImage from "../../assets/hero.jpg";

const SelectJob = () => {
  const [job, setJob] = useState("");
  const [submittedJob, setSubmittedJob] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!job) {
      setError("Bitte wähle einen Job aus");
      return;
    }
    setSubmittedJob(job);
  };

  return (
    <Section className="h-screen flex flex-col relative justify-center">
      <Container className="relative z-20">
        {!submittedJob ? (
          <div className="rounded-2xl thisborder bg-gray-900 shadow-2xl p-8 w-4xl">
            <h1 className="text-gray-400 text-3xl">Wähle deinen Traumjob:</h1>
            <form onSubmit={handleSubmit}>
              <input
                className="rounded-xl w-96 mt-4 bg-gray-800 p-2 thisborder text-white placeholder:text-gray-600"
                type="text"
                name="job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                id="job"
                placeholder="z.B. Software Engineer, Data Scientist, etc."
              />
              <button
                type="submit"
                className="cursor-pointer ml-4 mt-8 px-4 py-2 font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-700 hover:from-violet-800 hover:to-blue-800 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Starte das Interview
              </button>
            </form>
            {error && (
              <div className="text-red-400 p-2 bg-gray-800 w-max rounded-lg mt-4">
                {error}
              </div>
            )}
          </div>
        ) : (
          <ChatBot job={job} />
        )}
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

export default SelectJob;

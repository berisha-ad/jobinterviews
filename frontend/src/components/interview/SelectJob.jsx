import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../shared/Section";
import Container from "../shared/Container";
import ChatBot from "./ChatBot";

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
    <Section className="h-screen flex flex-col justify-center">
      <Container>
        {!submittedJob ? (
          <div className="rounded-2xl bg-white p-8 w-4xl">
            <h1 className="text-gray-700 text-3xl">Wähle deinen Traumjob:</h1>
            <form onSubmit={handleSubmit}>
              <input
                className="rounded-xl w-96 mt-4 bg-gray-100 p-2 border text-black placeholder:text-gray-400"
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
    </Section>
  );
};

export default SelectJob;

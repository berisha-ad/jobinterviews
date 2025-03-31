import { useEffect, useState, useRef } from "react";
import Spinner from "../shared/Spinner";

const ChatBot = ({ job }) => {
  const [userResponse, setUserResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const startChat = async (job) => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/api/interview/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ job }),
    });
    const data = await response.json();
    setChatHistory(data.data);
    setLoading(false);
  };

  const clearChat = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/api/interview/clear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setChatHistory(data.data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userResponse) {
      setError("Bitte gib eine Antwort ein");
      return;
    }
    setError(null);
    console.log("submit");
    const response = await fetch("http://localhost:3000/api/interview/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userResponse }),
    });
    setUserResponse("");
    const data = await response.json();
    console.log(data);
    setChatHistory(data.data);
    setLoading(false);
  };

  useEffect(() => {
    startChat(job);
    console.log("useffect");
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4 w-full mb-4">
          <form onSubmit={clearChat}>
            <button
              type="submit"
              className="px-6 py-3 mb-4 font-semibold cursor-pointer text-white bg-red-600 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Neu starten
            </button>
          </form>
        </div>

        <div className="max-h-1/2 overflow-y-auto flex flex-col w-full">
          <div className="flex flex-col gap-4">
            <div className="p-4 flex flex-col gap-8 text-gray-700 rounded-lg">
              {chatHistory
                .filter((chat) => chat.role !== "system")
                .map((chat, index) => (
                  <div
                    className={`p-4 rounded-lg shadow-md flex flex-col gap-4 ${
                      chat.role === "assistant"
                        ? "bg-gradient-to-r from-violet-600 to-blue-700 text-white"
                        : "bg-white text-gray-900"
                    }`}
                    key={index}
                  >
                    <span
                      className={`font-bold ${
                        chat.role === "assistant" ? "text-left" : "text-right"
                      }`}
                    >
                      {` ${chat.role === "assistant" ? "Recruiter" : "Du"}`}
                    </span>
                    <div
                      className={`font-extralight ${
                        chat.role === "assistant" ? "text-left" : "text-right"
                      }`}
                    >
                      {chat.content}
                    </div>
                  </div>
                ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          <div className="fixed bottom-0 left-0 w-screen p-8 bg-gradient-to-r flex flex-col items-center from-violet-600 to-blue-700">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                className="p-3 rounded-2xl w-3xl h-max bg-white text-black"
                name="userResponse"
                id="userResponse"
                placeholder="Deine Antwort hier"
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
              />
              <button className="px-6 py-3 font-semibold cursor-pointer text-white bg-blue-950 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105">
                Antworten
              </button>
              {loading && <Spinner />}
            </form>

            {error && (
              <div className="text-red-600 p-2 bg-gray-800 rounded-lg mt-4">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;

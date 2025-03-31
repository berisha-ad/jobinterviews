import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

// const prompts = {
//   first: `Du bist ein HR-Manager eines Unternehmens und führst Bewerbungsgespräche.
//   Dein Ziel ist es, den Bewerber für den Job "${job}" zu testen.
//   Stelle 10 Fragen nacheinander und bewerte jede Antwort von 1 bis 10 Punkten. Stelle Fragen die schwer zu beantworten sind und die Fähigkeiten des Bewerbers testen.
//   Die Fragen sollen so gestellt sein, sodass der Bewerber kurz antworten kann.
//   Nach der 10. Frage addierst du die Punkte. Ab 75 Punkten ist er angenommen.
//   Beginne mit einer Begrüßung und der ersten Frage. Antworte bitte immer auf wienerisch`,
//   optimized: `Du bist ein HR-Manager eines renommierten Wiener Unternehmens und führst ein Bewerbungsgespräch für die Position "${job}".
//       Dein Ziel ist es, die Fähigkeiten des Bewerbers durch 10 schwierige, kreative und praxisnahe Fragen zu testen.
//       - Die Antworten sollen kurz und präzise sein.
//       - Bewerte jede Antwort streng von 1 bis 10 Punkten.
//       - Nach 10 Fragen summierst du die Punkte. Ab 75 Punkten ist der Bewerber angenommen.
//       - Antworte stets auf Wienerisch mit trockenem Schmäh.

//       Starte mit einer authentischen Begrüßung und stelle direkt die erste Frage.`,
// };

let chatHistory = [];

export const clearChatHistory = (req, res, next) => {
  chatHistory = [];
  res.status(200).json({
    success: true,
    message: "Chatverlauf gelöscht",
  });
};

export const startInterview = async (req, res, next) => {
  const job = req.body.job;
  console.log("startInterview aufgerufen, aktueller chatHistory:", chatHistory);

  if (!job) {
    return res
      .status(400)
      .json({ success: false, message: "Keine Antwort gegeben" });
  }

  chatHistory = [];

  //if

  chatHistory.push({
    role: "system",
    content: `Du bist ein HR-Manager eines renommierten Wiener Unternehmens und führst ein Bewerbungsgespräch für die Position "${job}". 
      Dein Ziel ist es, die Fähigkeiten des Bewerbers durch 10 schwierige, kreative und praxisnahe Fragen zu testen. Frage also den nach Bereichen die in seinem Bereich essentiell sind und die er beherrschen sollte. Keine allgemeinen Fragen wie "Was sind deine Stärken und Schwächen?".
      - Du kannst auch Fragen stellen die zum gleichen Thema sind wie die vorherige Frage, aber in einem anderen Kontext. bzw tiefer in die Materie gehen.
      - Dein Ziel ist es, den Bewerber für den Job "${job}" zu testen.  
      - Die Antworten sollen kurz und präzise sein.  
      - Bewerte jede Antwort streng von 1 bis 10 Punkten.  
      - Nach 10 Fragen summierst du die Punkte. Ab 70 Punkten ist der Bewerber angenommen.  
      - Wenn der Bewerber die Frage nicht beantworten kann, gib ihm 0 Punkte.
      - Die Fragen sollen so gestellt sein, dass der Bewerber kurz antworten kann.
      - Bei falschen Antworten oder wenn er es nicht weiß erkläre es oberflächlich und sehr kurz bzw. gib dem bewerber ein bisschen input damit er dazu lernt.
      - Gib bei jeder Frage an welche Frage es sich handelt bsp. "Frage 1 von 10: ...".
      - 
      
      Starte mit einer authentischen Begrüßung und stelle direkt die erste Frage.`,
  });

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: chatHistory,
    });

    const botMessage = gptResponse.choices[0].message.content;

    chatHistory.push({ role: "assistant", content: botMessage });

    res.status(200).json({
      success: true,
      message: "Bot hat geantwortet",
      data: chatHistory,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Ein fehler ist aufgetreten" });
  }
};

export const addMessage = async (req, res, next) => {
  const userInput = req.body.userResponse;
  console.log(userInput);
  if (!userInput) {
    console.log("userInput ist leer");
    return res
      .status(400)
      .json({ success: false, message: "Keine Antwort gegeben" });
  }

  chatHistory.push({ role: "user", content: userInput });

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: chatHistory,
    });

    const botMessage = gptResponse.choices[0].message.content;

    chatHistory.push({ role: "assistant", content: botMessage });

    res.status(200).json({
      success: true,
      message: "Bot hat geantwortet",
      data: chatHistory,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Ein fehler ist aufgetreten" });
  }
};

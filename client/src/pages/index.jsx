import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const AIAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Ask me anything about your project's tasks." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  // Reads whichever project you last opened on the board
  const projectId = localStorage.getItem("lastProjectId") || "";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/ai/chat", {
        message: text,
        projectId: projectId || undefined,
        history: newMessages,
      });
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err.response?.data?.message || "AI se jawab nahi mila");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-[#e8eaf0] flex flex-col p-6">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-[#6b7280] hover:text-[#e8eaf0]"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold">🤖 AI Assistant</h1>
      </div>

      {!projectId && (
        <p className="text-xs text-[#6b7280] mb-3">
          Tip: open a project board first so I can answer using your actual tasks.
        </p>
      )}

      <div className="flex-1 bg-[#111318] border border-[#1e2130] rounded-xl p-4 overflow-y-auto mb-4 max-w-3xl w-full mx-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex mb-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-[#5b6af0] text-white"
                  : "bg-[#0a0b0f] border border-[#1e2130] text-[#e8eaf0]"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-3">
            <div className="bg-[#0a0b0f] border border-[#1e2130] px-4 py-2 rounded-2xl text-sm text-[#6b7280]">
              Typing...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {error && <p className="text-red-400 text-sm max-w-3xl w-full mx-auto mb-2">{error}</p>}

      <form onSubmit={handleSend} className="max-w-3xl w-full mx-auto flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your tasks..."
          className="flex-1 bg-[#111318] border border-[#1e2130] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#5b6af0]"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#5b6af0] hover:opacity-90 disabled:opacity-50 px-5 py-3 rounded-lg text-sm font-medium"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AIAssistant;
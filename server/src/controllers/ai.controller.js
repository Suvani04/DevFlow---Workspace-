import Project from "../models/Project.js";
import Task from "../models/Task.js";
import WorkspaceMember from "../models/WorkspaceMember.js";

// POST /api/ai/chat
export const chatWithAI = async (req, res) => {
  try {
    const { message, projectId, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: "message required hai" });
    }

    let system =
      "You are DevFlow AI, a helpful assistant inside a project management tool. " +
      "Answer concisely. If the user writes in Hinglish, reply in Hinglish.";

    // Project ho toh board ka context add karo
    if (projectId) {
      const project = await Project.findById(projectId);
      if (!project) return res.status(404).json({ message: "Project nahi mila" });

      const member = await WorkspaceMember.findOne({
        workspace: project.workspace,
        user: req.user._id,
      });
      if (!member) return res.status(403).json({ message: "Access denied" });

      const tasks = await Task.find({ project: projectId })
        .select("taskKey title status priority type dueDate")
        .limit(100);

      const taskLines = tasks
        .map((t) => `${t.taskKey} | ${t.title} | ${t.status} | ${t.priority} | ${t.type}`)
        .join("\n");

      system += `\n\nCurrent project: ${project.name} (${project.key}).\nTasks (key | title | status | priority | type):\n${taskLines || "No tasks yet."}`;
    }

    // Purani baatcheet (last 10). Gemini mein assistant ka role "model" hota hai
    const past = history
      .filter((h) => ["user", "assistant"].includes(h.role) && h.content)
      .slice(-10)
      .map((h) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }],
      }));

    const model = process.env.AI_MODEL || "gemini-2.5-flash-lite";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [...past, { role: "user", parts: [{ text: message.trim() }] }],
        generationConfig: { maxOutputTokens: 1000 },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini error:", data);
      if (response.status === 429) {
        return res
          .status(429)
          .json({ message: "AI ki free limit poori ho gayi, thodi der baad try karo" });
      }
      return res
        .status(500)
        .json({ message: data.error?.message || "AI se jawab nahi mila" });
    }

    const reply =
      data.candidates?.[0]?.content?.parts
        ?.filter((p) => p.text && !p.thought)
        .map((p) => p.text)
        .join("\n") || "AI ne koi jawab nahi diya";

    res.json({ reply });
  } catch (err) {
    console.error("AI error:", err.message);
    res.status(500).json({ message: "AI error: " + err.message });
  }
};
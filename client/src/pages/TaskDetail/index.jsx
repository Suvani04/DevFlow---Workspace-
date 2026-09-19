import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const STATUSES = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "in_review", label: "In Review" },
  { value: "done", label: "Done" },
];
const PRIORITIES = ["low", "medium", "high", "urgent"];
const TYPES = ["task", "bug", "feature", "improvement"];

const inputCls =
  "w-full bg-[#0a0b0f] border border-[#1e2130] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5b6af0]";

const TaskDetail = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/tasks/${taskId}`);
        const t = data.task;
        setTask(t);
        setForm({
          title: t.title,
          description: t.description || "",
          status: t.status,
          priority: t.priority,
          type: t.type,
          dueDate: t.dueDate ? t.dueDate.slice(0, 10) : "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Task load nahi hua");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [taskId]);

  const goBack = () =>
    task?.project?._id
      ? navigate(`/projects/${task.project._id}/board`)
      : navigate("/projects");

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    setError("");
    try {
      await api.put(`/tasks/${taskId}`, {
        ...form,
        dueDate: form.dueDate || null,
      });
      setMsg("Saved ✅");
    } catch (err) {
      setError(err.response?.data?.message || "Save nahi hua");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Ye task delete kar dein?")) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      goBack();
    } catch (err) {
      setError(err.response?.data?.message || "Delete nahi hua");
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0a0b0f] text-[#6b7280] p-6">Loading...</div>;
  if (!task)
    return (
      <div className="min-h-screen bg-[#0a0b0f] text-red-400 p-6">
        {error || "Task nahi mila"}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-[#e8eaf0] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={goBack} className="text-[#6b7280] hover:text-[#e8eaf0]">
            ← Back to board
          </button>
          <span className="text-xs bg-[#5b6af0]/20 text-[#5b6af0] px-2 py-1 rounded">
            {task.taskKey}
          </span>
        </div>

        <form
          onSubmit={handleSave}
          className="bg-[#111318] border border-[#1e2130] rounded-xl p-6 grid gap-4"
        >
          <div>
            <label className="text-xs text-[#6b7280]">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputCls}
            />
          </div>

          <div>
            <label className="text-xs text-[#6b7280]">Description</label>
            <textarea
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={inputCls}
              placeholder="Task ki details likho..."
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs text-[#6b7280]">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className={inputCls}
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-[#6b7280]">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className={inputCls}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-[#6b7280]">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={inputCls}
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-[#6b7280]">Due date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className={inputCls}
              />
            </div>
          </div>

          <p className="text-xs text-[#6b7280]">
            Reporter: {task.reporter?.name || "—"}
          </p>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          {msg && <p className="text-green-400 text-sm">{msg}</p>}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleDelete}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Delete task
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-[#5b6af0] hover:opacity-90 disabled:opacity-50 px-5 py-2 rounded-lg text-sm font-medium"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetail;
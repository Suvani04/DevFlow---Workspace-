import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { fetchProjects, createProject } from "../../store/slices/projectSlice";

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: projects, loading, error } = useSelector((s) => s.projects);

  const [workspaceId, setWorkspaceId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", key: "", description: "" });
  const [formError, setFormError] = useState("");

  // Pehli workspace ko active maan rahe hain (MVP)
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/workspaces");
        console.log("WORKSPACES:", data); // shape check ke liye
        const ws = data.workspaces?.[0];
        if (ws) {
          setWorkspaceId(ws._id);
          dispatch(fetchProjects(ws._id));
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [dispatch]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError("");
    const res = await dispatch(createProject({ ...form, workspaceId }));
    if (createProject.rejected.match(res)) {
      setFormError(res.payload);
      return;
    }
    setForm({ name: "", key: "", description: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-[#e8eaf0] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-[#6b7280] hover:text-[#e8eaf0]"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Projects</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#5b6af0] hover:opacity-90 px-4 py-2 rounded-lg text-sm font-medium"
        >
          + New Project
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-[#111318] border border-[#1e2130] rounded-xl p-4 mb-6 grid gap-3 max-w-md"
        >
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Project name"
            className="bg-[#0a0b0f] border border-[#1e2130] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5b6af0]"
          />
          <input
            required
            maxLength={6}
            value={form.key}
            onChange={(e) => setForm({ ...form, key: e.target.value.toUpperCase() })}
            placeholder="Key (e.g. WEB)"
            className="bg-[#0a0b0f] border border-[#1e2130] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5b6af0]"
          />
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description (optional)"
            className="bg-[#0a0b0f] border border-[#1e2130] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5b6af0]"
          />
          {formError && <p className="text-red-400 text-sm">{formError}</p>}
          <button
            type="submit"
            className="bg-[#5b6af0] hover:opacity-90 py-2 rounded-lg text-sm font-medium"
          >
            Create Project
          </button>
        </form>
      )}

      {loading && <p className="text-[#6b7280]">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && projects.length === 0 && (
        <p className="text-[#6b7280]">Abhi koi project nahi hai. Ek naya banao!</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/projects/${p._id}/board`)}
            className="bg-[#111318] border border-[#1e2130] hover:border-[#5b6af0] rounded-xl p-4 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">{p.name}</h2>
              <span className="text-xs bg-[#5b6af0]/20 text-[#5b6af0] px-2 py-1 rounded">
                {p.key}
              </span>
            </div>
            <p className="text-sm text-[#6b7280]">
              {p.description || "No description"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
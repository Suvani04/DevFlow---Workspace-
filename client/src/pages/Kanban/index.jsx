import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  fetchTasks,
  createTask,
  updateTask,
  moveTaskLocal,
} from "../../store/slices/taskSlice";

const COLUMNS = [
  { id: "todo", title: "To Do" },
  { id: "in_progress", title: "In Progress" },
  { id: "in_review", title: "In Review" },
  { id: "done", title: "Done" },
];

const PRIORITY_COLORS = {
  low: "#6b7280",
  medium: "#5b6af0",
  high: "#f59e0b",
  urgent: "#ef4444",
};

const KanbanBoard = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: tasks, loading, error } = useSelector((s) => s.tasks);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    dispatch(fetchTasks(projectId));
  }, [dispatch, projectId]);

  useEffect(() =>{
    if (projectId) localStorage.setItem("lastProjectId", projectId);
  }, [projectId]);

  const getColumnTasks = (status) =>
    tasks.filter((t) => t.status === status).sort((a, b) => a.order - b.order);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await dispatch(createTask({ title: newTitle.trim(), projectId }));
    setNewTitle("");
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const destStatus = destination.droppableId;
    const moved = tasks.find((t) => t._id === draggableId);
    const destTasks = getColumnTasks(destStatus).filter(
      (t) => t._id !== draggableId
    );
    destTasks.splice(destination.index, 0, moved);

    destTasks.forEach((task, index) => {
      if (task._id === draggableId || task.order !== index) {
        dispatch(moveTaskLocal({ id: task._id, status: destStatus, order: index }));
        dispatch(
          updateTask({ id: task._id, updates: { status: destStatus, order: index } })
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-[#e8eaf0] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-[#6b7280] hover:text-[#e8eaf0]"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Kanban Board</h1>
        </div>

        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="New task title..."
            className="bg-[#111318] border border-[#1e2130] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5b6af0] w-64"
          />
          <button
            type="submit"
            className="bg-[#5b6af0] hover:opacity-90 px-4 py-2 rounded-lg text-sm font-medium"
          >
            + Add Task
          </button>
        </form>
      </div>

      {loading && <p className="text-[#6b7280]">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {COLUMNS.map((col) => {
            const colTasks = getColumnTasks(col.id);
            return (
              <div
                key={col.id}
                className="bg-[#111318] border border-[#1e2130] rounded-xl p-3"
              >
                <div className="flex items-center justify-between mb-3 px-1">
                  <h2 className="font-semibold text-sm">{col.title}</h2>
                  <span className="text-xs text-[#6b7280]">{colTasks.length}</span>
                </div>

                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}

                      className={`min-h-[200px] rounded-lg transition-colors ${
                        snapshot.isDraggingOver ? "bg-[#5b6af0]/10" : ""
                      }`}
                    >
                      {colTasks.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() =>{console.log("CARD CLICKED:",task); navigate(`/tasks/${task._id}`);}}
                              className={`bg-[#0a0b0f] border rounded-lg p-3 mb-2 ${
                                snapshot.isDragging
                                  ? "border-[#5b6af0]"
                                  : "border-[#1e2130]"
                              }`}
                            >
                              <p className="text-sm mb-2">{task.title}</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-[#6b7280]">{task.taskKey}</span>
                                <span
                                  style={{ color: PRIORITY_COLORS[task.priority] }}
                                >
                                  ● {task.priority}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
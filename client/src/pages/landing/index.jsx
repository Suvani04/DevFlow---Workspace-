import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-[#e8eaf0]">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-15 bg-[#0a0b0f]/90 backdrop-blur-md border-b border-[#1e2130]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5b6af0] to-[#7c3aed] flex items-center justify-center text-white text-sm font-bold">
            DF
          </div>
          <span className="font-bold text-lg">DevFlow</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 rounded-lg border border-[#1e2130] text-sm font-medium hover:border-[#5b6af0] hover:bg-[#111318] transition-all"
          >
            Sign in
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-4 py-2 rounded-lg bg-[#5b6af0] hover:bg-[#4a58e0] text-white text-sm font-semibold transition-all"
          >
            Get started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center text-center pt-36 pb-20 px-6 relative">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#5b6af0]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#5b6af0]/25 bg-[#5b6af0]/07 text-[#a5b4fc] text-xs font-mono mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          AI-powered developer workspace
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-5 max-w-2xl">
          Build together,{' '}
          <span className="bg-gradient-to-r from-[#5b6af0] to-[#a78bfa] bg-clip-text text-transparent">
            ship faster
          </span>
        </h1>

        <p className="text-[#6b7280] text-lg max-w-md leading-relaxed mb-10">
          Projects, kanban, real-time chat, and AI — everything your dev team needs in one clean workspace.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mb-16">
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-3 rounded-lg bg-[#5b6af0] hover:bg-[#4a58e0] text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-[#5b6af0]/25 hover:-translate-y-0.5"
          >
            Start free →
          </button>
          <button className="px-6 py-3 rounded-lg border border-[#1e2130] bg-[#111318] text-sm font-medium hover:border-[#5b6af0] transition-all">
            See demo
          </button>
        </div>

        {/* Dashboard Preview */}
        <div className="w-full max-w-4xl rounded-xl border border-[#1e2130] overflow-hidden shadow-2xl">
          {/* Browser Bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#16181f] border-b border-[#1e2130]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
            <span className="w-3 h-3 rounded-full bg-[#28ca41]"></span>
            <span className="text-[#6b7280] text-xs font-mono ml-2">devflow — Sprint 3 · Backend API</span>
          </div>

          {/* Preview Body */}
          <div className="flex h-80 bg-[#111318]">
            {/* Sidebar */}
            <div className="w-48 border-r border-[#1e2130] p-3 flex-shrink-0">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#5b6af0]/10 mb-3">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#5b6af0] to-[#7c3aed] flex items-center justify-center text-white text-[10px] font-bold">AC</div>
                <span className="text-xs font-semibold">Acme Corp</span>
              </div>
              <div className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-widest px-2 mb-1 font-mono">Projects</div>
              {['📋 Backend API', '🎨 Design System', '📱 Mobile App'].map((item, i) => (
                <div key={i} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs cursor-pointer mb-0.5 ${i === 0 ? 'bg-[#5b6af0]/10 text-[#e8eaf0]' : 'text-[#6b7280]'}`}>
                  {item}
                </div>
              ))}
              <div className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-widest px-2 mb-1 mt-3 font-mono">Workspace</div>
              {['💬 Chat', '🤖 AI Assistant', '📊 Analytics'].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs text-[#6b7280] cursor-pointer mb-0.5">
                  {item}
                </div>
              ))}
            </div>

            {/* Main */}
            <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold">Kanban Board</h4>
                <span className="text-[10px] font-mono text-[#a5b4fc] bg-[#5b6af0]/10 px-2 py-1 rounded-full">Sprint 3 · 12/18 done</span>
              </div>

              {/* Kanban */}
              <div className="grid grid-cols-4 gap-2 h-56">
                {[
                  {
                    title: 'To Do', count: 4,
                    tasks: [
                      { title: 'Setup Redis', tag: 'Critical', color: '#f87171' },
                      { title: 'Write unit tests', tag: 'Low', color: '#4ade80' }
                    ]
                  },
                  {
                    title: 'In Progress', count: 2,
                    tasks: [
                      { title: 'Build chat module', tag: 'High', color: '#f87171', highlight: true },
                      { title: 'RBAC middleware', tag: 'Medium', color: '#fbbf24' }
                    ]
                  },
                  {
                    title: 'Review', count: 2,
                    tasks: [
                      { title: 'JWT refresh token', tag: 'Medium', color: '#fbbf24' }
                    ]
                  },
                  {
                    title: 'Done', count: 12,
                    tasks: [
                      { title: 'Auth API complete', tag: 'Done', color: '#4ade80', faded: true },
                      { title: 'MongoDB schema', tag: 'Done', color: '#4ade80', faded: true }
                    ]
                  }
                ].map((col, i) => (
                  <div key={i} className="bg-[#0a0b0f] rounded-lg p-2 border border-[#1e2130]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-[#6b7280]">{col.title}</span>
                      <span className="text-[9px] font-mono text-[#6b7280] bg-[#1e2130] px-1.5 py-0.5 rounded-full">{col.count}</span>
                    </div>
                    {col.tasks.map((task, j) => (
                      <div key={j} className={`bg-[#16181f] border rounded-md p-2 mb-1.5 ${task.highlight ? 'border-[#5b6af0]/40' : 'border-[#1e2130]'} ${task.faded ? 'opacity-50' : ''}`}>
                        <p className="text-[10px] font-medium mb-1.5 leading-tight">{task.title}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full" style={{ background: `${task.color}20`, color: task.color }}>
                            {task.tag}
                          </span>
                          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#5b6af0] to-[#7c3aed] flex items-center justify-center text-white text-[7px] font-bold">R</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: '📋', name: 'Kanban + Sprints', desc: 'Visual boards, drag-and-drop tasks, sprint planning and burndown charts.' },
            { icon: '💬', name: 'Real-time Chat', desc: 'Team channels, direct messages, and file sharing. No separate Slack needed.' },
            { icon: '🤖', name: 'AI Assistant', desc: 'Generate tasks, write standups, review code, and score project health.' },
          ].map((f, i) => (
            <div key={i} className="bg-[#111318] border border-[#1e2130] rounded-xl p-5 hover:border-[#5b6af0] transition-all">
              <div className="text-2xl mb-3">{f.icon}</div>
              <div className="text-sm font-bold mb-2">{f.name}</div>
              <div className="text-xs text-[#6b7280] leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-6 border-t border-[#1e2130]">
        <h2 className="text-3xl font-extrabold tracking-tight mb-3">Ready to ship faster?</h2>
        <p className="text-[#6b7280] text-sm mb-8">Free to start. No credit card needed.</p>
        <button
          onClick={() => navigate('/register')}
          className="px-8 py-3 bg-[#5b6af0] hover:bg-[#4a58e0] text-white text-sm font-semibold rounded-lg transition-all"
        >
          Create your workspace →
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1e2130] px-10 py-5 flex justify-between items-center">
        <p className="text-xs text-[#6b7280] font-mono">© 2025 DevFlow Workspace</p>
        <p className="text-xs text-[#6b7280] font-mono">Made for developers 🚀</p>
      </footer>
    </div>
  )
}

export default Landing
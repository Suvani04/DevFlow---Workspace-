import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/slices/authSlice'

const Dashboard = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#0a0b0f] flex">

      {/* Sidebar */}
      <div className="w-56 bg-[#111318] border-r border-[#1e2130] flex flex-col p-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#5b6af0] to-[#7c3aed] flex items-center justify-center text-white text-xs font-bold">
            DF
          </div>
          <span className="text-[#e8eaf0] font-bold text-sm">DevFlow</span>
        </div>

        {/* Nav Items */}
        <div className="flex flex-col gap-1">
          {[
            { icon: '🏠', label: 'Dashboard' },
            { icon: '📋', label: 'Projects' },
            { icon: '💬', label: 'Chat' },
            { icon: '🔔', label: 'Notifications' },
            { icon: '🤖', label: 'AI Assistant' },
            { icon: '📊', label: 'Analytics' },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-all
                ${i === 0
                  ? 'bg-[#5b6af0]/10 text-[#e8eaf0]'
                  : 'text-[#6b7280] hover:bg-[#1e2130] hover:text-[#e8eaf0]'
                }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* User at bottom */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 px-3 py-2 border-t border-[#1e2130] pt-4">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5b6af0] to-[#7c3aed] flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#e8eaf0] text-xs font-medium truncate">{user?.name}</p>
              <p className="text-[#6b7280] text-[10px] truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-2 px-3 py-2 text-xs text-[#6b7280] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-left"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#e8eaf0] text-2xl font-extrabold mb-1">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-[#6b7280] text-sm">
            Here's what's happening in your workspace.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Projects', value: '0', icon: '📁' },
            { label: 'Active Tasks', value: '0', icon: '✅' },
            { label: 'Team Members', value: '1', icon: '👥' },
            { label: 'AI Actions', value: '0', icon: '🤖' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#111318] border border-[#1e2130] rounded-xl p-4">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-[#e8eaf0] text-2xl font-extrabold mb-1">{stat.value}</div>
              <div className="text-[#6b7280] text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Create Workspace Card */}
        <div className="bg-[#111318] border border-[#1e2130] rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-[#e8eaf0] text-lg font-bold mb-2">
            Create your first workspace
          </h2>
          <p className="text-[#6b7280] text-sm mb-6">
            Invite your team, create projects, and start shipping faster.
          </p>
          <button className="px-6 py-2.5 bg-[#5b6af0] hover:bg-[#4a58e0] text-white text-sm font-semibold rounded-lg transition-all">
            Create Workspace →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
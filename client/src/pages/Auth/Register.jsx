import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginSuccess } from '../../store/slices/authSlice'
import api from '../../services/api'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const res = await api.post('/auth/register', formData)
      dispatch(loginSuccess(res.data))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0b0f] flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-[#111318] border-r border-[#1e2130] flex-col justify-between p-12">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5b6af0] to-[#7c3aed] flex items-center justify-center text-white text-sm font-bold">
            DF
          </div>
          <span className="text-[#e8eaf0] font-bold text-lg">DevFlow Workspace</span>
        </div>

        {/* Middle Content */}
        <div>
          <h2 className="text-[#e8eaf0] text-2xl font-extrabold mb-3">
            One workspace for your whole team
          </h2>
          <p className="text-[#6b7280] text-sm leading-relaxed mb-8">
            Tasks, chat, and AI — built for dev teams who want to focus on building, not managing tools.
          </p>

          {/* Features */}
          <div className="flex flex-col gap-4">
            {[
              { icon: '📋', title: 'Kanban + Sprints', desc: 'Visual boards with drag-drop tasks' },
              { icon: '💬', title: 'Real-time chat', desc: 'Channels, DMs — no Slack needed' },
              { icon: '🤖', title: 'AI workflows', desc: 'Auto-generate tasks, standups & reviews' },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#5b6af0]/10 flex items-center justify-center flex-shrink-0 text-base">
                  {f.icon}
                </div>
                <div>
                  <div className="text-[#e8eaf0] text-sm font-semibold mb-0.5">{f.title}</div>
                  <div className="text-[#6b7280] text-xs">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div>
          <blockquote className="text-[#6b7280] text-sm italic leading-relaxed">
            "Finally a tool that doesn't need 3 other tools to work alongside it."
          </blockquote>
          <cite className="text-[#5b6af0] text-xs font-mono not-italic block mt-2">
            — Priya M., Tech Lead @ CRED
          </cite>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">

          {/* Mobile Logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5b6af0] to-[#7c3aed] flex items-center justify-center text-white text-sm font-bold">
              DF
            </div>
            <span className="text-[#e8eaf0] font-bold text-lg">DevFlow</span>
          </div>

          <h1 className="text-[#e8eaf0] text-2xl font-extrabold mb-1">
            Create your workspace
          </h1>
          <p className="text-[#6b7280] text-sm mb-7">
            Free forever · No credit card needed
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm mb-5">
              {error}
            </div>
          )}

          {/* Google Button */}
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#1e2130] bg-[#111318] text-[#e8eaf0] text-sm font-medium hover:border-[#5b6af0] transition-all mb-5">
            <svg width="16" height="16" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#1e2130]"></div>
            <span className="text-[#6b7280] text-xs">or</span>
            <div className="flex-1 h-px bg-[#1e2130]"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-[#e8eaf0] mb-1.5">
                Full name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 rounded-lg border border-[#1e2130] bg-[#111318] text-[#e8eaf0] text-sm placeholder-[#6b7280] outline-none focus:border-[#5b6af0] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#e8eaf0] mb-1.5">
                Work email
              </label>
              <input
                type="email"
                name="email"
                placeholder="rahul@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 rounded-lg border border-[#1e2130] bg-[#111318] text-[#e8eaf0] text-sm placeholder-[#6b7280] outline-none focus:border-[#5b6af0] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#e8eaf0] mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 rounded-lg border border-[#1e2130] bg-[#111318] text-[#e8eaf0] text-sm placeholder-[#6b7280] outline-none focus:border-[#5b6af0] transition-all"
              />
              <p className="text-[#6b7280] text-[10px] font-mono mt-1">
                // Letters + numbers recommended
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-[#5b6af0] hover:bg-[#4a58e0] text-white text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {isLoading ? 'Creating account...' : 'Create account →'}
            </button>
          </form>

          <p className="text-center text-[#6b7280] text-xs mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#5b6af0] font-medium hover:underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register
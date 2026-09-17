import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const steps = ['Create Workspace', 'Invite Team', 'All Done!']

const Onboarding = () => {
  const [step, setStep] = useState(0)
  const [workspaceName, setWorkspaceName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [workspace, setWorkspace] = useState(null)
  const navigate = useNavigate()

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) {
      setError('Please enter a workspace name')
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const res = await api.post('/workspaces', {
        name: workspaceName
      })
      setWorkspace(res.data.workspace)
      setStep(1)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create workspace')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0b0f] flex flex-col items-center justify-center px-6">

      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5b6af0] to-[#7c3aed] flex items-center justify-center text-white text-sm font-bold">
          DF
        </div>
        <span className="text-[#e8eaf0] font-bold text-lg">DevFlow</span>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-3 mb-10">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${i < step ? 'bg-green-500 text-white' :
                  i === step ? 'bg-[#5b6af0] text-white' :
                  'bg-[#1e2130] text-[#6b7280]'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block
                ${i === step ? 'text-[#e8eaf0]' : 'text-[#6b7280]'}`}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-px ${i < step ? 'bg-green-500' : 'bg-[#1e2130]'}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="bg-[#111318] border border-[#1e2130] rounded-2xl p-8 w-full max-w-md">

        {/* Step 0 — Create Workspace */}
        {step === 0 && (
          <div>
            <div className="text-3xl mb-4">🏢</div>
            <h2 className="text-[#e8eaf0] text-xl font-extrabold mb-2">
              Name your workspace
            </h2>
            <p className="text-[#6b7280] text-sm mb-6">
              This is your team's home in DevFlow.
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-xs font-medium text-[#e8eaf0] mb-2">
                Workspace name
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Corp, My Startup..."
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateWorkspace()}
                className="w-full px-3 py-2.5 rounded-lg border border-[#1e2130] bg-[#16181f] text-[#e8eaf0] text-sm placeholder-[#6b7280] outline-none focus:border-[#5b6af0] transition-all"
              />
              <p className="text-[#6b7280] text-[10px] font-mono mt-1.5">
                // Use your company or project name
              </p>
            </div>

            <button
              onClick={handleCreateWorkspace}
              disabled={isLoading}
              className="w-full py-3 bg-[#5b6af0] hover:bg-[#4a58e0] text-white text-sm font-semibold rounded-lg transition-all disabled:opacity-60"
            >
              {isLoading ? 'Creating...' : 'Create Workspace →'}
            </button>
          </div>
        )}

        {/* Step 1 — Invite Team */}
        {step === 1 && (
          <div>
            <div className="text-3xl mb-4">👥</div>
            <h2 className="text-[#e8eaf0] text-xl font-extrabold mb-2">
              Invite your team
            </h2>
            <p className="text-[#6b7280] text-sm mb-6">
              Share invite code with teammates. Skip for now if you want!
            </p>

            {/* Invite Code Box */}
            {workspace && (
              <div className="bg-[#16181f] border border-[#1e2130] rounded-lg p-4 mb-6">
                <p className="text-[#6b7280] text-xs mb-2 font-mono">// Share this invite code</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#5b6af0] font-mono font-bold text-lg tracking-widest">
                    {workspace.inviteCode}
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(workspace.inviteCode)}
                    className="text-xs text-[#6b7280] hover:text-[#e8eaf0] border border-[#1e2130] px-3 py-1 rounded-lg transition-all"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-[#5b6af0] hover:bg-[#4a58e0] text-white text-sm font-semibold rounded-lg transition-all mb-3"
            >
              Continue →
            </button>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 border border-[#1e2130] text-[#6b7280] hover:text-[#e8eaf0] hover:border-[#5b6af0] text-sm font-medium rounded-lg transition-all"
            >
              Skip for now
            </button>
          </div>
        )}

        {/* Step 2 — Done */}
        {step === 2 && (
          <div className="text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-[#e8eaf0] text-xl font-extrabold mb-2">
              You're all set!
            </h2>
            <p className="text-[#6b7280] text-sm mb-8">
              Your workspace <span className="text-[#5b6af0] font-semibold">"{workspaceName}"</span> is ready!
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 bg-[#5b6af0] hover:bg-[#4a58e0] text-white text-sm font-semibold rounded-lg transition-all"
            >
              Go to Dashboard →
            </button>
          </div>
        )}
      </div>

      <p className="text-[#6b7280] text-xs mt-6 font-mono">
        // Step {step + 1} of {steps.length}
      </p>
    </div>
  )
}

export default Onboarding
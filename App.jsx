import { useState } from 'react'
import ProjectDashboard from './components/ProjectDashboard'
import ProjectWizard from './components/ProjectWizard'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('dashboard') // 'dashboard' or 'wizard'

  const showDashboard = () => setCurrentView('dashboard')
  const showWizard = () => setCurrentView('wizard')

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'dashboard' ? (
        <ProjectDashboard onCreateProject={showWizard} />
      ) : (
        <div>
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-6xl mx-auto px-6 py-4">
              <button
                onClick={showDashboard}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
          <ProjectWizard />
        </div>
      )}
    </div>
  )
}

export default App

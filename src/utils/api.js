import { mockUsers, mockProjects, mockTasks, mockMeetings } from '../data/mockData.js'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Mock API functions
export const api = {
  // Users
  getUsers: async () => {
    await delay(500)
    return mockUsers
  },

  // Projects
  getProjects: async () => {
    await delay(800)
    return mockProjects
  },

  createProject: async (projectData) => {
    await delay(1000)
    const newProject = {
      id: mockProjects.length + 1,
      ...projectData,
      status: 'Setup',
      created_at: new Date().toISOString(),
    }
    mockProjects.push(newProject)
    return newProject
  },

  updateProject: async (id, projectData) => {
    await delay(600)
    const index = mockProjects.findIndex(p => p.id === id)
    if (index !== -1) {
      mockProjects[index] = { ...mockProjects[index], ...projectData }
      return mockProjects[index]
    }
    throw new Error('Project not found')
  },

  deleteProject: async (id) => {
    await delay(400)
    const index = mockProjects.findIndex(p => p.id === id)
    if (index !== -1) {
      mockProjects.splice(index, 1)
      return { success: true }
    }
    throw new Error('Project not found')
  },

  // Tasks
  getTasks: async (projectId) => {
    await delay(500)
    return mockTasks.filter(task => task.project_id === projectId)
  },

  createTask: async (taskData) => {
    await delay(600)
    const newTask = {
      id: mockTasks.length + 1,
      ...taskData,
      status: 'To Do',
      created_date: new Date().toISOString(),
    }
    mockTasks.push(newTask)
    return newTask
  },

  updateTask: async (id, taskData) => {
    await delay(400)
    const index = mockTasks.findIndex(t => t.id === id)
    if (index !== -1) {
      mockTasks[index] = { ...mockTasks[index], ...taskData }
      return mockTasks[index]
    }
    throw new Error('Task not found')
  },

  // Meetings
  getMeetings: async (projectId) => {
    await delay(400)
    return mockMeetings.filter(meeting => meeting.project_id === projectId)
  },

  createMeeting: async (meetingData) => {
    await delay(500)
    const newMeeting = {
      id: mockMeetings.length + 1,
      ...meetingData,
      created_at: new Date().toISOString(),
    }
    mockMeetings.push(newMeeting)
    return newMeeting
  },

  // Analytics
  getProjectAnalytics: async (projectId) => {
    await delay(600)
    const project = mockProjects.find(p => p.id === projectId)
    const tasks = mockTasks.filter(t => t.project_id === projectId)
    
    return {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'Completed').length,
      inProgressTasks: tasks.filter(t => t.status === 'In Progress').length,
      todoTasks: tasks.filter(t => t.status === 'To Do').length,
      teamSize: project?.team_members?.length || 0,
      budgetUsed: project?.budget ? Math.floor(project.budget * 0.3) : 0,
      budgetTotal: project?.budget || 0,
      progressPercentage: Math.floor((tasks.filter(t => t.status === 'Completed').length / tasks.length) * 100) || 0,
    }
  },

  // Dashboard stats
  getDashboardStats: async () => {
    await delay(800)
    return {
      totalProjects: mockProjects.length,
      activeProjects: mockProjects.filter(p => p.status === 'Active').length,
      completedProjects: mockProjects.filter(p => p.status === 'Completed').length,
      totalTasks: mockTasks.length,
      completedTasks: mockTasks.filter(t => t.status === 'Completed').length,
      totalTeamMembers: mockUsers.length,
      upcomingMeetings: mockMeetings.filter(m => new Date(m.scheduled_date) > new Date()).length,
    }
  }
}

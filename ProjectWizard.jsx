import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'

const STEPS = [
  { id: 'details', title: 'Project Details', description: 'Basic project information' },
  { id: 'team', title: 'Team Members', description: 'Select team members and roles' },
  { id: 'meetings', title: 'Meeting Schedule', description: 'Configure project meetings' },
  { id: 'tools', title: 'Tool Configuration', description: 'Configure external tools' },
  { id: 'review', title: 'Review & Submit', description: 'Review and submit project setup' }
]

const PROJECT_TYPES = ['Software', 'Core', 'Service Management']
const ROLES = ['Project Manager', 'Developer', 'QA Engineer', 'Designer', 'DevOps Engineer', 'Business Analyst']
const FREQUENCIES = ['Weekly', 'Bi-weekly', 'Monthly']
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const CURRENCIES = ['USD', 'EUR', 'CHF', 'GBP']

export default function ProjectWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({
    // Project Details
    name: '',
    key: '',
    project_type: '',
    project_lead_id: '',
    description: '',
    start_date: null,
    end_date: null,
    budget: '',
    currency: 'USD',
    
    // Team Members
    team_members: [],
    
    // Meeting Schedule
    steering_meeting_enabled: false,
    steering_meeting_frequency: '',
    steering_meeting_day: '',
    steering_meeting_time: '',
    pm_meeting_enabled: false,
    pm_meeting_frequency: '',
    pm_meeting_day: '',
    pm_meeting_time: '',
    
    // Tool Configuration
    jira_instance_url: '',
    jira_api_token: '',
    confluence_instance_url: '',
    confluence_api_token: '',
    productive_organization_id: '',
    productive_api_token: ''
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateProjectKey = (name) => {
    return name.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 10)
  }

  const handleNameChange = (value) => {
    updateFormData('name', value)
    if (!formData.key || formData.key === generateProjectKey(formData.name)) {
      updateFormData('key', generateProjectKey(value))
    }
  }

  const addTeamMember = (userId, role) => {
    const newMember = { user_id: parseInt(userId), role }
    updateFormData('team_members', [...formData.team_members, newMember])
  }

  const removeTeamMember = (index) => {
    const updatedMembers = formData.team_members.filter((_, i) => i !== index)
    updateFormData('team_members', updatedMembers)
  }

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const submitProject = async () => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          start_date: formData.start_date?.toISOString().split('T')[0],
          end_date: formData.end_date?.toISOString().split('T')[0],
          budget: formData.budget ? parseFloat(formData.budget) : null
        }),
      })
      
      if (response.ok) {
        const project = await response.json()
        alert('Project created successfully!')
        // Reset form or redirect
        setFormData({
          name: '',
          key: '',
          project_type: '',
          project_lead_id: '',
          description: '',
          start_date: null,
          end_date: null,
          budget: '',
          currency: 'USD',
          team_members: [],
          steering_meeting_enabled: false,
          steering_meeting_frequency: '',
          steering_meeting_day: '',
          steering_meeting_time: '',
          pm_meeting_enabled: false,
          pm_meeting_frequency: '',
          pm_meeting_day: '',
          pm_meeting_time: '',
          jira_instance_url: '',
          jira_api_token: '',
          confluence_instance_url: '',
          confluence_api_token: '',
          productive_organization_id: '',
          productive_api_token: ''
        })
        setCurrentStep(0)
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error creating project:', error)
      alert('Error creating project')
    }
  }

  const renderStepContent = () => {
    switch (STEPS[currentStep].id) {
      case 'details':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            
            <div>
              <Label htmlFor="key">Project Key *</Label>
              <Input
                id="key"
                value={formData.key}
                onChange={(e) => updateFormData('key', e.target.value)}
                placeholder="PROJECT_KEY"
              />
            </div>
            
            <div>
              <Label htmlFor="project_type">Project Type *</Label>
              <Select value={formData.project_type} onValueChange={(value) => updateFormData('project_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="project_lead">Project Lead *</Label>
              <Select value={formData.project_lead_id} onValueChange={(value) => updateFormData('project_lead_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project lead" />
                </SelectTrigger>
                <SelectContent>
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.id.toString()}>{user.username}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                placeholder="Project description"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.start_date ? format(formData.start_date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.start_date}
                      onSelect={(date) => updateFormData('start_date', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.end_date ? format(formData.end_date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.end_date}
                      onSelect={(date) => updateFormData('end_date', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => updateFormData('budget', e.target.value)}
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => updateFormData('currency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map(currency => (
                      <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )
      
      case 'team':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Add Team Members</h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Select onValueChange={(userId) => {
                  const selectedUser = document.getElementById('member-role').value
                  if (selectedUser && userId) {
                    addTeamMember(userId, selectedUser)
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.filter(user => !formData.team_members.some(member => member.user_id === user.id)).map(user => (
                      <SelectItem key={user.id} value={user.id.toString()}>{user.username}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger id="member-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Current Team Members</h3>
              <div className="space-y-2 mt-4">
                {formData.team_members.map((member, index) => {
                  const user = users.find(u => u.id === member.user_id)
                  return (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span>{user?.username} - {member.role}</span>
                      <Button variant="destructive" size="sm" onClick={() => removeTeamMember(index)}>
                        Remove
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      
      case 'meetings':
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="steering_meeting"
                  checked={formData.steering_meeting_enabled}
                  onCheckedChange={(checked) => updateFormData('steering_meeting_enabled', checked)}
                />
                <Label htmlFor="steering_meeting">Enable Steering Meetings</Label>
              </div>
              
              {formData.steering_meeting_enabled && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label>Frequency</Label>
                    <Select value={formData.steering_meeting_frequency} onValueChange={(value) => updateFormData('steering_meeting_frequency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {FREQUENCIES.map(freq => (
                          <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Day</Label>
                    <Select value={formData.steering_meeting_day} onValueChange={(value) => updateFormData('steering_meeting_day', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {DAYS.map(day => (
                          <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={formData.steering_meeting_time}
                      onChange={(e) => updateFormData('steering_meeting_time', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pm_meeting"
                  checked={formData.pm_meeting_enabled}
                  onCheckedChange={(checked) => updateFormData('pm_meeting_enabled', checked)}
                />
                <Label htmlFor="pm_meeting">Enable PM Alignment Meetings</Label>
              </div>
              
              {formData.pm_meeting_enabled && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label>Frequency</Label>
                    <Select value={formData.pm_meeting_frequency} onValueChange={(value) => updateFormData('pm_meeting_frequency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {FREQUENCIES.filter(f => f !== 'Monthly').map(freq => (
                          <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Day</Label>
                    <Select value={formData.pm_meeting_day} onValueChange={(value) => updateFormData('pm_meeting_day', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {DAYS.map(day => (
                          <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={formData.pm_meeting_time}
                      onChange={(e) => updateFormData('pm_meeting_time', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      
      case 'tools':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Jira Configuration</h3>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                  <Label>Instance URL</Label>
                  <Input
                    value={formData.jira_instance_url}
                    onChange={(e) => updateFormData('jira_instance_url', e.target.value)}
                    placeholder="https://your-domain.atlassian.net"
                  />
                </div>
                <div>
                  <Label>API Token</Label>
                  <Input
                    type="password"
                    value={formData.jira_api_token}
                    onChange={(e) => updateFormData('jira_api_token', e.target.value)}
                    placeholder="Your Jira API token"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Confluence Configuration</h3>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                  <Label>Instance URL</Label>
                  <Input
                    value={formData.confluence_instance_url}
                    onChange={(e) => updateFormData('confluence_instance_url', e.target.value)}
                    placeholder="https://your-domain.atlassian.net/wiki"
                  />
                </div>
                <div>
                  <Label>API Token</Label>
                  <Input
                    type="password"
                    value={formData.confluence_api_token}
                    onChange={(e) => updateFormData('confluence_api_token', e.target.value)}
                    placeholder="Your Confluence API token"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Productive Configuration</h3>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                  <Label>Organization ID</Label>
                  <Input
                    value={formData.productive_organization_id}
                    onChange={(e) => updateFormData('productive_organization_id', e.target.value)}
                    placeholder="Your Productive organization ID"
                  />
                </div>
                <div>
                  <Label>API Token</Label>
                  <Input
                    type="password"
                    value={formData.productive_api_token}
                    onChange={(e) => updateFormData('productive_api_token', e.target.value)}
                    placeholder="Your Productive API token"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'review':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Review Project Configuration</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Project Name:</strong> {formData.name}
              </div>
              <div>
                <strong>Project Key:</strong> {formData.key}
              </div>
              <div>
                <strong>Project Type:</strong> {formData.project_type}
              </div>
              <div>
                <strong>Project Lead:</strong> {users.find(u => u.id.toString() === formData.project_lead_id)?.username}
              </div>
              <div>
                <strong>Start Date:</strong> {formData.start_date ? format(formData.start_date, "PPP") : 'Not set'}
              </div>
              <div>
                <strong>End Date:</strong> {formData.end_date ? format(formData.end_date, "PPP") : 'Not set'}
              </div>
              <div>
                <strong>Budget:</strong> {formData.budget ? `${formData.budget} ${formData.currency}` : 'Not set'}
              </div>
            </div>
            
            <div>
              <strong>Team Members:</strong>
              <ul className="list-disc list-inside mt-2">
                {formData.team_members.map((member, index) => {
                  const user = users.find(u => u.id === member.user_id)
                  return (
                    <li key={index}>{user?.username} - {member.role}</li>
                  )
                })}
              </ul>
            </div>
            
            <div>
              <strong>Meetings:</strong>
              <ul className="list-disc list-inside mt-2">
                {formData.steering_meeting_enabled && (
                  <li>Steering Meeting: {formData.steering_meeting_frequency} on {formData.steering_meeting_day} at {formData.steering_meeting_time}</li>
                )}
                {formData.pm_meeting_enabled && (
                  <li>PM Alignment Meeting: {formData.pm_meeting_frequency} on {formData.pm_meeting_day} at {formData.pm_meeting_time}</li>
                )}
              </ul>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{STEPS[currentStep].title}</CardTitle>
          <CardDescription>{STEPS[currentStep].description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-8">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Step content */}
          {renderStepContent()}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            {currentStep === STEPS.length - 1 ? (
              <Button onClick={submitProject}>
                Create Project
              </Button>
            ) : (
              <Button onClick={nextStep}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


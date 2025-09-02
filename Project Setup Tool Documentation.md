# Project Setup Tool Documentation

## Overview

The Project Setup Tool is a web-based application designed to automate the process of setting up and tracking projects across multiple tools. It provides a centralized interface for project managers to create and manage projects, allocate resources, schedule meetings, and track project status across Productive, Jira, Confluence, and Microsoft Outlook.

## System Architecture

The application follows a client-server architecture with the following components:

### Frontend
- Built with React.js
- Uses shadcn/ui components for a modern, responsive UI
- Implements a multi-step wizard for project setup
- Provides a dashboard for project tracking

### Backend
- Built with Flask (Python)
- RESTful API design
- SQLite database for data storage
- CORS enabled for cross-origin requests

### Database Schema
- **Users**: Stores user information
- **Projects**: Stores project details
- **ProjectMembers**: Manages team member assignments
- **APICredentials**: Securely stores API credentials for external tools

## Features

### Project Setup Wizard

The Project Setup Wizard guides users through the process of setting up a new project with the following steps:

1. **Project Details**
   - Project Name
   - Project Key (auto-generated)
   - Project Type (Software, Core, Service Management)
   - Project Lead
   - Description
   - Start/End Dates
   - Budget and Currency

2. **Team Members**
   - Add team members with specific roles
   - Remove team members

3. **Meeting Schedule**
   - Configure Steering Meetings (frequency, day, time)
   - Configure PM Alignment Meetings (frequency, day, time)

4. **Tool Configuration**
   - Jira Configuration
   - Confluence Configuration
   - Productive Configuration

5. **Review & Submit**
   - Review all project details
   - Submit for creation

### Project Dashboard

The Project Dashboard provides an overview of all projects with the following features:

- Project cards with key information
- Status indicators
- Quick access to project details
- Create new project button

### External Tool Integration

The application integrates with the following external tools:

- **Productive**: For resource allocation and budget tracking
- **Jira**: For project and task management
- **Confluence**: For documentation and knowledge sharing
- **Microsoft Outlook**: For meeting scheduling

## Installation and Setup

### Prerequisites
- Node.js 18+ for frontend
- Python 3.11+ for backend
- SQLite for database

### Backend Setup
1. Clone the repository
2. Navigate to the backend directory
```bash
cd project-setup-backend
```
3. Create and activate a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
4. Install dependencies
```bash
pip install -r requirements.txt
```
5. Run the application
```bash
python src/main.py
```

### Frontend Setup
1. Navigate to the frontend directory
```bash
cd project-setup-frontend
```
2. Install dependencies
```bash
pnpm install
```
3. Run the development server
```bash
pnpm run dev
```

## API Documentation

### User Endpoints

#### GET /api/users
Returns a list of all users.

#### POST /api/users
Creates a new user.

Request body:
```json
{
  "username": "john_doe",
  "email": "john.doe@example.com"
}
```

#### GET /api/users/{id}
Returns a specific user by ID.

### Project Endpoints

#### GET /api/projects
Returns a list of all projects.

#### POST /api/projects
Creates a new project.

Request body:
```json
{
  "name": "Demo Project",
  "key": "DEMOPROJ",
  "project_type": "Software",
  "project_lead_id": 1,
  "description": "This is a demo project",
  "start_date": "2025-09-02",
  "end_date": "2025-12-31",
  "budget": 50000,
  "currency": "USD",
  "team_members": [
    {
      "user_id": 2,
      "role": "Developer"
    },
    {
      "user_id": 3,
      "role": "QA Engineer"
    }
  ],
  "steering_meeting_enabled": true,
  "steering_meeting_frequency": "Bi-weekly",
  "steering_meeting_day": "Monday",
  "steering_meeting_time": "10:00",
  "pm_meeting_enabled": true,
  "pm_meeting_frequency": "Weekly",
  "pm_meeting_day": "Friday",
  "pm_meeting_time": "14:00"
}
```

#### GET /api/projects/{id}
Returns a specific project by ID.

#### POST /api/projects/{id}/setup
Initiates the setup process for a project in external tools.

### API Credentials Endpoints

#### POST /api/api-credentials
Saves API credentials for a user.

Request body:
```json
{
  "user_id": 1,
  "service": "jira",
  "instance_url": "https://your-domain.atlassian.net",
  "api_token": "your-api-token"
}
```

## User Guide

### Creating a New Project

1. Log in to the application
2. Click on the "New Project" button on the dashboard
3. Fill in the project details in the first step of the wizard
4. Click "Next" to proceed to the team members step
5. Add team members and assign roles
6. Click "Next" to proceed to the meeting schedule step
7. Configure steering and PM alignment meetings
8. Click "Next" to proceed to the tool configuration step
9. Enter API credentials for external tools
10. Click "Next" to review the project details
11. Click "Create Project" to finalize the project setup

### Tracking Project Status

1. Log in to the application
2. View all projects on the dashboard
3. Click on a project card to view detailed information
4. Use the status indicators to track project progress

## Future Enhancements

1. **Authentication and Authorization**
   - User login/logout functionality
   - Role-based access control

2. **Status Report Generation**
   - Automated status report generation
   - PDF export functionality

3. **Enhanced External Tool Integration**
   - Deeper integration with Jira, Confluence, and Productive
   - Real-time data synchronization

4. **Notification System**
   - Email notifications for project updates
   - In-app notifications

5. **Custom Fields**
   - Support for custom fields in project setup
   - Template-based project creation

## Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Check that the backend server is running
   - Verify API credentials for external tools
   - Check network connectivity

2. **Database Issues**
   - Check database connection
   - Verify database schema

3. **UI Issues**
   - Clear browser cache
   - Update to the latest version of the application

## Support

For support, please contact the development team at support@example.com.

## License

This project is licensed under the MIT License - see the LICENSE file for details.


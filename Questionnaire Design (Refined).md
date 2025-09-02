# Questionnaire Design (Refined)

This document outlines the refined design of the questionnaire for the multi-user, multi-project setup and tracking application.

## 1. Introduction

The questionnaire will be presented as a step-by-step wizard in the web application. It will guide the user through the process of setting up a new project, with clear instructions and validation at each step.

## 2. Questionnaire Sections

### 2.1. Project Details

This section will gather the fundamental information about the project:

*   **Project Name:** (Text input, required)
*   **Project Key:** (Text input, automatically generated from the project name, but editable, required)
*   **Project Type:** (Dropdown: Software, Core, Service Management, required)
*   **Project Lead:** (Dropdown, populated from a list of users, required)
*   **Project Description:** (Text area, optional)
*   **Start Date:** (Date picker, required)
*   **End Date:** (Date picker, optional)

### 2.2. Team Members

This section will allow the user to assemble the project team:

*   **Team Members:** (Multi-select list with search functionality, populated from a list of users, required)
*   **Roles:** For each team member, the user will be able to assign a role from a predefined list (e.g., Project Manager, Developer, QA, Designer). The list of roles will be customizable in the admin panel.

### 2.3. Meeting Schedule

This section will allow the user to schedule recurring project meetings:

*   **Steering Meeting:**
    *   **Enable:** (Checkbox)
    *   **Frequency:** (Dropdown: Weekly, Bi-weekly, Monthly)
    *   **Day of the week:** (Dropdown)
    *   **Time:** (Time picker)
    *   **Attendees:** (Multi-select list, populated from a list of users)
*   **PM Alignment Meeting:**
    *   **Enable:** (Checkbox)
    *   **Frequency:** (Dropdown: Weekly, Bi-weekly)
    *   **Day of the week:** (Dropdown)
    *   **Time:** (Time picker)

### 2.4. Jira Project Configuration

This section will configure the Jira project:

*   **Project Template:** (Dropdown, populated from a list of available Jira project templates)
*   **Issue Types:** (Multi-select list, populated from the selected project template)
*   **Workflows:** (Dropdown, populated from the selected project template)
*   **Automations:** (Multi-select list of predefined automation rules, e.g., "Auto-assign issues to the project lead")

### 2.5. Confluence Space Configuration

This section will configure the Confluence space:

*   **Space Name:** (Text input, pre-filled with the project name)
*   **Space Key:** (Text input, pre-filled with the project key)
*   **Space Template:** (Dropdown, populated from a list of available Confluence space templates)

### 2.6. Productive Project Configuration

This section will configure the Productive project:

*   **Budget:** (Number input, required)
*   **Currency:** (Dropdown, e.g., USD, EUR, CHF)

### 2.7. Tool Credentials

This section will allow the user to securely provide their API credentials for the different tools. The credentials will be encrypted and stored securely in the database.

*   **Jira:**
    *   **Instance URL:** (Text input)
    *   **API Token:** (Password input)
*   **Confluence:**
    *   **Instance URL:** (Text input)
    *   **API Token:** (Password input)
*   **Productive:**
    *   **Organization ID:** (Text input)
    *   **API Token:** (Password input)
*   **Microsoft Outlook:**
    *   (Instructions on how to grant access to the application)

## 3. Review and Submit

After completing all the sections, the user will be presented with a comprehensive summary of their project configuration. They will be able to review and edit any information before submitting the form. Upon submission, the backend service will initiate the project setup process, and the user will be redirected to the project dashboard where they can track the progress.



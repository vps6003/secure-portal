# Frontend Developer Assignment – Sentra.World

## Overview
This project is a frontend application developed as part of the Frontend Developer assignment for Sentra.World. The focus of the implementation is on authentication flow, state management using Angular Signals, clean architecture, and handling list-based data with pagination and search.

The application includes authentication, protected routes, a dashboard with paginated data, and a structured layout with header and footer components.

## Live Demo
🔗 Live Application: <PASTE_LIVE_LINK_HERE>

## Repository
🔗 GitHub Repository: <PASTE_GITHUB_REPO_LINK_HERE>

---

## Tech Stack
- **Framework:** Angular 19+
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Angular Material
- **State Management:** Angular Signals + localStorage
- **Routing Strategy:** Hash-based routing
- **HTTP Handling:** Angular HttpClient with global interceptor

---

## Features

### Authentication
- Login and Register functionality using a personally deployed backend API
- JWT-based authentication
- Token stored in `localStorage`
- Global HTTP interceptor to attach JWT to authenticated requests
- Unified loader signal for Login and Register flows

### Route Protection
- Auth Guards implemented to protect private routes
- Automatic redirection for unauthorized access

### Dashboard
- Displays posts in a tabular format
- Backend-driven pagination
- Retry button for failed API calls
- Error and loading states handled gracefully

### Search
- Debounced search with a delay of 0.5 seconds
- Auto-search triggered on typing
- Search results are paginated and integrated with existing listing logic

### Profile Page
- Displays authenticated user information

### Layout & Navigation
- Header navigation bar
- Footer component
- Structured routing for all pages

---

## APIs Used
- **Posts Data:** JSONPlaceholder (public API)
- **Authentication:** Custom deployed API for Login and Register

---

## Architecture & Approach
- Used Angular **Services** and **Interfaces** to separate business logic from components
- Avoided heavy logic inside components to keep them clean and maintainable
- Centralized state handling using Signals
- Implemented error handling for all API calls

---

## Setup Instructions
```bash
git clone <REPO_LINK>
cd <PROJECT_FOLDER>
npm install
ng serve

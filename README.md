# Fashion Category Management System

A modern web application for managing hierarchical fashion categories with a clean and intuitive user interface.
Built with React, Node.js, Express, and MongoDB.

This project was developed as an assignment for Styli (Landmark Group) to demonstrate a full-stack implementation of a category management system tailored for fashion retail needs.

## Features

- 🌳 Hierarchical Category Tree
- ➕ Add Root and Sub-categories
- 📝 Edit Category Names
- 🗑️ Delete Categories (with child category protection)
- 🔄 Real-time Updates
- 🎯 Intuitive Drag-and-Drop Interface
- 🎨 Modern and Clean UI Design

## Tech Stack

### Frontend
- React 18
- Javascript
- Tailwind CSS
- Lucide React (for icons)
- Vite (build tool)

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

### Testing
- Vitest
- React Testing Library
- MongoDB Memory Server (for testing)

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vamsichallapalli/fashion-hierarchy-system.git
cd fashion-category-management
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
# Start the backend server
npm run server

# In a new terminal, start the frontend development server
npm run dev
```

## Project Structure

```
├── server/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── tests/           # Backend tests
│   └── index.js         # Server entry point
├── src/
│   ├── components/      # React components
│   ├── lib/            # Utility functions and API client
│   ├── tests/          # Frontend tests
│   └── App.tsx         # Main application component
└── package.json
```

## API Endpoints

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

## Testing

Run the test suite:

```bash
npm run test
```

The project includes both frontend and backend tests:
- Frontend component tests using React Testing Library
- Backend model and API tests using MongoDB Memory Server


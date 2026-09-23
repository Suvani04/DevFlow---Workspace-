🚀 DevFlow Workspace
An AI-powered collaborative developer platform — Jira + Slack + AI, all in one place.

DevFlow Workspace is a full-stack project management tool built for dev teams. It combines workspace/project management, a drag-and-drop Kanban board, and an integrated AI assistant that understands your board's context and answers questions about your tasks in real time.

🔗 Live App: dev-flow-workspace.vercel.app 
🔗 Backend API: devflow-backend.onrender.com
⚠ Note: the backend is hosted on Render's free tier, which sleeps after 15 minutes of inactivity. The first request may take 30–60 seconds to wake up.

✨ Features 
🔐 Authentication — secure register/login with JWT
🏢 Workspaces — create and manage team workspaces with invite codes
📁 Projects — organize work into projects with unique keys (e.g. DEV-1 , DEV-2 ) 
📋 Kanban Board — drag-and-drop task management across To Do / In Progress / In Review / Done
📝 Task Details — full task editing: title, description, status, priority, type, due date
🤖 AI Assistant — chat with an AI that has live context of your project's tasks (powered by Google Gemini)
🎨 Dark Theme UI — clean, modern interface built with Tailwind CSS

🛠 Tech Stack
Frontend 
React + Vite 
Tailwind CSS
Redux Toolkit
Axios 
React Router
@hello-pangea/dnd (drag & drop)

Backend
Node.js + Express.js
MongoDB + Mongoose
JWT Authentication
Google Gemini API (AI Assistant)

Deployment 
Frontend → Vercel
Backend → Render 
Database → MongoDB Atlas

📸 Screenshots
landing page
<img width="960" height="564" alt="Screenshot 2026-09-23 143225" src="https://github.com/user-attachments/assets/31aac2f0-59dc-48f8-ba76-5f781a145c0b" />

<img width="960" height="564" alt="Screenshot 2026-09-23 143240" src="https://github.com/user-attachments/assets/b2d31399-5197-4f4f-8919-f784cc258ff8" />

<img width="960" height="564" alt="Screenshot 2026-09-23 143300" src="https://github.com/user-attachments/assets/8ebe1e2a-e1d9-48dc-9722-9dcec44dd0a3" />

register page
<img width="960" height="564" alt="Screenshot 2026-09-23 143311" src="https://github.com/user-attachments/assets/19aa47eb-01b0-4560-bf01-5e4d3d6469b9" />

login page
<img width="960" height="564" alt="Screenshot 2026-09-23 143319" src="https://github.com/user-attachments/assets/12e13eed-0bd3-4ec4-9085-93d7da857c52" />

Dashboard page
<img width="960" height="564" alt="Screenshot 2026-09-23 143349" src="https://github.com/user-attachments/assets/3049705a-d66c-48bf-9517-7447f91c2c74" />

project pages
<img width="960" height="564" alt="Screenshot 2026-09-23 143401" src="https://github.com/user-attachments/assets/3a9ce630-880d-4e42-8c94-5cb220024817" />

kanban page
<img width="960" height="564" alt="Screenshot 2026-09-23 143412" src="https://github.com/user-attachments/assets/8427dbd4-fd3a-4aa6-a9db-8e4e9ebf925c" />

task edit page
<img width="960" height="564" alt="Screenshot 2026-09-23 143421" src="https://github.com/user-attachments/assets/2a60900b-0f08-4d2b-ba42-a418031e8459" />

Ai-Assistant page
<img width="960" height="564" alt="Screenshot 2026-09-23 143444" src="https://github.com/user-attachments/assets/d267a257-b742-484b-bda5-18ca87aaa4d3" />

📂 Project Structure
devflow-workspace/
├── server/ 
│     ├── src/ 
│     │   ├── config/         # DB 
connection 
│   │   ├── models/         # User,
Workspace, WorkspaceMember, Project, Task
│   │   ├── controllers/    # Business 
logic 
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Auth 
middleware 
│   │  └── utils/ 
│   └── index.js 
└── client/
     └── src/ 
         ├── pages/           # Landing, 
Auth, Dashboard, Onboarding, 
         │                    # Projects,
Kanban, TaskDetail, AIAssistant 
         ├── store/           # Redux store 
+ slices (auth, tasks, projects) 
         ├── services/        # Axios API 
 instance 
         └── App.jsx


⚙ Getting Started (Local Setup) 
Prerequisites
Node.js (v20.x recommended)
MongoDB Atlas account (or local MongoDB)
Google AI Studio API key (for the AI Assistant feature)

1. Clone the repository git clone
 https://github.com/Suvani04/DevFlow--Workspace-.git
 cd DevFlow---Workspace

2. Backend Setup
    cd server
    npm install

Run the server
npm run dev

3. Frontend Setup
   cd client
   npm install

Run the client
npm run dev

👤 Author 
Suvani Aher
Final year Mechanical Engineering student, transitioning into software development.
GitHub: @Suvani04 

📄 License
This project is open source and available for learning purposes.




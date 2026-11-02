# Full-Stack Portfolio Blog (Capstone Project)

A full-stack portfolio website with blog, projects showcase, comments and contact form. 
Built with React (Vite) + Express + MongoDB Atlas, with JWT authentication and role-based access.

## Live URLs
- Frontend: https://blog-eight-drab-91.vercel.app/
- Backend API: https://capstone-backend-omo8.onrender.com

## Tech Stack
- Frontend: React, React Router, Tailwind CSS, Axios
- Backend: Node.js, Express, Mongoose, JWT, bcryptjs, helmet
- Database: MongoDB Atlas

## API Endpoints
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | /api/users/register | Public | Register a new user |
| POST | /api/users/login | Public | Login and get JWT |
| GET | /api/projects | Public | Get all projects |
| POST | /api/projects | JWT | Create a project |
| PUT | /api/projects/:id | JWT | Update a project |
| DELETE | /api/projects/:id | JWT | Delete a project |
| GET | /api/blog | Public | Get all blog posts |
| GET | /api/blog/:id | Public | Get a single post & comments |
| POST | /api/blog | JWT | Create a blog post |
| PUT | /api/blog/:id | JWT | Update a post (author only) |
| DELETE | /api/blog/:id | JWT | Delete a post (author only) |
| POST | /api/blog/:id/comments | JWT | Add a comment |
| POST | /api/contact | Public | Submit contact message |

## Run Locally
Backend:
```bash
cd server
npm install
npm run dev
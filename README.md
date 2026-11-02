# Full-Stack Portfolio Blog (Capstone Project)

A full-stack portfolio website with projects showcase, blog, comments and contact form.
Built with React (Vite) + Express + MongoDB Atlas, with JWT authentication and role-based access.

## Live URLs

- Frontend: https://blog-eight-drab-91.vercel.app/
- Backend API: https://capstone-backend-omo8.onrender.com

## Tech Stack

- Frontend: React 19, React Router 7, Tailwind CSS 4, Framer Motion, Quill rich-text editor
- Backend: Node.js, Express, Mongoose, JWT, bcryptjs, helmet
- Database: MongoDB Atlas

## Features

- User register / login with JWT (passwords hashed with bcrypt)
- Public visitors can browse projects and blog posts
- Logged-in users can create/edit/delete their own blog posts in an Admin Dashboard
- Author-or-admin authorization: admin can manage all content, other users are read-only
- Logged-in users can post comments on blog articles
- Contact form saves messages to the database
- Rich-text blog editor (Quill) with inline images
- Responsive dark/light theme UI

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | /api/users/register | Public | Register a new user |
| POST | /api/users/login | Public | Login, returns JWT |
| GET | /api/projects | Public | List projects |
| GET | /api/projects/:id | Public | Project detail |
| POST | /api/projects | JWT | Create a project |
| PUT | /api/projects/:id | JWT | Update a project |
| DELETE | /api/projects/:id | JWT | Delete a project |
| GET | /api/blog | Public | List blog posts (excerpts) |
| GET | /api/blog/:id | Public | Post detail |
| POST | /api/blog | JWT | Create a blog post |
| PUT | /api/blog/:id | JWT | Update a post (author or admin) |
| DELETE | /api/blog/:id | JWT | Delete a post (author or admin) |
| GET | /api/blog/:postId/comments | Public | List comments of a post |
| POST | /api/blog/:postId/comments | JWT | Add a comment |
| POST | /api/contact | Public | Submit contact message |
| GET | /api/health | Public | Health check |

## Run Locally

Backend (create `server/.env` with `MONGO_URI` and `JWT_SECRET` first):

```bash
cd server
npm install
npm run dev      # http://localhost:5000
```

Frontend:

```bash
cd client
npm install
npm run dev      # http://localhost:3000 (proxies /api to localhost:5000)
```

Production build:

```bash
cd client
npm run build
```

## Deployment

- Backend: Render (Web Service, root directory `server`, env vars `MONGO_URI` and `JWT_SECRET`)
- Frontend: Vercel (env var `VITE_API_URL` pointing to the Render API + `/api`)

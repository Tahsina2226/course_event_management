

# 🎓 University Batch Management System

## 📌 Overview

A modern, responsive, and role-based batch management platform designed for academic institutions. This system enables administrators to efficiently manage academic batches, routines, news, and events, while allowing students to enroll in their respective departments under role-based restrictions.

## 🌐 Live Deployment

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge\&logo=vercel)](https://course-event-management.vercel.app/)
Access the production environment here:
🔗 [https://course-event-management.vercel.app/](https://course-event-management.vercel.app/)

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* Role-based access control (Admin/Student)
* JWT-based authentication
* Protected routes for secured access

### 🎓 Academic Management

* Batch creation, modification, and deletion by Admin
* Department enrollment by Students
* One-time enrollment restriction per student
* Batch search and filtering capabilities

### 📅 Routine Management

* Create, edit, view, and delete academic routines (Admin)
* Students can view routine schedules
* Responsive calendar/list routine views
* Interactive forms with validation and real-time feedback

### 📰 News Management

* Students can **view** latest news updates
* Searchable and paginated news list
* **Note:** Creation, update, and deletion of news articles are currently **not implemented**

### 🎉 Events Management

* Students can **view** upcoming events and details
* **Note:** Creation, update, and deletion of events are currently **not implemented**

### 🖥️ User Experience

* Fully responsive design for all devices
* Client-side pagination for performance
* Interactive modals using SweetAlert2
* Smooth animated transitions via Framer Motion
* Comprehensive error handling and feedback

---
🔥 Demo Preview

| 🏠 Home Page                                                                                   |
|-----------------------------------------------------------------------------------------------|
| ![Home Page](https://github.com/user-attachments/assets/e63d9669-1c4d-46c3-b801-e091ae234ddc) |

| 🎓 Batches Page for User                                              | 🎓 Batches Page for Admin                                              |
|----------------------------------------------------------------------|----------------------------------------------------------------------|
| ![Batches Page for User](https://github.com/user-attachments/assets/1c9f7335-ee01-4b79-872b-f17dc0d21bdc) | ![Batches Page for Admin](https://github.com/user-attachments/assets/d958a30e-d183-492b-a9d9-0e47e6f71311)                        |

| 📅 Routines Page for Users                                           | 📅 Routines Page for Admin                                            |
|----------------------------------------------------------------------|----------------------------------------------------------------------|
| ![Routines Page for Users](https://github.com/user-attachments/assets/52aece13-970e-4cf4-91c1-f988d280d7fa) | ![Routines Page for Admin](https://github.com/user-attachments/assets/3611f31e-f845-40aa-8bdf-8743d6fbcc2e)                      |

| 📅 Events Page                                                      | 📰 News Page                                                         |
|-------------------------------------------------------------------|--------------------------------------------------------------------|
| ![Events Page](https://github.com/user-attachments/assets/b6aa1c6f-c0ec-4211-9557-eb06298c8707) | ![News Page](https://github.com/user-attachments/assets/741ce51a-75da-4788-89dc-2e87f7c8fd59) |



## 🛠️ Technology Stack

### Frontend

* React.js (TypeScript)
* Redux Toolkit with RTK Query
* React Router v6
* Vite build system

### Backend

* Node.js with Express
* **PostgreSQL** relational database
* RESTful API design principles

### UI/UX Tools

* Tailwind CSS for styling
* Lucide Icons for UI icons
* SweetAlert2 for alerts/modals
* Framer Motion for animations

---

## 📦 System Architecture

```mermaid
graph TD
    A[Client] -->|HTTP| B[API Server]
    B --> C[PostgreSQL Database]
    A --> D[Redux Store]
    D --> E[RTK Query Cache]

    subgraph Frontend
    A
    D
    end

    subgraph Backend
    B
    C
    end
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm (v9+ recommended)
* Git
* PostgreSQL installed and running

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Tahsina2226/course_event_management.git
   cd course_event_management
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and set your API base URL and PostgreSQL connection string, for example:

   ```
   VITE_API_BASE_URL=https://university-lp-backend.vercel.app/api/
   DATABASE_URL=postgresql://user:password@localhost:5432/university
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser at:

   ```
   http://localhost:5173
   ```

---

## 📚 Documentation

### User Roles and Permissions

| Role    | Permissions        | Accessible Features                                                       |
| ------- | ------------------ | ------------------------------------------------------------------------- |
| Admin   | Full system access | Batch CRUD, Routine management, News & Events management, User management |
| Student | Limited access     | View batches, routines, news, events; enroll in department                |

### API Endpoints Overview

| Method | Endpoint            | Description                  | Status                  |
| ------ | ------------------- | ---------------------------- | ----------------------- |
| GET    | `/api/batches`      | List all batches             | Implemented             |
| POST   | `/api/batches`      | Create a new batch           | Implemented             |
| PUT    | `/api/batches/:id`  | Update batch information     | Implemented             |
| DELETE | `/api/batches/:id`  | Delete a batch               | Implemented             |
| POST   | `/api/enroll`       | Enroll student in department | Implemented             |
| GET    | `/api/routines`     | List all routines            | Implemented             |
| POST   | `/api/routines`     | Create a new routine         | Implemented             |
| PUT    | `/api/routines/:id` | Update routine information   | Implemented             |
| DELETE | `/api/routines/:id` | Delete a routine             | Implemented             |
| GET    | `/api/news`         | List all news articles       | Implemented (Read-only) |
| POST   | `/api/news`         | Create a news article        | **Not implemented yet** |
| GET    | `/api/events`       | List all events              | Implemented (Read-only) |
| POST   | `/api/events`       | Create a new event           | **Not implemented yet** |

---

## 🗂 Project Structure

```
COURSE_EVE/
├── .vercel/
├── dist/
├── node_modules/
├── public/
│   ├── vite.svg
│   └── src/      
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Navbar.tsx
│   │   └── Register.tsx
│   ├── features/
│   │   ├── auth/
│   │   │   └── auth.ts
│   │   ├── batches/
│   │   │   ├── batchApi.ts
│   │   │   ├── Batches.tsx
│   │   │   ├── CreateBatch.tsx
│   │   │   ├── EditBatch.tsx
│   │   │   └── MatchList.jsx
│   │   ├── enroll/
│   │   │   ├── Enroll.tsx
│   │   │   └── enrollApi.ts
│   │   ├── events/
│   │   │   ├── eventApi.ts
│   │   │   └── Events.tsx
│   │   ├── news/
│   │   │   ├── News.tsx
│   │   │   └── newsApi.ts
│   │   └── routines/
│   │       ├── CreateRoutineForm.tsx
│   │       ├── EditRoutineForm.tsx
│   │       ├── routineApi.ts
│   │       └── Routines.tsx
│   ├── lib/
│   ├── login/
│   │   └── AdminLogin.jsx
│   ├── redux/
│   │   ├── Hooks.ts
│   │   └── Store.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── log.txt
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
```

---

## 🔮 Roadmap

### Planned Enhancements

* Department-wise faculty assignment
* Student academic profiles
* Integrated class scheduling system
* Document management system
* Real-time notifications
* Advanced analytics dashboard

### News & Events CRUD

* Implement full **Create, Read, Update, Delete (CRUD)** functionality for **News**
* Implement full **Create, Read, Update, Delete (CRUD)** functionality for **Events**
* Admin interface for managing news and events content
* Rich text editor integration for news content
* Image/media uploads for news and events
* Notification system for new news and events announcements

---

## 🤝 Contributing

Contributions are welcome! Please follow the steps below:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for details.

---

## ✉️ Contact

**Tahsina Tanvin**
📧 [tahsinatanvin274@gmail.com](mailto:tahsinatanvin274@gmail.com)
🔗 [GitHub](https://github.com/Tahsina2226)
🔗 [LinkedIn](https://www.linkedin.com/in/tahsina-tanvin-8a49162b3/)

 ei project tar jnno ekta scripts daw

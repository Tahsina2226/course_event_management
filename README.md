


# 🎓 University Course & Event Management System

A modern and responsive full-stack web application designed to manage university batches, course routines, event updates, and enrollment functionalities.

##  Live Demo

 [Click here to view the live site]

---

## 📌 Features

- 🔐 User Authentication (Register/Login with Role)
- 🧑‍🎓 Enroll in Batches with Department Locking
- 🗂️ Batch Management (Create, Edit, View)
- 📅 Routine Management (Create, Edit, View Timetables)
- 📢 Events Listing with Animated Modal Details
- 📰 News Section
- ⚙️ Protected Routes (Only Logged-in Users Can Access Protected Pages)
- 🍃 Smooth UI with TailwindCSS and Framer Motion

---

## 🛠️ Tech Stack

**Frontend:**

- React.js
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router DOM
- SweetAlert2
- React Hot Toast

**Backend:**

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- JWT for Authentication

**State Management:**

- Redux Toolkit
- RTK Query

---

## 🧪 How to Run Locally

### 1. Clone the Repository

```bash

cd course-event-management
````

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup `.env` File

Create a `.env` file in both `client/` and `server/` directories.

**Example (`.env`):**

```env
# Client
VITE_API_URL=http://localhost:5000/api

# Server
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Run the Application

```bash
# For frontend
npm run dev

# For backend (inside /server)
npm run start
```

---

## 🌱 Folder Structure

```
COURSE_EVENT_MANAGEMENT/
├── .vercel/
├── dist/
├── node_modules/
├── public/
│   ├── vite.svg
│   ├── src/
│   ├── assets/
│   │   └── react.svg
│   └── components/
│       ├── Footer.tsx
│       ├── Home.tsx
│       ├── Login.tsx
│       ├── Navbar.tsx
│       └── Register.tsx
├── src/
│   ├── features/
│   │   ├── auth/
│   │   │   └── auth.ts
│   │   ├── batches/
│   │   │   ├── batchApi.ts
│   │   │   ├── Batches.tsx
│   │   │   ├── MatchList.jsx
│   │   │   ├── CreateBatch.tsx
│   │   │   └── EditBatch.tsx
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
└── vite.config.ts
```

---

## 📸 Screenshots

| Home Page                   | Login Page                   |
| --------------------------- | ---------------------------- |
| ![](./screenshots/home.png) | ![](./screenshots/login.png) |

| Register Page                   | Batch List                     |
| ------------------------------- | ------------------------------ |
| ![](./screenshots/register.png) | ![](./screenshots/batches.png) |

| Routine Page                   | Event Modal                        |
| ------------------------------ | ---------------------------------- |
| ![](./screenshots/routine.png) | ![](./screenshots/event-modal.png) |

---

## 🧩 Known Limitations

* ❗ No email verification system in place.
* 📆 Event creation only possible from backend currently.
* 🛡️ No role-based UI difference (e.g., Admin vs. User).

---

## 🔭 Future Plans

* 🔑 Add Google OAuth Integration
* 📧 Email Verification & Password Reset
* 📚 Admin Dashboard with Full CRUD for Events/News
* 📱 Mobile Responsiveness Improvements
* 📤 Image Upload Functionality (Cloudinary / Firebase)
* 🗃️ Pagination and Search for Batches/Events
* 📊 Analytics for User Activities

---

## 🙋‍♀️ Author

**Tahsina Tanvin**

* 📧 Email: [tahsinatanvin274@gmail.com](mailto:tahsinatanvin274@gmail.com)
* 🔗 [LinkedIn](https://www.linkedin.com/in/tahsina-tanvin-8a49162b3/)
* 💻 [GitHub](https://github.com/Tahsina2226)

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---


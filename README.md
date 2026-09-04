# JobTrack – Job Application Tracker (Full-Stack SaaS)

**JobTrack** is a production-ready, multi-tenant full-stack web application designed for job seekers to track and manage their job application pipeline securely.

Built with **Spring Boot 3 (Java 17)**, **Spring Security**, **JWT Authentication**, and **React 18 (Vite)**, JobTrack demonstrates clean layered architecture, REST API design, JPA multi-tenant data isolation, BCrypt password hashing, and modern SaaS frontend design suitable for technical resume showcases and developer job interviews.

---

## 🌟 Key Features

* **User Authentication & Authorization**: Secure Registration (`/register`) & Sign In (`/login`) powered by **Spring Security** & **JWT (JSON Web Tokens)** with **BCrypt password hashing**.
* **Data Isolation**: Multi-tenant data privacy—every user accesses and manages strictly their own job applications.
* **Overview Dashboard**: Real-time stats showing Total Applications, Upcoming Interviews, Selected Offers, and Rejections alongside recent job submissions.
* **Application Management (CRUD)**: Create, view, edit, and delete job applications with company name, position, location, status, applied date, interview date, job URL, and notes.
* **Status Badges**: Visually distinct status pills:
  * `APPLIED` (Blue)
  * `INTERVIEW` (Orange/Yellow)
  * `SELECTED` (Green)
  * `REJECTED` (Red)
* **Real-time Search & Filter**: Search applications by company or position, and filter by status.
* **Demo Data Seeder**: Auto-initializes a demo account (`demo@jobtrack.com` / `Password@123`) with 6 pre-populated sample applications on first launch.

---

## 🛠️ Technology Stack

### Backend
* **Java**: 17 LTS
* **Framework**: Spring Boot 3.2
* **Security**: Spring Security & JJWT (JSON Web Token 0.12.5)
* **Persistence**: Spring Data JPA & Hibernate
* **Database**: MySQL 8.0 (with H2 embedded profile fallback)
* **Validation**: Spring Boot Starter Validation (`Hibernate Validator`)
* **Build Tool**: Apache Maven (Includes Maven Wrapper `mvnw` / `mvnw.cmd`)

### Frontend
* **UI Framework**: React 18
* **Build Tool**: Vite 5
* **Routing**: React Router v6 (with `ProtectedRoute` auth guards)
* **HTTP Client**: Axios (with Bearer Token Interceptor)
* **Styling**: Vanilla CSS (Modern SaaS Light Theme)
* **Icons**: Lucide React

---

## 🔐 Authentication & Data Flow

```text
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (Vite)                    │
│                 http://localhost:5173                       │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP Request + Header:
                               │ Authorization: Bearer <JWT>
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Spring Security Filter Chain                │
│                 JwtAuthenticationFilter                     │
└──────────────────────────────┬──────────────────────────────┘
                               │ Extracts User Email & ID
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             JobApplicationController / Service              │
│                 (Data Isolated by User ID)                  │
└──────────────────────────────┬──────────────────────────────┘
                               │ JPA / Hibernate Query
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     MySQL Database                          │
│             tables: users, job_applications                 │
└──────────────────────────────┘
```

---

## 🚀 Quick Start Guide

### Step 1: Database Setup (MySQL)

Create the `jobtrack` database in MySQL:

```sql
CREATE DATABASE IF NOT EXISTS jobtrack;
```

---

### Step 2: Run the Backend (Spring Boot)

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

The backend server starts on **`http://localhost:8080`**.

---

### Step 3: Run the Frontend (React)

Open a second terminal window:

```bash
cd frontend
npm install
npm run dev
```

Open your browser at **`http://localhost:5173`**.

---

## 🔐 Credentials & Demo Account

You can register a new account via the UI or log in using the pre-seeded demo account:

* **Email**: `demo@jobtrack.com`
* **Password**: `Password@123`

---

## 📡 REST API Reference

### Authentication Endpoints

| Method | Endpoint | Access | Description | Payload Example |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user account | `{"fullName":"Name", "email":"user@example.com", "password":"password"}` |
| `POST` | `/api/auth/login` | Public | Authenticate user & get JWT token | `{"email":"user@example.com", "password":"password"}` |
| `GET` | `/api/auth/me` | Protected | Get current user profile | Header: `Authorization: Bearer <token>` |

### Job Application Endpoints (Protected by JWT)

| Method | Endpoint | Query Params | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/applications` | `search`, `status` | Get user's job applications |
| `GET` | `/api/applications/stats` | None | Get user's summary statistics |
| `GET` | `/api/applications/{id}` | None | Get application details by ID |
| `POST` | `/api/applications` | None | Create new job application |
| `PUT` | `/api/applications/{id}` | None | Update job application |
| `DELETE` | `/api/applications/{id}` | None | Delete job application |

---

## 🌐 Cloud Deployment Guide

### Option 1: Frontend Deployment (Vercel / Netlify)
1. Push project to GitHub.
2. Link `frontend/` folder to Vercel or Netlify.
3. Build command: `npm run build`, Output directory: `dist`.

### Option 2: Backend Deployment (Render / Railway / AWS App Runner)
1. Connect `backend/` to Render or Railway.
2. Environment Variables:
   * `SPRING_DATASOURCE_URL`: `jdbc:mysql://your-db-host:3306/jobtrack`
   * `SPRING_DATASOURCE_USERNAME`: `your_db_user`
   * `SPRING_DATASOURCE_PASSWORD`: `your_db_password`
   * `JWT_SECRET`: `404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970`
3. Build command: `./mvnw clean package -DskipTests`
4. Start command: `java -jar target/jobtrack-backend-1.0.0.jar`

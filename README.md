🎓 Project Submission System
📘 Overview

The Project Submission System is a web-based application designed to simplify the process of assignment and project management in educational institutions. It allows admins, supervisors, and students to collaborate efficiently through a structured digital workflow — from assignment creation to submission, review, and evaluation.

🚀 Features
👩‍🎓 Student Features

View assigned projects and submission deadlines

Upload project files or assignment iterations

Receive automatic email reminders and supervisor feedback

Track submission status and remarks

🧑‍🏫 Supervisor Features

Assign projects or tasks to students

Review student submissions and provide feedback

Monitor student progress

Check submissions for plagiarism

🛠️ Admin Features

Manage users (students, supervisors, and admins)

Create and manage groups and assignments

Assign supervisors to students or groups

Monitor overall system activity

Generate detailed reports and analytics

📂 System Modules
Module	Description
User Management	Handles registration, roles, and authentication for students, supervisors, and admins
Assignment Management	Manages assignment creation, updates, and distribution
Submission Module	Allows students to upload their project files and tracks version history
Feedback & Evaluation	Enables supervisors to provide reviews, remarks, and grades
Plagiarism Detection	Automatically checks submissions for originality
Activity Tracking	Records all key actions for transparency and accountability
Report Generation	Provides detailed performance and submission statistics
🧩 Tech Stack
Category	Technologies
Backend	Spring Boot (Java)
Frontend	React.js
Database	MySQL
Authentication	Spring Security, JWT
Other Tools	REST APIs, Mail Service (SMTP), File Upload Handling
Version Control	Git & GitHub
⚙️ System Architecture (MVC Pattern)

The project follows the Model-View-Controller (MVC) design pattern for better scalability and maintainability.

Model → Represents the database entities (User, Assignment, Submission, Group)

View → User interface built with React.js

Controller → Handles user requests and API routing in Spring Boot

🧾 Installation & Setup
🔹 Prerequisites

Java 17 or above

Node.js and npm

MySQL Server

IDE (IntelliJ, Eclipse, or VS Code)

🔹 Steps to Run

Clone the repository

git clone https://github.com/ohmprakashganesh/project-submission-system.git
cd project-submission-system


Backend Setup

Open the Spring Boot project in your IDE

Update application.properties with your MySQL credentials

Run the backend server

mvn spring-boot:run


Frontend Setup

cd frontend
npm install
npm start


Access the app

Visit: http://localhost:3000

📧 Email & Notification System

The system uses Spring Boot Mail Service (SMTP) for sending:

Submission reminders

Feedback notifications

Admin announcements

📊 Reports & Analytics

Admins can generate:

Student performance reports

Submission statistics

Supervisor activity summaries

🔐 Security

Role-based access control (Admin, Supervisor, Student)

JWT-based authentication

Secure file handling and validatio

<img width="1761" height="839" alt="Screenshot 2025-10-30 113040" src="https://github.com/user-attachments/assets/c498f902-e9e1-48f8-b30f-c32ffdb7a3b6" />
<img width="1765" height="849" alt="Screenshot 2025-10-30 113025" src="https://github.com/user-attachments/assets/9b4309a3-e249-49bf-8c7f-7491d35de8c6" />
<img width="1750" height="850" alt="Screenshot 2025-10-30 113016" src="https://github.com/user-attachments/assets/c3f42506-2f21-4c73-95dd-d0ce6c328a44" />
<img width="1761" height="837" alt="Screenshot 2025-10-30 113005" src="https://github.com/user-attachments/assets/ccd4858d-a0c8-456b-bdfd-fbbebb9a39b8" />
<img width="1769" height="837" alt="Screenshot 2025-10-30 112942" src="https://github.com/user-attachments/assets/7e013ad7-8bf5-415d-894a-5269c496ee84" />
<img width="1733" height="841" alt="Screenshot 2025-10-30 112932" src="https://github.com/user-attachments/assets/b1c4708b-f354-4be0-8920-b7230400dd20" />
<img width="1764" height="847" alt="Screenshot 2025-10-30 112914" src="https://github.com/user-attachments/assets/2584f6c4-e1b6-4dc9-a8c6-85f436635bd7" />
<img width="1750" height="824" alt="Screenshot 2025-10-30 112842" src="https://github.com/user-attachments/assets/86696db3-6289-46d0-95c6-c08989bb8dae" />
<img width="1740" height="824" alt="Screenshot 2025-10-30 112818" src="https://github.com/user-attachments/assets/451a6ed8-65e0-4338-a234-4b395ba1c06e" />
<img width="1750" height="835" alt="Screenshot 2025-10-30 112755" src="https://github.com/user-attachments/assets/a5990fa8-606d-493b-be0f-e376db90f204" />
<img width="1751" height="805" alt="Screenshot 2025-10-30 112737" src="https://github.com/user-attachments/assets/4167c379-0668-4a4f-9478-863ea934936e" />
<img width="1905" height="854" alt="Screenshot 2025-10-30 101707" src="https://github.com/user-attachments/assets/bb24d0be-16fc-4452-942c-f2a20e03823d" />
<img width="1084" height="778" alt="Screenshot 2025-10-30 093123" src="https://github.com/user-attachments/assets/28c19b5d-5d51-4785-86c3-2f2d1cbb7e30" />
<img width="961" height="644" alt="Screenshot 2025-10-30 084508" src="https://github.com/user-attachments/assets/f3a3dbb9-ba3a-4f85-b4b2-2d979b91ae0d" />
<img width="620" height="623" alt="Screenshot 2025-10-30 082352" src="https://github.com/user-attachments/assets/6b88a145-6e39-48f0-b742-c3e7c7d33810" />
<img width="1063" height="706" alt="Screenshot 2025-10-29 013433" src="https://github.com/user-attachments/assets/8b6b385f-b385-4861-a3b6-ea1ace482239" />



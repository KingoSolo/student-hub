# Student Resource Sharing Platform

## Table of Contents
1. [Introduction](#introduction)
2. [Aim and Objectives](#aim-and-objectives)
3. [Features of Resource Sharing Platform](#features-of-resource-sharing-platform)
4. [Functional Requirements](#functional-requirements)
5. [Non-Functional Requirements](#non-functional-requirements)
6. [User Guide for the Student Resource Sharing Platform](#user-guide-for-the-student-resource-sharing-platform)
7. [Database Schema](#database-schema)
8. [Frontend and Backend Development Tools Used](#frontend-and-backend-development-tools-used)
9. [Team Members](#team-members)
10. [Project report](#project-report)

## Introduction
The Resource Sharing Platform is a collaborative web-based application designed to enable users to share, discover, and access a variety of resources, such as documents, tutorials, code snippets, and more. This platform fosters a community-driven environment where users can contribute resources that may be helpful to others. It aims to simplify resource sharing, encourage knowledge exchange, and promote open-source collaboration within various communities, including students and professionals. By making resources easily accessible, the platform helps users learn, solve problems, and complete projects more efficiently.

## Aim and Objectives

### Aims:
- To create an accessible, user-friendly platform that allows users to freely share and access resources.
- To build an open-source solution that encourages collaborative learning and community engagement.

### Objectives:
- Develop a secure web application to host and manage user-shared resources.
- Enable users to upload, download, and comment on shared resources.
- Facilitate effective categorization and searching to make resources easily discoverable.
- Encourage an open-source culture where users can contribute to and improve the platform.

## Features of Resource Sharing Platform
- **User Registration and Authentication**: Secure signup and login functionality.
- **Resource Upload and Download**: Users can upload files or links, and others can download or view them.
- **Search and Filter Functionality**: Search bars and filters help users find resources by category, tags, or keywords.
- **User Profiles**: Track contributions and manage resources.
- **Admin Dashboard**: Tools for administrators to manage content, users, and platform activity.
- **Responsive Design**: Usable across devices including mobile, tablet, and desktop.

## Functional Requirements

1. **User Registration and Authentication**
   - Allows students to register, verify emails, log in, and reset passwords.
   
2. **User Profile Management**
   - Enables students to create and manage profiles with personal information and preferences.
   
3. **Upload and Share Resources**
   - Allows students to upload files, categorize resources, and edit or delete their uploads.
   
4. **Resource Browsing and Searching**
   - Provides search and filter functions to locate resources based on keywords, categories, and preferences.
   
5. **Download and Access Resources**
   - Allows registered students to download resources or view them online.

6. **Notifications**
   - Notifies students of new resources, comments, and ratings on their resources.

7. **Resource Categorization and Tagging**
   - Categorizes resources into predefined subjects and academic levels.

## Non-Functional Requirements

- System should support multiple simultaneous uploads and downloads.
- User-friendly interface, suitable for all technical skill levels.
- High uptime (99.9%) with regular backups.
- Scalability to handle increased traffic and resource types.
- Secure user profiles and resource access through verification.
- File size limit to optimize storage.
- Compatible across various devices and major web browsers.

## User Guide for the Student Resource Sharing Platform

1. **Getting Started**
   - **Sign Up**: Register with email and verify through a confirmation link.
   - **Log In**: Use verified email and password.

2. **Setting up Your Profile**
   - Fill out profile information including study preferences.

3. **Uploading and Sharing Resources**
   - Upload files under chosen categories, ensuring size limits are met.

4. **Downloading Resources**
   - Browse resources and download or view online.

5. **Commenting and Rating Documents**
   - Leave comments and ratings on resources for feedback.

6. **Notifications**
   - Manage notifications for new uploads, comments, and ratings.

7. **Reporting and Flagging Content**
   - Report inappropriate content, which alerts the admin for review.

8. **Admin-Specific Features**
   - Admins can manage reports, delete or block content, and receive alerts for reported content.

9. **Troubleshooting & Support**
   - Contact Support or consult the FAQ for assistance.

## Database Schema

### 1. Users Table
| Field            | Type            | Description                       |
|------------------|-----------------|-----------------------------------|
| user_id          | INT (PK)        | Unique identifier for each user   |
| email            | VARCHAR(255)    | User's email address             |
| password_hash    | VARCHAR(255)    | Encrypted password               |
| name             | VARCHAR(100)    | Full name of the user            |
| is_verified      | BOOLEAN         | Verification status              |
| role             | ENUM(student, admin) | Role of the user          |
| created_at       | TIMESTAMP       | Account creation date            |
| updated_at       | TIMESTAMP       | Last update date                 |

### 2. Profiles Table
| Field            | Type            | Description                       |
|------------------|-----------------|-----------------------------------|
| profile_id       | INT (PK)        | Unique identifier for each profile|
| user_id          | INT (FK)        | Links to Users table             |
| study_preferences| TEXT            | User's study preferences         |
| created_at       | TIMESTAMP       | Profile creation date            |
| updated_at       | TIMESTAMP       | Last update date                 |

(Other tables such as Resources, Comments, Ratings, Reports, Notifications, and Categories are similarly structured.)

### Relationships Summary
- Users have Profiles, Resources, Comments, Ratings, and Reports.
- Resources belong to Users and are categorized.
- Notifications link to Users and provide alerts.

## Figma Design and presentation links
-Design link: https://www.figma.com/file/trhZG1DXmpRCJEQl5zMjPF?type=design
-Presentation link: https://www.figma.com/proto/trhZG1DXmpRCJEQl5zMjPF?node-id=0:1

## Frontend and Backend Development Tools Used

### Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js

## Team Members
1. Adigun Boluwatife - 21/2167
2. Adeyemo Ibukunoluwa David - 21/1156
3. Afelogun Moshope - 21/0949
4. Afolabi Tolulope Joanne - 21/2296
5. Adeogun Oluwasemilogo Paul - 21/1427
6. Adeniran Solomon - 21/1151
7. Adeyemi Boluwatife - 21/1900
8. Adeniyi Oreoluwa Elizabeth - 21/2405
9. Ukauwa Mayor Chibuike - 21/2596
10. Adewumi Elisha Adedayo - 21/2062

### Project Report

📚 Beef and Broccoli Project
- Online Course and Resource Sharing Platform
- Reporting Period: 2nd October 2024 – 14th November 2024

🚀 Project Overview
The Beef and Broccoli Project is an open-source software platform designed to facilitate easy sharing and discovery of course resources among users. This project was conducted over a six-week period, with the goal of delivering a fully functional, user-friendly, and responsive web application.

👥 Team Members and Roles
- Adeniyi Oreoluwa	Project Lead & Backend Developer
- Adigun Boluwatife	Lead Backend Developer
- Adeniran Solomon	Lead Frontend Developer
- Adeogun Semilogo	Co-Lead Frontend Developer
- Adeyemo Ibukun	UI Designer
- Adewumi Adedayo	UI Designer
- Afelogun Moshope  UI Designer
- Adeyemi Boluwatife	Backend Developer & Technical Writer
  Afolabi Tolulope	Main Technical Writer

🏆 Achievements
Key accomplishments of the project include:

Design Completion: The UI/UX team finalized a comprehensive Figma design, creating an intuitive and visually appealing interface for users.
Frontend Development: The frontend team implemented the Figma design with a responsive layout, ensuring accessibility on various devices.
Backend Development: The backend team integrated essential functionalities, creating a seamless user experience for sharing and accessing resources.
Documentation: The technical writing team documented the development process, providing detailed user and developer guides for future contributors.

📈 Challenges
Timeline Adjustment: The initial timeline was revised, presenting challenges in meeting the new deadlines. The team adapted by adjusting task priorities and improving task coordination.
Team Coordination: Coordinating across time zones and schedules posed challenges, resolved by using asynchronous communication and limiting synchronous meetings to essential discussions.

## 🗓️ Meeting Attendance

| Team Member           | Week 1 | Week 2 | Week 3 | Week 4 |
|-----------------------|--------|--------|--------|--------|
| Adeniyi Oreoluwa      | ✅     | ✅     | ✅     | ✅     |
| Adigun Boluwatife     | ✅     | ✅     | ✅     | ✅     |
| Adeyemi Boluwatife    | ✅     | ✅     | ✅     | ✅     |
| Afolabi Tolulope      | ✅     | ✅     | ✅     | ✅     |
| Adeyemo Ibukun        | ✅     | ✅     | ✅     | ✅     |
| Adewumi Adedayo       | ✅     | ✅     | ✅     | ✅     |
| Afelogun Moshope      | ✅     | ✅     | ✅     | ✅     |
| Ukauwa Mayor          | ✅     | ❌     | ❌     | ❌     |

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

Feel free to reach out to any team member for questions, or open an issue for suggestions and contributions!

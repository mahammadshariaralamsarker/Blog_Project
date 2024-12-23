https://github.com/Apollo-Level2-Web-Dev/b4-assignment-3


My_GitHub_Link = https://github.com/mahammadshariaralamsarker/Blog_Project

# Assignment-3: Blogging Platform Backend

## Overview

The purpose of this assignment is to build a backend system for a blogging platform where users can write, edit, and remove their blogs. The platform supports two user roles: **Admin** and **Regular User**. Admins have elevated permissions for managing users and their content, while regular users can manage their own blogs. The system includes secure login functionality, role-based permissions, and a public API for retrieving blogs with advanced filtering, sorting, and search features.

---

## Technology Stack

- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**

---

## Features and Functionalities

### 1. User Roles

#### Admin Capabilities:
- Admin accounts are created manually with predefined credentials stored in the database.
- Privileges:
  - **Remove any blog.**
  - **Block users** by updating their `isBlocked` status.
- Restrictions:
  - **Cannot modify blog content.**

#### Regular User Capabilities:
- Can sign up and log in.
- Privileges:
  - **Add new blogs** (login required).
  - **Edit and delete their own blogs.**
- Restrictions:
  - **Cannot perform admin-specific actions.**

---

### 2. Authentication and Role-Based Access Control

#### Authentication:
- Login is mandatory for any **create**, **update**, or **delete** operations.

#### Authorization:
- Differentiation between admin and regular users ensures access control for restricted routes.
- Protected routes must only allow authorized actions based on the user's role.

---

### 3. Blog API

#### Public Blog API:
- Accessible endpoint to view blogs with essential information such as title, content, and author details.
- Features:
  - **Search:** Find blogs using keywords in titles or content.
  - **Sort:** Organize blogs by attributes like `createdAt` or `title`, with ascending or descending order.
  - **Filter:** Retrieve blogs based on criteria like author ID.

#### Admin-Specific Actions:
- Admins can moderate user-generated content as per their permissions.

#### User-Specific Actions:
- Users can fully manage blogs they have created while adhering to role-based limitations.


## Package use Management 
1. node add -D typescript @types/express @types/node
2. node add -D dotenv
3. node add -D express
4. node add -D @types/mongoose
5. node add -D ts-node-dev

## Admin login crediential
"email": "admin@gmail.com",
  "password": "StrongPassword123"
## Hosting: 
**My server site hosting use vercel**

## Seen my server site provide infomation
1. **GitHub Link: https://github.com/mahammadshariaralamsarker/Blog_Project

2. **Live Link : https://shariarblogassignment.vercel.app/

3. **Explanation My Porject Video Link: https://www.veed.io/view/6ed3d1d4-9b20-472b-a146-4fdb96200201?panel=share**



# Ticket Management System

## Overview
The **Ticket Management System** is a backend system designed for managing bus tickets, allowing users to purchase tickets for specific buses at designated time slots. The system includes authentication, role-based management (Admin and User), and ticket purchasing functionalities.

This system is built using **Node.js**, **Express.js**, and **MongoDB** with **Mongoose** for the database. The project follows a modular design pattern to ensure scalability and maintainability.

## Features

- **User Authentication**: 
  - User registration, login, and logout with JWT-based authentication.
  - Password hashing for secure storage.

- **Admin Functionalities**:
  - Add, update, and delete bus information.
  - Upload, update, and delete tickets for buses with prices and time slots.

- **User Functionalities**:
  - View available buses and tickets.
  - Purchase tickets for a specific bus at a given time slot.

- **Role-based Access Control**:
  - Admins can manage buses and tickets.
  - Users can view buses, tickets, and purchase tickets.

## Technologies

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Error Handling**: http-errors

## Project Structure


## API Endpoints

### **Authentication APIs**
- **POST /auth/register**: User registration
- **POST /auth/login**: User login
- **POST /auth/logout**: User logout

### **Admin APIs**
- **POST /admin/bus**: Add a new bus
- **PUT /admin/bus/:id**: Update bus information
- **DELETE /admin/bus/:id**: Delete a bus
- **POST /admin/ticket**: Upload a new ticket for a bus
- **PUT /admin/ticket/:id**: Update ticket information
- **DELETE /admin/ticket/:id**: Delete a ticket

### **User APIs**
- **GET /buses**: View all available buses
- **GET /tickets**: View available tickets for specific buses
- **POST /tickets/purchase**: Purchase a ticket for a specific bus and time


[Postman API doc link: ](https://documenter.getpostman.com/view/29092897/2sAYBXBWYj)     https://documenter.getpostman.com/view/29092897/2sAYBXBWYj

## Happy Codding 👩‍💻 </>
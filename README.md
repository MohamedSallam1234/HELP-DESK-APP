Help Desk App
This is a full-stack Help Desk application built with Vite, React, and Node.js. The application enables users to manage support tickets, authenticate securely, and access a categorized knowledge base.

Table of Contents
Project Structure
Features
Technologies
Installation
Usage
Configuration
API Endpoints
Contributing
License
Project Structure
The project is divided into two main directories: frontend and backend. The frontend directory contains the React application, while the backend directory contains the Node.js server.

help-desk-app/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md

HELP-DESK-APP/ ├── frontend/ │ ├── index.html │ ├── src/ │ │ ├── main.jsx │ │ ├── App.jsx │ │ ├── components/ │ │ ├── pages/ │ │ └── ... │ └── vite.config.js └── backend/ ├── models/ │ └── knowledgeModel.js ├── controllers/ ├── routes/ ├── server.js └── ...



## Features
- **User Authentication**: Login, registration, and OTP verification for secure access.
- **Ticket Management**: Users can create, view, and manage tickets.
- **Knowledge Base**: Access a categorized repository of FAQs and support articles.
- **Admin Panel**: Manage users, roles, and permissions.
- **Analytics and Reporting**: Generate and view reports for user activities and tickets.

## Technologies

### Frontend
- Vite
- React
- JavaScript
- CSS

### Backend
- Node.js
- Express
- MongoDB

## Installation

### Prerequisites
- **Node.js** and **npm** installed on your machine.
- **MongoDB** database set up and accessible.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/HELP-DESK-APP.git
   cd HELP-DESK-APP


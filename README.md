# Auction Challenge App

## Introduction

This project is a flexible platform developed for researchers to conduct a decision-making experiment under conditions of uncertainty. The experiment simulates an auction and involves around 500 participants. The technological stack includes Node.js, Express, React, MUI, and MongoDB, chosen for their flexibility and rapid deployment capabilities. The application is available at [https://auction-game-seven.vercel.app](https://auction-game-seven.vercel.app).

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Usage](#usage)
- [Frontend](#frontend)
- [Backend](#backend)

## Project Overview

### Challenge

The project needed to accommodate changing requirements and ensure seamless collaboration with researchers through continuous prototype sharing and adjustments.

### Solution

1. **Specification Phase**: Developed a project specification based on an illustrative presentation and question dataset.
2. **Design Phase**: Designed the frontend structure, API, and database schema.
3. **Implementation and Deployment**: Implemented the project and deployed using Vercel and Render.

### Results

The system met the research needs, providing flexibility for future adjustments. Regular collaboration ensured that each phase was developed correctly, handling elements like user management, data processing, and real-time management efficiently.

## Technology Stack

- **Frontend**: React, MUI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Deployment**: Vercel (client), Render (server)

## Usage

The application consists of several stages for the user:

1. Login: Users enter their worker ID.
2. Instructions: Progress bar-guided instructions.
3. Explanations: Detailed explanations with screenshots.
4. Understanding Test: A 10-question test to ensure users understand the experiment.
5. Training: Users complete training rounds.
6. User Details Form: Users fill in their details.
7. Main Test: The core of the experiment with 25 questions.
8. Game Summary Survey: Final survey and feedback.

## Frontend

The frontend is built with React and MUI, providing a responsive and intuitive user interface.

### Pages

- Login Page: User authentication.
- Instructions Page: Step-by-step instructions with a progress bar.
- Understanding Test Page: A quiz to ensure user understanding.
- Training Page: Practice rounds for users.
- User Details Form Page: Collects user information.
- Test Page: Main test interface with a timer and status bar.
- Survey Page: Collects final user feedback.

## Backend

The backend is powered by Node.js and Express, handling API requests and database interactions with MongoDB.

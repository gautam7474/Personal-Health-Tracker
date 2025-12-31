# Personal Health Tracker

A React Native mobile application built with Expo to track daily health activities such as water intake, steps, and sleep. The app stores data locally using AsyncStorage.

## Features

- Welcome Screen  
  Simple onboarding screen for first-time users.

- Dashboard  
  - View today's summary for water, steps, and sleep  
  - Quick action buttons to log activities

- Activity Logging  
  - Input validation to prevent empty entries  
  - Optional notes for each activity

- History  
  - View past activities grouped by date (Today, Yesterday, Older)  
  - Pull-to-refresh to update activity list

- Data Persistence  
  - Data remains available even after closing the app

## Tech Stack

- Framework: React Native (Expo)
- Navigation: React Navigation (Native Stack v6)
- Storage: AsyncStorage
- Language: JavaScript

## How to Run Locally

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/health-tracker.git

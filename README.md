# NirogGyan - Healthcare Appointment Booking Interface

NirogGyan is a React-based healthcare appointment booking interface that allows users to view doctors, check their availability, and book appointments. The application features a clean, responsive UI built using React functional components and hooks.

## Core Features

- **Landing Page**: List of doctors with search functionality
- **Doctor Profile Page**: Detailed doctor information with available slots
- **Book Appointment**: Form with validation to schedule appointments
- **My Appointments**: View booked appointments

## Tech Stack

- **React.js** - Functional components with hooks
- **React Router** - For client-side routing
- **React Context API** - For state management
- **CSS** - Custom styling with responsive design
- **localStorage** - For data persistence

## Project Structure

```
NirogGyan/
├── public/                # Static files
│   └── assets/            # Images for doctor profiles
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # Context for state management
│   ├── pages/             # Page components
│   └── App.js             # Main component with routing
└── README.md             # Project documentation
```

## Setup Instructions

### Prerequisites
- Node.js and npm installed

### Installation
1. Clone the repository or download the zip file
2. Navigate to the project directory and install dependencies:
   ```
   cd NirogGyan/frontend
   npm install
   ```
3. **Important**: Add doctor images to the assets folder
   - Download 5 professional doctor profile images
   - Rename them to: `doctor1.jpg`, `doctor2.jpg`, `doctor3.jpg`, `doctor4.jpg`, `doctor5.jpg`
   - Place these files in `public/assets/` directory

### Running the Application
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`

## Features Implemented

### Required Features
- Landing page with list of doctors, search functionality
- Doctor profile page showing availability and booking option
- Appointment booking form with validation
- Responsive design for all screen sizes

### Additional Features
- My Appointments page to view booked appointments
- Context API for state management
- Form validation and error handling
- Data persistence using localStorage
- Loading states and error handling

## Future Improvements

With more time, I would add:
- User authentication
- More detailed doctor profiles with reviews
- Calendar view for appointment scheduling
- Filter options for specializations
- Pagination for larger lists
- Unit and integration tests

## Challenges Faced

- Managing state across components: Solved using React Context API
- Form validation: Implemented custom validation logic
- Responsive design: Used CSS media queries to ensure mobile-first approach

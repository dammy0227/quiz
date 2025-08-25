import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterStudentPage from './pages/RegisterPage/RegisterStudentPage';
import RegisterInstructorPage from './pages/RegisterPage/RegisterInstructorPage';
import StudentDashboardPage from './pages/student/StudentDashboardPage/StudentDashboardPage';
import QuizPage from './pages/student/QuizPage/QuizPage';
import ResultsPage from './pages/student/ResultsPage/ResultsPage';
import InstructorDashboardPage from './pages/instructor/InstructorDashboardPage/InstructorDashboardPage';
import CreateQuizPage from './pages/instructor/CreateQuizPage/CreateQuizPage';
import ManageQuizzesPage from './pages/instructor/ManageQuizzesPage/ManageQuizzesPage';
import QuizResultsPage from './pages/instructor/QuizResultsPage/QuizResultsPage';
import EditQuizPage from './pages/instructor/EditQuizPage/EditQuizPage';
import './App.css'

// Context Providers
import AuthProvider from './context/AuthProvider';
import QuizProvider from './context/QuizProvider';

// Private Route
import PrivateRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<LandingPage />} />

            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register/student" element={<RegisterStudentPage />} />
            <Route path="/register/instructor" element={<RegisterInstructorPage />} />

            {/* Student routes */}
            <Route
              path="/student/dashboard"
              element={
                <PrivateRoute allowedRoles={['student']}>
                  <StudentDashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/student/quiz/:id"
              element={
                <PrivateRoute allowedRoles={['student']}>
                  <QuizPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/student/results"
              element={
                <PrivateRoute allowedRoles={['student']}>
                  <ResultsPage />
                </PrivateRoute>
              }
            />

            {/* Instructor routes */}
            <Route
              path="/instructor/dashboard"
              element={
                <PrivateRoute allowedRoles={['instructor']}>
                  <InstructorDashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/instructor/create-quiz"
              element={
                <PrivateRoute allowedRoles={['instructor']}>
                  <CreateQuizPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/instructor/edit-quiz/:id"
              element={
                <PrivateRoute allowedRoles={['instructor']}>
                  <EditQuizPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/instructor/manage-quizzes"
              element={
                <PrivateRoute allowedRoles={['instructor']}>
                  <ManageQuizzesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/instructor/quiz-results/:quizId"
              element={
                <PrivateRoute allowedRoles={['instructor']}>
                  <QuizResultsPage />
                </PrivateRoute>
              }
            />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;

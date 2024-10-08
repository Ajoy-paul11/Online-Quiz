import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import { Toaster } from "react-hot-toast";
import HeroSection from "./components/HeroSection.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import DisplayQuiz from "./components/DisplayQuiz.jsx";
import AuthProvider from "./userContext/AuthContext.jsx";
import Quiz from "./components/quiz/Quiz.jsx";
import QuizDetails from "./components/quiz/QuizDetails.jsx";
import UpdateQuizDetails from "./components/quiz/UpdateQuizDetails.jsx";
import AddQuestion from "./components/quiz/AddQuestion.jsx";
import UpdateQuestion from "./components/quiz/UpdateQuestion.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import QuizTest from "./components/QuizTest.jsx";
import ShowResults from "./components/ShowResults.jsx";
import EditQuizzes from "./components/quiz/EditQuizzes.jsx";

export const URL = "http://localhost:5000/api/v1";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HeroSection />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/all-quiz",
        element: (
          <ProtectedRoute>
            <DisplayQuiz />
          </ProtectedRoute>
        ),
      },
      {
        path: "/results",
        element: (
          <ProtectedRoute>
            <ShowResults />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-quizzes",
        element: <EditQuizzes />,
      },
    ],
  },
  {
    path: "/quiz/create",
    element: <Quiz />,
  },
  {
    path: "/quiz/:id",
    element: <QuizDetails />,
  },
  {
    path: "/quiz/update/:id",
    element: <UpdateQuizDetails />,
  },
  {
    path: ":id/questions/add",
    element: <AddQuestion />,
  },
  {
    path: "/questions/update/:id",
    element: <UpdateQuestion />,
  },
  {
    path: "/quiz/test/:id",
    element: <QuizTest />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);

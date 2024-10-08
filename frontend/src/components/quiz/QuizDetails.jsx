import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../main";
import toast from "react-hot-toast";
import GetQuestions from "./GetQuestions";

function QuizDetails() {
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URL}/quiz/${id}`);
        setQuiz(response.data.data);
      } catch (err) {
        setError("Failed to fetch quiz details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [id]);

  const handleQuiz = async () => {
    try {
      await axios.delete(`${URL}/quiz/${id}`);
      toast.success("Quiz deleted successfully");
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        console.log("An unexpected error occurred: ", err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!quiz) return <div>No quiz found</div>;

  return (
    <div>
      <div className=" w-full pt-[50px] min-h-screen bg-[#202829]">
        <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <button
            type="button"
            onClick={handleQuiz}
            className=" focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
          <Link
            to="/edit-quizzes"
            className=" text-[#6165d7] float-end underline"
          >
            Go to All Quizzes
          </Link>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Quiz name: {quiz.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Remarks: {quiz.description}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Time-Limit: {quiz.timeLimit}
          </p>
          <div className=" flex justify-between items-center">
            <Link
              to={`/quiz/update/${id}`}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              update Quiz
            </Link>
            <Link
              to={`/${id}/questions/add`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Question
            </Link>
          </div>
        </div>
        <div className=" py-6 ">
          <GetQuestions id={id} />
        </div>
      </div>
    </div>
  );
}

export default QuizDetails;

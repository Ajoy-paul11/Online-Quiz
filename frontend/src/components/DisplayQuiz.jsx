import React, { useState, useEffect } from "react";
import { URL } from "../main";
import axios from "axios";
import { Link } from "react-router-dom";

function DisplayQuiz() {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URL}/quiz`);
        if (response.data.data) {
          setQuiz(response.data.data);
        }
      } catch (err) {
        if (err.response.data && err.response) {
          setError("Failed to fetch question details");
          console.error(err.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!quiz) return <div>No Question found</div>;

  return (
    <div className=" bg-[#202829] flex gap-4 flex-wrap min-h-screen p-6">
      {quiz?.map((q, i) => (
        <div
          key={i}
          className="w-[80%] mx-auto p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Quiz Name: {q.title}
          </h5>
          <p className="mb-3 font-normal text-[#FFFFF0] ">
            Description: {q.description}
          </p>
          <p className="mb-3 font-normal text-[#FFFFF0] ">
            Time: {q.timeLimit} minutes,
            <span className=" mx-6">Total Questions: {q.questions.length}</span>
          </p>
          <Link
            to={`/quiz/test/${q._id}`}
            className=" float-left focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Give Test
          </Link>
        </div>
      ))}
    </div>
  );
}

export default DisplayQuiz;

import React, { useState, useEffect } from "react";
import { URL } from "../../main";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function GetQuestions({ id }) {
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URL}/questions/${id}`);
        if (response.data.data) {
          setQuestion(response.data.data);
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

    fetchQuestionDetails();
  }, [id]);

  const handleQuestion = async (q_id) => {
    try {
      await axios.delete(`${URL}/questions/${q_id}`);
      toast.success("Quiz deleted successfully");
      window.location.reload();
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
  if (!question) return <div>No Question found</div>;

  return (
    <div className=" flex flex-wrap gap-4">
      {question?.map((q, i) => (
        <div
          key={i}
          className="w-[80%] mx-auto p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Question: {q.text}
          </h5>
          <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Options:
            <ul className=" flex flex-wrap gap-3 text-[#FFFFF0]">
              {q.options?.map((option, index) => (
                <li key={index}>
                  {index + 1}. {option}
                </li>
              ))}
            </ul>
          </div>
          <p className="mb-3 font-normal text-[#FFFFF0] ">
            Correct Answer: {q.correctAnswer}
          </p>
          <div className=" mb-2">
            <Link
              to={`/questions/update/${q._id}`}
              state={{ quiz_id: id }}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 me-1 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              update Question
            </Link>
            <button
              type="button"
              onClick={() => handleQuestion(q._id)}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 me-1 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetQuestions;

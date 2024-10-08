import React, { useState, useEffect } from "react";
import { URL } from "../main";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../userContext/AuthContext.jsx";

function ShowResults() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URL}/attempt/${authUser._id}`);
        if (response.data.data) {
          setResult(response.data.data);
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
  if (!result) return <div>No Question found</div>;

  return (
    <div className=" bg-[#202829] flex gap-4 flex-wrap min-h-screen p-6">
      {result?.map((r, i) => (
        <div
          key={i}
          className="w-[80%] mx-auto p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Total scored: {r.score}
          </h5>

          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Total percentage: {r.percentage}
          </h5>
        </div>
      ))}
    </div>
  );
}

export default ShowResults;

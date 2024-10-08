import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../userContext/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../main";

function QuizTest() {
  const [quizInfo, setQuizInfo] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      handleSubmit(onSubmit)();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const { id } = useParams();
  const { authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getQuizInfo = async () => {
      try {
        const response = await axios.get(`${URL}/quiz/${id}`);
        if (response.data.data) {
          setQuizInfo(response.data.data);
          toast.success("Quiz information fetched successfully");
          setTimeLeft(response.data.data.timeLimit * 60);
        }
      } catch (err) {
        if (err.response && err.response.data) {
          toast.error(err.response.data.message);
        } else {
          console.log("Something went wrong", err.message);
        }
      }
    };
    getQuizInfo();
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(authUser);

    if (!authUser) {
      toast.error("User not authenticated");
      return;
    }

    const testData = {
      userId: authUser._id,
      quizId: id,
      answers: Object.entries(data)?.map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer,
      })),
    };

    try {
      const response = await axios.post(`${URL}/attempt/create`, testData);
      if (response.data.data) {
        toast.success("Attempt of Quiz submitted successfully");
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        console.log("Something went wrong", err.message);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {quizInfo.title}
      </h1>
      <div className="mb-6 text-center">
        <span className="text-xl font-semibold text-gray-700">Time Left: </span>
        <span className="text-xl font-bold text-red-600">
          {timeLeft !== null ? formatTime(timeLeft) : "Loading..."}
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {quizInfo.questions?.map((question) => (
          <div key={question._id} className="bg-gray-50 p-4 rounded-md">
            <p className="text-lg font-medium mb-3 text-gray-800">
              {question.text}
            </p>
            <div className="space-y-2">
              {question.options?.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-3 text-gray-700"
                >
                  <input
                    type="radio"
                    value={option}
                    {...register(question._id, {
                      required: "This question is required",
                    })}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors[question._id] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[question._id].message}
              </p>
            )}
          </div>
        ))}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Quiz
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuizTest;

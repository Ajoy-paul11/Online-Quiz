import React from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { URL } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";

function AddQuestion() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const questionData = {
      text: data.text,
      correctAnswer: data.correctAnswer,
      option1: data.option1,
      option2: data.option2,
      option3: data.option3,
      quizId: id,
    };

    try {
      const response = await axios.post(
        `${URL}/questions/create`,
        questionData
      );

      if (response.data.data) {
        reset();
        navigate(`/quiz/${id}`);
        toast.success("Question added successfully");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.error("Question adding error:", err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        console.error("An unexpected error occurred:", err.message);
      }
    }
  };

  return (
    <div className=" bg-[#202829] py-[84px]">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Question
          </label>
          <input
            type="text"
            id="text"
            autoComplete="question"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            {...register("text", { required: true })}
          />
          {errors.text && (
            <span className=" text-red-500">Text is required</span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="option1"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Option-1
          </label>
          <input
            type="text"
            id="option1"
            autoComplete="current-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("option1", { required: true })}
          />
          {errors.option1 && (
            <span className=" text-red-500">Options is required</span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="option2"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Option-2
          </label>
          <input
            type="text"
            id="option2"
            autoComplete="current-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("option2", { required: true })}
          />
          {errors.option2 && (
            <span className=" text-red-500">Options is required</span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="option3"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Option-3
          </label>
          <input
            type="text"
            id="option3"
            autoComplete="current-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("option3", { required: true })}
          />
          {errors.option3 && (
            <span className=" text-red-500">Options is required</span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="correctAnswer"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Correct Answer
          </label>
          <input
            type="text"
            id="correctAnswer"
            autoComplete="current-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("correctAnswer", { required: true })}
          />
          {errors.correctAnswer && (
            <span className=" text-red-500">Correct answer is required</span>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Question
        </button>
      </form>
    </div>
  );
}

export default AddQuestion;

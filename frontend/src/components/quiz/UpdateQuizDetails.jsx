import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";

function UpdateQuizDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const quizData = {
      title: data.title,
      description: data.description,
      timeLimit: data.timeLimit,
    };

    try {
      const response = await axios.patch(`${URL}/quiz/${id}`, quizData);

      if (response.data.data) {
        let quiz = response.data.data;
        toast.success("Quiz updated successfully");
        reset();
        navigate(`/quiz/${quiz._id}`);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.error("Quiz updated error:", err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        console.error("An unexpected error occurred:", err.message);
      }
    }
  };

  return (
    <div className=" bg-[#202829] py-[150px] h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            for="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter the name of the quiz
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className=" text-red-500">Title is required</span>
          )}
        </div>
        <div className="mb-5">
          <label
            for="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter your remarks
          </label>
          <input
            type="text"
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className=" text-red-500">Remarks is required</span>
          )}
        </div>
        <div className="mb-5">
          <label
            for="timeLimit"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Time Limit
          </label>
          <input
            type="number"
            id="timeLimit"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("timeLimit", { required: true })}
          />
          {errors.timeLimit && (
            <span className=" text-red-500">Time Limit is required</span>
          )}
        </div>
        <button
          type="submit"
          className="text-[#FFFFF0] mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Quiz
        </button>
      </form>
    </div>
  );
}

export default UpdateQuizDetails;

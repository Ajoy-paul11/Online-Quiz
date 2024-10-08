import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../userContext/AuthContext.jsx";
import { URL } from "../main.jsx";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(`${URL}/users/login`, userData);

      if (response.data.data) {
        navigate("/");
        setAuthUser(response.data.data);
        toast.success("User LoggedIn successfully");
        reset();
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.error("Register error:", err.response.data.message);
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
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className=" text-red-500">Email is required</span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className=" text-red-500">Password is required</span>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <p className=" flex justify-end">
          <span className="text-[#FFFFF0]"> Don't have an account❓</span>
          <Link
            to="/register"
            className=" cursor-pointer underline text-blue-500"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { URL } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../userContext/AuthContext.jsx";

function Register() {
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
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    try {
      const response = await axios.post(`${URL}/users/register`, userData);

      if (response.data.data) {
        setAuthUser(response.data.data);
        toast.success("User registered successfully");
        reset();
        navigate("/");
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
    <div className=" bg-[#202829] py-[80px]">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your username..."
            required
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className=" text-red-500">Username is required</span>
          )}
        </div>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your email..."
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className=" text-red-500">Password is required</span>
          )}
        </div>
        <label
          htmlFor="role"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select your Role
        </label>
        <select
          id="role"
          className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("role", { required: true })}
        >
          <option value="">Select a role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && <span className=" text-red-500">Role is required</span>}
        <br />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
        <p className=" flex justify-end">
          <span className="text-[#FFFFF0]"> Already have an account❓</span>
          <Link to="/login" className=" cursor-pointer underline text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;

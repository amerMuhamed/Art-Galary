import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../api/shopServer";  // Rename to avoid conflict
import { AuthContext } from "../../hooks/UserContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { saveAuthenticationData, authenticationData } =
    useContext(AuthContext);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    address: yup.string().required("Address is required"),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,  
  } = useForm({
    resolver: yupResolver(schema),
  });
const onSubmit = async (data) => {
    const response = await registerUser(data);
    saveAuthenticationData(response.token);
    if (response.success) {
      setSuccessMessage(response.message); 
      setErrorMessage('');
      navigate('/products');
    } else {
      setErrorMessage(response.message);  
      setSuccessMessage('');
    }
  };


  return (
    <div
      className="justify-center items-center  flex flex-col h-fit py-10"
      style={{ backgroundColor: "rgb(80 108 91 / 71%)" }}
    >
      <h1 className="text-center text-3xl font-bold mb-5">Register</h1>
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="mb-4 py-4 px-8 border bg-red-100 border-red-600 text-red-600 rounded-xl animate-pulse">
              <p>{error}</p>
            </div>
          )}
          <div className=" mb-5 flex flex-col">
            <label className="block text-zinc-950  text-lg font-semibold mb-2">
              User Name
            </label>
            <input
              {...register("username")}
              className={`shadow-sm focus:ring focus:ring-teal-300 focus:outline-none px-1 py-2 border rounded-md text-slate-800 ${
                errors.username && "border-red-500"
              }`}
              placeholder="Enter User Name"
              type="text"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-5 flex flex-col">
            <label className="block text-zinc-950  text-lg font-semibold mb-2">
              Password
            </label>
            <input
              {...register("password")}
              className={`shadow-sm focus:ring focus:ring-teal-300 focus:outline-none px-1 py-2 border rounded-md text-slate-800 ${
                errors.password && "border-red-500"
              }`}
              placeholder="Enter Password"
              type="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-5 flex flex-col">
            <label className="block text-zinc-950  text-lg font-semibold mb-2">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              className={`shadow-sm focus:ring focus:ring-teal-300 focus:outline-none px-1 py-2 border rounded-md text-slate-800 ${
                errors.confirmPassword && "border-red-500"
              }`}
              placeholder="Enter Password"
              type="password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="mb-5 flex flex-col">
            <label className="block text-zinc-950  text-lg font-semibold mb-2">
              Email
            </label>
            <input
              {...register("email")}
              className={`shadow-sm focus:ring focus:ring-teal-300 focus:outline-none px-1 py-2 border rounded-md text-slate-800 ${
                errors.email && "border-red-500"
              }`}
              placeholder="Enter Email"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-5 flex flex-col">
            <label className="block text-zinc-950  text-lg font-semibold mb-2">
            Address
            </label>
            <input
              {...register("address")}
              className={`shadow-sm focus:ring focus:ring-teal-300 focus:outline-none px-1 py-2 border rounded-md text-slate-800 ${
                errors.address && "border-red-500"
              }`}
              placeholder="Enter Adress"
              type="text"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;

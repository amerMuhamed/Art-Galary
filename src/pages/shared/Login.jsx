import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../../api/shopServer";
import { AuthContext } from "../../hooks/UserContext";
import "./_styles.css";
const Login = () => {
  const { saveAuthenticationData, authenticationData } =
    useContext(AuthContext);

  if (authenticationData) {
    window.location.href = "/products";
  }

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const authData = await login(data.username, data.password);
      saveAuthenticationData(authData.token);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containeer ">
      <div
        className="absolute top-1/2
     left-1/2 transform -translate-x-1/2 
     -translate-y-1/2  
     border rounded-lg  shadow-xl px-7 pb-3"
     style={{backgroundColor:"#00000033"}}
      >
        <div className="mt-2 text-white p-8 text-2xl font-bold">
          <h1>Welcome to Pixelate</h1>
        </div>
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
              <p className="text-red-600 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-5 flex flex-col">
            <label className="block text-zinc-950  text-lg font-semibold mb-2">
              Password
            </label>
            <input
              {...register("password")}
              className={`shadow-sm focus:ring focus:ring-teal-300 focus:outline-none px-1 py-2 border rounded-md text-slate-800 ${
                errors.username && "border-red-500"
              }`}
              placeholder="Enter Password"
              type="password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full mt-7 bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 rounded-lg shadow-lg hover:from-teal-500 hover:to-blue-600 focus:ring-4 focus:ring-teal-300 focus:outline-none flex justify-center items-center font-semibold text-xl transition-transform duration-300 transform hover:scale-95"
          >
            {loading ? (
              <span
                className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"
                role="status"
              ></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

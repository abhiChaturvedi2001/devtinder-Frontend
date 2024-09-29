import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../utils/userSlice";

const Login = () => {
  const [userEmail, setuserEmail] = useState("chaturvedia435@gmail.com");
  const [userPassword, setuserPassword] = useState("Abhishek@2002");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (userEmail === "" || userPassword === "") {
      return toast.error("Filds Mandatory");
    }
    try {
      const response = await axios.post(
        "http://localhost:6060/login",
        {
          emailId: userEmail,
          password: userPassword,
        },
        { withCredentials: true }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(loginUser(response?.data?.user));
        navigate("/");
      }
    } catch (error) {
      return toast.error(error.message);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center h-[80vh] ">
        <div className="card bg-base-100 w-96 shadow-xl">
          <h1 className="font-bold text-center pt-5 capitalize">Login</h1>
          <p className="text-center font-bold pt-2 capitalize">
            Happy to see you DevTinder
          </p>
          <div className="card-body">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                value={userEmail}
                onChange={(e) => setuserEmail(e.currentTarget.value)}
                type="text"
                className="grow"
                placeholder="exmaple@gmail.com"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                value={userPassword}
                placeholder="password"
                onChange={(e) => setuserPassword(e.currentTarget.value)}
              />
            </label>
            <div className="card-actions justify-center">
              <button onClick={handleLogin} className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

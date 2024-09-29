import React, { useEffect } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Feed from "./component/Feed";
import Login from "./component/Login";
import Header from "./component/Header";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginUser } from "./utils/userSlice";

const App = () => {
  const dispatch = useDispatch();
  // fetching the profile herer to logged in always until the user is not logged inn
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:6060/profile`, {
        withCredentials: true,
      });
      dispatch(loginUser(response?.data?.user));
    } catch (error) {}
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default App;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/userSlice";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await axios.post(
      `http://localhost:6060/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      dispatch(logoutUser());
      navigate("/login");
    }
  };
  return (
    <>
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl font-bold">DevTinder</a>
        </div>
        {user && (
          <div className="flex-none gap-2">
            <h1 className="font-bold"> welcome {user.firstName}</h1>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
        {!user && (
          <Link to={"/login"}>
            <button className="btn btn-neutral">Login</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Header;

import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchFeedData = async () => {
    try {
      const response = await axios.get(`http://localhost:6060/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.getAllUser));
    } catch (error) {
      if (!error.response?.data?.success) {
        return navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, []);

  console.log(feedData);

  return <div>Feed</div>;
};

export default Feed;

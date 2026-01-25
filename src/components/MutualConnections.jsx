import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getStoredAuth } from "../utils/authUtils";
import { BASE_URL } from "../utils/constants";
import { setMutualConnections } from "../utils/mutualConnectionSlice";
import ConnectionCard from "./ConnectionCard";
import { DisconnectButton } from "./ConnectionActions";
import defaultAvatar from "../assets/logo/default-avatar.svg";

const MutualConnections = () => {
  const connections = useSelector((store) => store.mutualConnection);
  const loggedInUser = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { accessToken } = getStoredAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMutualConnections = async () => {
    if (connections) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/connections`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // API returns data directly without success flag
      if (response.data.data && Array.isArray(response.data.data)) {
        dispatch(setMutualConnections(response.data.data));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch mutual connections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMutualConnections();
  }, []);

  // Helper function to extract the connected user (not the logged-in user)
  const getConnectedUser = (connection) => {
    if (!loggedInUser) return null;

    const loggedInUserId = loggedInUser._id;

    // Determine which user is the connected user (not the logged-in user)
    const connectedUserData =
      connection.fromUserId._id === loggedInUserId
        ? connection.toUserId
        : connection.fromUserId;

    // Transform to match ConnectionCard's expected format
    return {
      id: connectedUserData._id,
      firstName: connectedUserData.firstName,
      lastName: connectedUserData.lastName,
      username: connectedUserData.username,
      profilePhoto: connectedUserData.profilePhoto || defaultAvatar,
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6 sm:py-8 md:py-10">
        <span className="loading loading-spinner loading-md sm:loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-6 sm:py-8 md:py-10">
        <div className="alert alert-error max-w-md shadow-lg">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs sm:text-sm">{error}</span>
        </div>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="flex justify-center items-center py-6 sm:py-8 md:py-10">
        <div className="card bg-base-300 w-full max-w-md shadow-xl rounded-lg">
          <div className="card-body p-6 sm:p-8 md:p-10 text-center space-y-3 sm:space-y-4">
            {/* Users icon */}
            <div className="flex justify-center">
              <svg
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-base-content/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-base-content">
                No Mutual Connections Yet
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-base-content/60 mt-2">
                Start connecting with other developers to build your network
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2.5 sm:gap-3 md:gap-4">
      {connections.map((connection) => {
        const connectedUser = getConnectedUser(connection);
        if (!connectedUser) return null;

        return (
          <ConnectionCard
            key={connection._id}
            user={connectedUser}
            actions={<DisconnectButton connection={connection} />}
          />
        );
      })}
    </div>
  );
};

export default MutualConnections;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getStoredAuth } from "../utils/authUtils";
import { BASE_URL } from "../utils/constants";
import { setsentConnections } from "../utils/sentConnectionSlice";
import ConnectionCard from "./ConnectionCard";
import { CancelButton } from "./ConnectionActions";
import defaultAvatar from "../assets/logo/default-avatar.svg";

const SentConnections = () => {
  const connections = useSelector((store) => store.sentConnection);
  const dispatch = useDispatch();
  const { accessToken } = getStoredAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSentConnections = async () => {
    if (connections) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/connections/sent`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // API returns data directly without success flag
      if (response.data.data && Array.isArray(response.data.data)) {
        dispatch(setsentConnections(response.data.data));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch sent connections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSentConnections();
  }, []);

  // Helper function to extract the recipient user from toUserId
  const getRecipientUser = (connection) => {
    // For sent connections, toUserId is always the recipient
    const recipientData = connection.toUserId;

    // Transform to match ConnectionCard's expected format
    return {
      id: recipientData._id,
      firstName: recipientData.firstName,
      lastName: recipientData.lastName,
      username: recipientData.username,
      profilePhoto: recipientData.profilePhoto || defaultAvatar,
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
            {/* Send icon */}
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-base-content">
                No Sent Requests
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-base-content/60 mt-2">
                You haven't sent any connection requests yet. Start exploring!
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
        const recipientUser = getRecipientUser(connection);

        return (
          <ConnectionCard
            key={connection._id}
            user={recipientUser}
            actions={<CancelButton connection={connection} />}
          />
        );
      })}
    </div>
  );
};

export default SentConnections;

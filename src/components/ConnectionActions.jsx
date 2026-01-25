import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { getStoredAuth } from "../utils/authUtils";
import { removeReceivedConnectionById } from "../utils/receivedConnectionSlice";
import { addMutualConnection, removeMutualConnectionById } from "../utils/mutualConnectionSlice";
import { removeSentConnectionById } from "../utils/sentConnectionSlice";
import { removeBlockedConnectionById } from "../utils/blockedConnectionSlice";

const acceptConnection = async (requestId, connection, dispatch) => {
  try {
    const { accessToken } = getStoredAuth();
    const response = await axios.patch(
      `${BASE_URL}/connections/${requestId}/accept`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Update Redux store on success
    dispatch(removeReceivedConnectionById(requestId));
    dispatch(addMutualConnection(connection));

    return response.data;
  } catch (error) {
    console.error("Error accepting connection:", error);
    throw error;
  }
};

const rejectConnection = async (requestId, dispatch) => {
  try {
    const { accessToken } = getStoredAuth();
    const response = await axios.patch(
      `${BASE_URL}/connections/${requestId}/reject`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Update Redux store on success
    dispatch(removeReceivedConnectionById(requestId));

    return response.data;
  } catch (error) {
    console.error("Error rejecting connection:", error);
    throw error;
  }
};

const cancelSentConnection = async (requestId, dispatch) => {
  try {
    const { accessToken } = getStoredAuth();
    const response = await axios.delete(
      `${BASE_URL}/connections/${requestId}/cancel`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Update Redux store on success - remove from sent connections
    dispatch(removeSentConnectionById(requestId));

    return response.data;
  } catch (error) {
    console.error("Error cancelling sent request:", error);
    throw error;
  }
};

const disconnectConnection = async (connectionId, dispatch) => {
  try {
    const { accessToken } = getStoredAuth();
    const response = await axios.delete(
      `${BASE_URL}/connections/${connectionId}/disconnect`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(removeMutualConnectionById(connectionId));

    return response.data;
  } catch (error) {
    console.error("Error disconnecting connection:", error);
    throw error;
  }
};

export const DisconnectButton = ({ connection }) => {
  const dispatch = useDispatch();
  const { _id: connectionId } = connection;

  const handleDisconnect = async () => {
    try {
      await disconnectConnection(connectionId, dispatch);
    } catch (error) {
      console.error("Failed to disconnect connection");
    }
  };
  return (
    <button
      className="btn btn-error btn-xs sm:btn-sm gap-1 sm:gap-1.5"
      onClick={handleDisconnect}
      aria-label="Disconnect from this user"
      title="Disconnect"
    >
      {/* Disconnect icon */}
      <svg
        className="w-3 h-3 sm:w-3.5 sm:h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
        />
      </svg>
      <span className="text-xs sm:text-sm">Disconnect</span>
    </button>
  );
};

export const AcceptRejectButtons = ({ connection }) => {
  const dispatch = useDispatch();
  const { _id: requestId } = connection;

  const handleAccept = async () => {
    try {
      await acceptConnection(requestId, connection, dispatch);
    } catch (error) {
      // Error handling could be improved with toast notifications
      console.error("Failed to accept connection");
    }
  };

  const handleReject = async () => {
    try {
      await rejectConnection(requestId, dispatch);
    } catch (error) {
      // Error handling could be improved with toast notifications
      console.error("Failed to reject connection");
    }
  };

  return (
    <div className="flex gap-1.5 sm:gap-2">
      <button
        className="btn btn-success btn-xs sm:btn-sm gap-1 sm:gap-1.5"
        onClick={handleAccept}
        aria-label="Accept connection request"
        title="Accept"
      >
        {/* Check icon */}
        <svg
          className="w-3 h-3 sm:w-3.5 sm:h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="hidden sm:inline text-xs sm:text-sm">Accept</span>
      </button>
      <button
        className="btn btn-error btn-xs sm:btn-sm gap-1 sm:gap-1.5"
        onClick={handleReject}
        aria-label="Reject connection request"
        title="Reject"
      >
        {/* X icon */}
        <svg
          className="w-3 h-3 sm:w-3.5 sm:h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <span className="hidden sm:inline text-xs sm:text-sm">Reject</span>
      </button>
    </div>
  );
};

export const CancelButton = ({ connection }) => {
  const dispatch = useDispatch();
  const { _id: requestId } = connection;

  const handleCancel = async () => {
    try {
      await cancelSentConnection(requestId, dispatch);
    } catch (error) {
      console.error("Failed to cancel sent request");
    }
  };
  return (
    <button
      className="btn btn-warning btn-xs sm:btn-sm gap-1 sm:gap-1.5"
      onClick={handleCancel}
      aria-label="Cancel connection request"
      title="Cancel Request"
    >
      {/* Cancel icon */}
      <svg
        className="w-3 h-3 sm:w-3.5 sm:h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <span className="text-xs sm:text-sm">Cancel</span>
    </button>
  );
};

const unblockConnection = async (userId, connectionId, dispatch) => {
  try {
    const { accessToken } = getStoredAuth();
    const response = await axios.delete(
      `${BASE_URL}/connections/unblock/${userId}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(removeBlockedConnectionById(connectionId));
    return response.data;
  } catch (error) {
    console.error("Error unblocking user:", error);
    throw error;
  }
};

export const UnblockButton = ({ user, connectionId }) => {
  const dispatch = useDispatch();
  const userId = user.id;

  const handleUnblock = async () => {
    try {
      await unblockConnection(userId, connectionId, dispatch);
    } catch (error) {
      console.error("Failed to unblock user");
    }
  };
  return (
    <button
      className="btn btn-success btn-xs sm:btn-sm gap-1 sm:gap-1.5"
      onClick={handleUnblock}
      aria-label="Unblock this user"
      title="Unblock User"
    >
      {/* Unlock icon */}
      <svg
        className="w-3 h-3 sm:w-3.5 sm:h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
        />
      </svg>
      <span className="text-xs sm:text-sm">Unblock</span>
    </button>
  );
};

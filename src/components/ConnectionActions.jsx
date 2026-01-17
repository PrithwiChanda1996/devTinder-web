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
  return <button className="btn btn-error btn-sm" onClick={handleDisconnect}>Disconnect</button>;
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
    <div className="flex gap-2">
      <button className="btn btn-success btn-sm" onClick={handleAccept}>
        Accept
      </button>
      <button className="btn btn-error btn-sm" onClick={handleReject}>
        Reject
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
    <button className="btn btn-warning btn-sm" onClick={handleCancel}>
      Cancel
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
    <button className="btn btn-warning btn-sm" onClick={handleUnblock}>
      Unblock
    </button>
  );
};

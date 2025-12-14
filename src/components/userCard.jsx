import React from "react";
import avatar from "../assets/images/avatar.png";
import FeedActions from "./FeedActions";

const userCard = ({ user, actions }) => {
  const { id, firstName, lastName, username, email, profilePhoto, about } =
    user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm rounded-md">
        <figure className="h-96 w-full overflow-hidden">
          <img
            src={profilePhoto || avatar}
            alt="User Profile Photo"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-500">{username}</p>
          <small className="text-sm text-gray-500 cursor-pointer flex justify-end">
            show more
          </small>
          <div className="card-actions justify-left flex flex-row gap-3">
            {actions || <FeedActions user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default userCard;

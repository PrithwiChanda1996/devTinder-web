import React from "react";
import defaultAvatar from "../assets/logo/default-avatar.svg";

const ConnectionCard = ({ user, actions }) => {
  const { id, firstName, lastName, username, profilePhoto } = user;

  return (
    <div
      key={id}
      className="card bg-base-300 shadow-lg hover:shadow-xl transition-shadow rounded-lg"
    >
      <div className="card-body p-3 sm:p-4 md:p-5">
        <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
          {/* Avatar */}
          <div className="avatar flex-shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full ring-2 ring-base-content/10">
              <img
                src={profilePhoto || defaultAvatar}
                alt={`${firstName} ${lastName}`}
                className={`rounded-full ${
                  profilePhoto ? "object-cover" : "object-contain"
                }`}
              />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-grow min-w-0">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-base-content truncate">
              {firstName} {lastName}
            </h3>
            <p className="text-xs sm:text-sm text-base-content/70 truncate">
              @{username}
            </p>
          </div>

          {/* Actions */}
          <div className="card-actions flex-shrink-0">{actions}</div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;

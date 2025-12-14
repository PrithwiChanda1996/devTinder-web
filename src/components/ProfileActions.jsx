import React from "react";

const ProfileActions = ({ onEdit }) => {
  return (
    <>
      <button className="btn btn-primary w-full" onClick={onEdit}>
        Edit Profile
      </button>
      <div className="divider my-2"></div>
      <p className="text-xs text-center text-gray-500 italic">
        This is how other users will see your profile
      </p>
    </>
  );
};

export default ProfileActions;

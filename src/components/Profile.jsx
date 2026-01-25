import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import UserCard from "./userCard";
import ProfileActions from "./ProfileActions";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="flex items-center justify-center px-3 sm:px-4 py-3 sm:py-4 md:py-5">
      <UserCard
        user={user}
        actions={<ProfileActions onEdit={handleEditProfile} />}
      />
    </div>
  );
};

export default Profile;

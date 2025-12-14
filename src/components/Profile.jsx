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
    <div className="min-h-screen flex items-center justify-center py-8">
      <UserCard
        user={user}
        actions={<ProfileActions onEdit={handleEditProfile} />}
      />
    </div>
  );
};

export default Profile;

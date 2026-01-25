import React from "react";

const ProfileActions = ({ onEdit }) => {
  return (
    <>
      <button 
        className="btn btn-primary btn-sm sm:btn-md w-full gap-2"
        onClick={onEdit}
        aria-label="Edit your profile"
      >
        {/* Edit Icon */}
        <svg 
          className="w-4 h-4 sm:w-5 sm:h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
          />
        </svg>
        <span className="text-xs sm:text-sm">Edit Profile</span>
      </button>
      
      <div className="divider my-2 sm:my-2.5"></div>
      
      <p className="text-xs sm:text-sm text-center text-base-content/60 italic">
        This is how other users will see your profile
      </p>
    </>
  );
};

export default ProfileActions;

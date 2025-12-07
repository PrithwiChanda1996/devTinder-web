export const getStoredAuth = () => ({
  accessToken: localStorage.getItem("accessToken"),
});

export const setStoredAuth = ({ accessToken }) => {
  localStorage.setItem("accessToken", accessToken);
};

export const clearStoredAuth = () => {
  localStorage.removeItem("accessToken");
};

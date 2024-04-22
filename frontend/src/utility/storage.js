import { SECRET_KEY } from "../shared/Constants";

export const fetchUserData = () => {
  const user = localStorage.getItem(SECRET_KEY);

  return JSON.parse(user);
};

export const saveUserData = (data) => {
  data = JSON.stringify(data);
  localStorage.setItem(SECRET_KEY, data);
  return true;
};

export const removeUserData = () => {
  localStorage.removeItem(SECRET_KEY);
};

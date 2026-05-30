import { Navigate } from "react-router-dom";

// Navigate used to redirect user based on certain condition 

export default function ProtectedRoute({ children }) {
  // here we are creating a componenet which takes another component as argument 
  // checks if the user is logged in or not by checking the local storage for user token
  const user = JSON.parse(localStorage.getItem("user"));

  // if user is not logged in then we will redirect them to login page
  if (!user?.token) {
    return <Navigate to="/login" />;
  }

  //otherwise we will render the children component which is the component that we want to protect
  return children;
};
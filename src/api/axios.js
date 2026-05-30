import axios from "axios";


//creating an instance of axios with a base URL for the API
const api = axios.create({
    baseURL : "http://localhost:5000/api",

});

// adding an interceptor to include the token in the headers of each request if the user is logged in
api.interceptors.request.use((config) => {
    //  // Get logged-in user data from localStorage
  // localStorage stores data as string, so JSON.parse converts it back to object
    const user = JSON.parse(localStorage.getItem("user"));

    if(user?.token){
        config.headers.Authorization = `Bearer ${user.token}`;
    // Attach JWT token to Authorization header
    // Backend protect middleware expects:
    // Authorization: Bearer <token>

    }

    // return the modified config with the Authorization header
    return config;
});

export default api;


// FLOW OF TOKEN IN THE APP:
// Frontend calls api.post(...)
//         ↓
// Axios interceptor runs
//         ↓
// Gets user token from localStorage
//         ↓
// Adds Authorization header
//         ↓
// Backend protect middleware reads token
//         ↓
// Route allowed if token is valid
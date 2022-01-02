//make a global varibles to share it across all components
// Note: When the broswer page is, the Context is cleaned
import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

//step 1: Create context
const UserContext = createContext(); // is an object with two properties: Provider and Consumer, both of which are components

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: "",
  });

  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);

  const router = useRouter();
  console.log(`"state.token": ${state && state.token}`);
  // to make it easier:
  const token = state && state.token ? state.token : "";
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // To loged the user out authomaticly after the token is expired we use axios.interceptors
  //intercept responses before they are handled by then or catch
  axios.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger

      return response;
    },
    (err) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      let res = err.response;

      //status code 401 is unauthorized
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        setState(null);
        window.localStorage.removeItem("auth");
        router.push("/login");
      }
    }
  );

  return (
    <UserContext.Provider value={[state, setState]}>
      {" "}
      {/* step 2: Put any value we want to be global in value prop. */}
      {children}{" "}
      {/* step 3: wrap the context provider around the component tree. in another words, put here all components you want them to access the global varibles */}
    </UserContext.Provider>
  );
};
//step 4: Read that value within any component by using the context consumer. using <UserContext.Consumer>

export { UserContext, UserProvider };

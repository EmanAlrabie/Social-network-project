//make a global varibles to share it across all components
// Note: When the broswer page is, the Context is cleaned
import React, { useState, createContext, useEffect } from "react";

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

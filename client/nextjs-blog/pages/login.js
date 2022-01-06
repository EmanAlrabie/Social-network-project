import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthForm from "../components/forms/AuthForm";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../context";

export default function login() {
  const [email, setEmail] = useState("em1@gmail.com");
  const [password, setPassword] = useState("eman1234");
  const [loading, setLoading] = useState(false);

  const [state, setState] = useContext(UserContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {data} = await axios.post(`/login`, {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
      // update context
      setState({
        user: data.user,
        token: data.token,
      });
      // console.log(state.token);
      // save in local storage
      window.localStorage.setItem("auth", JSON.stringify(data.data)); //Converts an object string into a JSON .

      router.push("/user/dashboard");
    }
    } catch (err) {
      console.log(err);
      toast.error(err);
      setLoading(false);
    }
  };

  if (state && state.token) {
    router.push("/");
  }
  return (
    <div className="container">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Login</h1>
        </div>
      </div>

      <div className="row ">
        <div className="col-md-6 offset-md-3">
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            page="login"
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            Not yet registered?{" "}
            <Link href="/register">
              <a>Register</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

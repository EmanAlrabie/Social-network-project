import React, { useState } from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
import AuthForm from '../components/forms/AuthForm';
import { toast } from "react-toastify";


export default function login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // console.log(name, email, password, secret);
        setLoading(true);
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/login`,
          {
            email,
            password,
          }
        );
        router.push("/");
      } catch (err) {
        toast.error(err.response.data);
        setLoading(false);
      }
    };
  
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
    )
}

import React, { useState, useContext } from "react";
import { UserContext} from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import { useRouter } from "next/router";

export default function register() {
  const [state, setState] = useContext(UserContext)

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/register`,
        {
          name,
          email,
          password,
          secret,
        }
      );
      setName("");
      setEmail("");
      setPassword("");
      setSecret("");
      setOk(data.ok);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  if (state && state.token) {router.push('/')}
  return (
    <div>
      <div className="container">
        <div className="row py-5 ">
          <div className="col text-center">
            <h1>Register</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <AuthForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              secret={secret}
              setSecret={setSecret}
              loading={loading}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Modal
            title="Great!"
            visible={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>You have successfully registered.</p>
            <Link href="/login">
              <a className="btn btn-primary btn-sm">Login</a>
            </Link>
          </Modal>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-center"> 
          Already registered?  {" "}
          <Link href="/login">
              <a className="">Login</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";

export default function register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
        secret,
      });
      setOk(data.ok);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
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
            <form onSubmit={handleSubmit}>
              <div className="form-group ">
                <label className="text-muted">Name:</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group py-2">
                <label className="text-muted">Email:</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group py-2">
                <label className="text-muted">Password:</label>
                <input
                  autocomplete="true"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>
              <div className="form-group py-2">
                <label className="text-muted">Pick a qustion:</label>
                <select className="form-control">
                  <option> What's your favourite color?</option>
                  <option> What's your best friend?</option>
                  <option> What city you were born?</option>
                </select>
                <small className="form-text text-muted">
                  You can use this to rest your password if forgotten.
                </small>
              </div>
              <div className="form-group py-2">
                <input
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Write your answer here"
                />
              </div>
              <div className="form-group py-2">
                <button
                  type="submit"
                  className="btn btn-primary col-6 offset-3"
                >
                  Submit
                </button>
              </div>
            </form>
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
    </div>
  );
}

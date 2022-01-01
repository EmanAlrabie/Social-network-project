import React from "react";
import { SyncOutlined } from "@ant-design/icons";

export default function AuthForm({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {page !== "login" && (
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
        )}

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
        {page !== "login" && (
          <>
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
          </>
        )}
        <div className="form-group py-2">
          <button
            disabled={
              page === "login"
                ? !email || !password
                : !name || !email || !password || !secret
            }
            type="submit"
            className="btn btn-primary col-6 offset-3"
          >
            {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
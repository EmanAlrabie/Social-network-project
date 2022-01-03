import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

export default function AuthForm({
  handleSubmit,
  name,
  setName,
  username,
  setUsername,
  about,
  setAbout,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
  profileUpdate,
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
        {profileUpdate?
        <>
        <div className="form-group py-2">
          <label className="text-muted">Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group py-2">
          <label className="text-muted">About:</label>
          <input
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Write about yourself"
          />
        </div>
        </> : ""
}
{!profileUpdate ?
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
        : ""
}
        <div className="form-group py-2">
          <label className="text-muted">Password:</label>
          <input
            autoComplete="true"
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
            {loading ? <LoadingOutlined spin className="py-1" /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

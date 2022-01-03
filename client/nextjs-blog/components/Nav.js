import React, { useContext } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import { BarsOutlined } from "@ant-design/icons";

export default function Nav() {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };
  return (
    <div>
      <nav className="nav bg-dark d-flex justify-content-between">
        <Link href="/">
          <a className="nav-link text-light logo">Home</a>
        </Link>
        {state !== null ? (
          <div class="dropdown">
            <a
              className="btn text-light dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {state && state.user && state.user.name}
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link href="/user/dashboard">
                  <a className="nav-link text-dark">Dashboard</a>
                </Link>
              </li>
              <a onClick={logout} className="nav-link text-dark">
                Logout
              </a>
            </ul>
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className="nav-link text-light">Login</a>
            </Link>

            <Link href="/register">
              <a className="nav-link text-light">Register</a>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

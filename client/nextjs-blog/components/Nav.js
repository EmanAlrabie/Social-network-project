import React from "react";
import Link from "next/link";
export default function Nav() {
  return (
    <div>
      <nav className="nav bg-dark d-flex justify-content-between">
        <Link href="/">
          <a className="nav-link text-light logo">Home</a>
        </Link>

        <Link href="/login">
          <a className="nav-link text-light">Login</a>
        </Link>

        <Link href="/register">
          <a className="nav-link text-light">Register</a>
        </Link>
      </nav>
    </div>
  );
}

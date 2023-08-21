import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";

import "./Nav.css";

function Nav() {
  return (
    <div>
      <nav
        className="navbar p-3 border-bottom border-body rounded"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link to={"/invoices"}>
            <img src={logo} className="logo me-2 " alt="plus-icon" />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Nav;

import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center mt-3">
      <Link to={"/invoices"}>
        <button className="btn btn-outline-dark p-2">Invoices</button>
      </Link>
    </div>
  );
}

export default Home;

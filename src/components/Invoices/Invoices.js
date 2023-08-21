import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import empty from "./empty.svg";
import plus from "./plus.svg";
import "./Invoices.css";
import AddInvoice from "../AddInvoice/AddInvoice";

function Invoices() {
  let url = process.env.REACT_APP_API_URL;

  const [invoicesData, setInvoicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInvoicesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getInvoicesData() {
    try {
      let result = await axios.get(`${url}/invoices`);
      setInvoicesData(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  const [items, setItems] = useState([]);

  return (
    <div className="invoices-view border border-2 container mt-5">
      <div className="d-flex">
        <div className="p-2 flex-fill">
          <h2 className="fw-bold ">Invoices</h2>
          <p className="status">
            {invoicesData.length > 0 ? (
              <small>There are {invoicesData.length} total invoices</small>
            ) : (
              <small>No Invoices</small>
            )}
          </p>
        </div>
        <div className="p-2 justify-content-md-end mt-3">
          <div className="dropdown-center">
            <button
              className="dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="fw-bold">Filter By Status</span>
            </button>
            <ul className="dropdown-menu">
              <div className="form-check dropdown-item ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Default radio
                </label>
              </div>
              <div className="form-check dropdo">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Default checked radio
                </label>
              </div>
            </ul>
          </div>
        </div>
        <div className="ms-5 mt-3 justify-content-end">
          <button
            className="add-btn rounded-pill "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <img src={plus} className="plus me-2 " alt="plus-icon" />
            <span className=" fw-bold">New Invoice</span>
          </button>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel"></h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <AddInvoice />
        </div>
      </div>
      <hr className="mb-4" />

      {loading ? (
        <div className="loader">Loading...</div>
      ) : invoicesData.length > 0 ? (
        invoicesData.map((item) => {
          return (
            <div
              key={item.id}
              className="invoice-card container border border-2 rounded mb-3"
            >
              <Link
                to={`/invoices/${item.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="d-flex">
                  <div className="p-2 flex-fill">
                    <p className="status">#{item.id}</p>
                  </div>
                  <div className="p-2 flex-fill">
                    <p className="status">
                      Due {moment(item.paymentdue).format("LL")}
                    </p>
                  </div>
                  <div className="p-2 flex-fill">
                    <p className="status">{item.clientname}</p>
                  </div>
                  <div className="p-2 flex-fill">
                    <p className="status">Total</p>
                  </div>
                  <div className="p-2 flex-fill">
                    {item.ispaid ? (
                      <div className="paid fw-bold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-dot pb-1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                        </svg>
                        Paid
                      </div>
                    ) : (
                      <div className="pending fw-bold ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-dot pb-1 "
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                        </svg>
                        Pending
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <div className="empty-logo position-absolute top-50 start-50 translate-middle-x">
          <img src={empty} className="mb-4" alt="empty-icon" />
          <div className="mt-5 text-center">
            <p className="fs-4 fw-bold ">There is nothing here</p>
            <p className="mb-0 status">
              <small>Create an invoice by clicking the</small>
            </p>
            <p className="status">
              <small>
                <span className="fw-bold">New Invoice</span> button and get
                started
              </small>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Invoices;

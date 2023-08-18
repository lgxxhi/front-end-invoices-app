import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Invoice.css";
import moment from "moment";

function Invoice() {
  let url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();

  const [invoiceState, setInvoiceState] = useState([]);

  useEffect(() => {
    fetchInvoiceDataById();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchInvoiceDataById() {
    try {
      let result = await axios.get(`${url}/invoices/${id}`);
      //   console.log(result.data);
      setInvoiceState(result.data);
    } catch (error) {
      console.log(error);
      navigate("/404");
    }
  }

  const deleteInvoice = async () => {
    try {
      const response = await axios.delete(`${url}/invoices/${id}`);
      console.log(response);

      alert(`Invoice ID:${id} has been deleted`);
      navigate("/invoices");
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsPaid = async (isPaid) => {
    try {
      const updatedInvoiceData = { ...invoiceState, ispaid: !isPaid };

      setInvoiceState(updatedInvoiceData);

      await axios.put(`${url}/invoices/${id}`, {
        ...updatedInvoiceData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  function getPaymentDue() {
    let paymentDue = moment(invoiceState.createdat)
      .add(invoiceState.paymentterms, "d")
      .format("ll");
    return paymentDue;
  }

  return (
    <div className="invoice-view container mt-5 ">
      <div>
        <button onClick={() => navigate("/invoices")} className="btn btn-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>{" "}
          Go Back
        </button>
      </div>

      <div className="card pt-2 px-3 card-top">
        <div className="d-flex">
          <div className="p-2">
            <p className="status">Status</p>
          </div>
          <div className="p-2 flex-fill">
            {invoiceState.ispaid ? (
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

          <div className="p-2 justify-content-md-end">
            <Link to={`/invoices/${id}/edit`}>
              <button className="edit-btn rounded-pill ">Edit</button>
            </Link>
          </div>
          <div className="p-2 justify-content-end">
            <button
              className="delete-btn rounded-pill "
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Delete
            </button>
          </div>
          <div className="p-2 justify-content-end">
            {!invoiceState.ispaid ? (
              <button
                className="mark-as-paid-btn  rounded-pill  "
                onClick={() => handleIsPaid(invoiceState.ispaid)}
              >
                Mark as Paid
              </button>
            ) : (
              <button
                className="mark-as-paid-btn rounded-pill "
                onClick={() => handleIsPaid(invoiceState.ispaid)}
              >
                Mark as Unpaid
              </button>
            )}
          </div>
        </div>

        <div
          className="modal fade  "
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog ">
            <div className="modal-content py-4 px-3 ">
              <div className="modal-header border-bottom-0">
                <h1
                  className="modal-title fs-5 fw-bold "
                  id="staticBackdropLabel"
                >
                  Confirm Deletion
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="px-3">
                <p className="confirmation-message ">
                  Are you sure you want to delete invoice #{id}? This action
                  cannont be undone.
                </p>
              </div>

              <div className="modal-footer border-top-0">
                <button
                  type="button"
                  className="btn cancel rounded-pill py-2 px-4 fw-bold"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteInvoice()}
                  type="button"
                  className="btn delete rounded-pill py-2 px-4 fw-bold"
                  data-bs-dismiss="modal"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="card p-4 bottom-card">
        <div className="top-content container d-flex justify-content-between mb-1">
          <div>
            <p className="mb-1">
              <span className="status">#</span>
              <span className="fw-bold">{invoiceState.id}</span>
            </p>
            <p className="status">{invoiceState.description}</p>
          </div>
          <div>
            <p className="status mb-1">{invoiceState.senderstreetaddress}</p>
            <p className="status mb-1">{invoiceState.sendercity}</p>
            <p className="status mb-1">{invoiceState.senderpostcode}</p>
            <p className="status ">{invoiceState.sendercountry}</p>
          </div>
        </div>
        <hr className="mb-4" />
        <div className="middle-content container d-flex justify-content-between mb-3">
          <div>
            <p className="status mb-1">Invoice Date</p>
            <p className="fw-bold fs-5">
              {moment(invoiceState.createdat).format("LL")}
            </p>
            <p className="status mb-1">Payment Due</p>
            <p className="fw-bold fs-5">{getPaymentDue()}</p>
          </div>
          <div>
            <p className="status mb-1">Bill To</p>
            <p className="fw-bold fs-5 mb-1">{invoiceState.clientname}</p>
            <p className="status mb-1">{invoiceState.clientstreetaddress}</p>
            <p className="status mb-1">{invoiceState.clientcity}</p>
            <p className="status mb-1">{invoiceState.clientpostcode}</p>
            <p className="status">{invoiceState.clientcountry}</p>
          </div>
          <div>
            <p className="status mb-1">Sent To</p>
            <p className="fw-bold fs-5">{invoiceState.clientemail}</p>
          </div>
        </div>
        <hr />
        <div className="bottom-content container border border-2 rounded">
          <div className="d-flex">
            <div className="p-2 flex-fill">
              <p className="status">Item Name</p>
            </div>
            <div className="p-2 flex-fill">
              <p className="status">QTY.</p>
            </div>
            <div className="p-2 flex-fill">
              <p className="status">Price</p>
            </div>
            <div className="p-2 flex-fill">
              <p className="status">Total</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function AddInvoice() {
  let navigate = useNavigate();

  const [invoiceData, setInvoiceData] = useState({
    createdAt: "",
    paymentDue: "",
    description: "",
    paymentTerms: 0,
    clientName: "",
    clientEmail: "",
    isPaid: false,
    senderStreetAddress: "",
    senderCity: "",
    senderPostCode: "",
    senderCountry: "",
    clientStreetAddress: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
  });

  return (
    <div className="add-pet container row-sm-1">
      <div>
        <h2>New Invoice</h2>
      </div>
      <form>
        <div>
          <h5>Bill From</h5>
        </div>
        <div className="row g-2">
          <div className="col-md-12">
            <label className="edit-label">
              <small>Street Address</small>
            </label>
            <input
              type="text"
              className="form-control"
              name="senderStreetAddress"
              id="senderStreetAddress"
              required
            />
          </div>
          <div className="col-md-4">
            <label className="edit-label">
              <small>City</small>
            </label>
            <input
              required
              type="text"
              className="form-control"
              name="senderCity"
              id="senderCity"
            />
          </div>

          <div className="col-md-4">
            <label className="edit-label ">
              <small>Postal Code</small>
            </label>
            <input
              required
              type="text"
              className="form-control"
              name="senderPostCode"
              id="senderPostCode"
            />
          </div>

          <div className="col-md-4">
            <label className="edit-label">
              <small>Country</small>
            </label>

            <input
              required
              type="text"
              className="form-control"
              name="senderCountry"
              id="senderCountry"
            />
          </div>

          <div>
            <h5>Bill To</h5>
          </div>

          <div className="col-md-12">
            <label className="edit-label">
              <small>Client's Name</small>
            </label>

            <input
              required
              type="text"
              className="form-control"
              name="clientName"
              id="clientName"
            />
          </div>

          <div className="col-md-12">
            <label className="edit-label">
              <small>Client's Email</small>
            </label>

            <input
              required
              type="email"
              className="form-control"
              name="clientEmail"
              id="clientEmail"
            />
          </div>

          <div className="col-md-12">
            <label className="edit-label">
              <small>Street Address</small>
            </label>
            <input
              type="text"
              className="form-control"
              name="clientStreetAddress"
              id="clientStreetAddress"
              required
            />
          </div>
          <div className="col-md-4">
            <label className="edit-label">
              <small>City</small>
            </label>
            <input
              required
              type="text"
              className="form-control"
              name="clientCity"
              id="clientCity"
            />
          </div>

          <div className="col-md-4">
            <label className="edit-label ">
              <small>Postal Code</small>
            </label>
            <input
              required
              type="text"
              className="form-control"
              name="clientPostCode"
              id="clientPostCode"
            />
          </div>

          <div className="col-md-4">
            <label className="edit-label">
              <small>Country</small>
            </label>

            <input
              required
              type="text"
              className="form-control"
              name="clientCountry"
              id="clientCountry"
            />
          </div>

          <div className="col-md-6">
            <label className="edit-label">
              <small>Invoice Date</small>
            </label>

            <input
              required
              type="date"
              className="form-control"
              name="createdAt"
              id="createdAt"
              value={moment().format("YYYY-MM-DD")}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="edit-label">
              <small>Payment Terms</small>
            </label>

            <select
              className="form-select"
              onChange={(e) => console.log(e.target.value)}
            >
              <option value={Number("1")}>Net 1 Day</option>
              <option value={Number("7")}>Net 7 Days</option>
              <option value={Number("14")}>Net 14 Days</option>
              <option value={Number("30")}>Net 30 Days</option>
            </select>
          </div>
          <div className="col-md-12">
            <label className="edit-label">
              <small>Product Description</small>
            </label>
            <input
              type="text"
              required
              className="form-control"
              name="description"
              id="description"
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-outline-dark">
              Save and Send
            </button>
            <button type="submit" className="btn btn-outline-dark">
              Discard
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddInvoice;

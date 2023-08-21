import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function AddInvoice() {
  let navigate = useNavigate();
  const url = process.env.REACT_APP_API_URL;

  const [invoiceData, setInvoiceData] = useState({
    createdat: "",
    paymentdue: "",
    description: "",
    paymentterms: 1,
    clientname: "",
    clientemail: "",
    ispaid: false,
    senderstreetaddress: "",
    sendercity: "",
    senderpostcode: "",
    sendercountry: "",
    clientstreetaddress: "",
    clientcity: "",
    clientpostcode: "",
    clientcountry: "",
  });

  const handleChange = (e) => {
    setInvoiceData({
      ...invoiceData,
      [e.target.id]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let paymentDue = moment(invoiceData.createdat)
      .add(invoiceData.paymentterms, "d")
      .format("ll");
    let paymentDueDate = moment(paymentDue).format("YYYY-MM-DD");

    console.log(paymentDueDate);

    try {
      const updatedInvoiceData = {
        ...invoiceData,
        paymentdue: paymentDueDate,
      };

      setInvoiceData(updatedInvoiceData);

      let result = await axios.post(`${url}/invoices/`, {
        ...invoiceData,
      });
      await axios.put(`${url}/invoices/${result.data.id}`, {
        ...updatedInvoiceData,
      });
      alert("New invoice added!");
      navigate(`/invoices/${result.data.id}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="add-pet container row-sm-1">
      <div>
        <h2>New Invoice</h2>
      </div>
      <form onSubmit={handleSubmit}>
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
              name="senderstreetaddress"
              id="senderstreetaddress"
              onChange={handleChange}
              value={invoiceData.senderstreetaddress}
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
              name="sendercity"
              id="sendercity"
              value={invoiceData.sendercity}
              onChange={handleChange}
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
              name="senderpostcode"
              id="senderpostcode"
              onChange={handleChange}
              value={invoiceData.senderpostcode}
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
              name="sendercountry"
              id="sendercountry"
              onChange={handleChange}
              value={invoiceData.sendercountry}
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
              name="clientname"
              id="clientname"
              onChange={handleChange}
              value={invoiceData.clientname}
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
              name="clientemail"
              id="clientemail"
              onChange={handleChange}
              value={invoiceData.clientemail}
            />
          </div>

          <div className="col-md-12">
            <label className="edit-label">
              <small>Street Address</small>
            </label>
            <input
              type="text"
              className="form-control"
              name="clientstreetaddress"
              id="clientstreetaddress"
              onChange={handleChange}
              value={invoiceData.clientstreetaddress}
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
              name="clientcity"
              id="clientcity"
              onChange={handleChange}
              value={invoiceData.clientcity}
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
              name="clientpostcode"
              id="clientpostcode"
              onChange={handleChange}
              value={invoiceData.clientpostcode}
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
              name="clientcountry"
              id="clientcountry"
              onChange={handleChange}
              value={invoiceData.clientcountry}
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
              name="createdat"
              id="createdat"
              value={moment(invoiceData.createdat).format("YYYY-MM-DD")}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="edit-label">
              <small>Payment Terms</small>
            </label>

            <select
              className="form-select"
              onChange={handleChange}
              value={invoiceData.paymentterms}
              name="paymentterms"
              id="paymentterms"
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
              onChange={handleChange}
              value={invoiceData.description}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-outline-dark">
              Save and Send
            </button>
            <button
              type="submit"
              className="btn btn-outline-dark"
              onClick={() =>
                setInvoiceData({
                  createdat: "",
                  paymentdue: "",
                  description: "",
                  paymentterms: 1,
                  clientname: "",
                  clientemail: "",
                  ispaid: false,
                  senderstreetaddress: "",
                  sendercity: "",
                  senderpostcode: "",
                  sendercountry: "",
                  clientstreetaddress: "",
                  clientcity: "",
                  clientpostcode: "",
                  clientcountry: "",
                })
              }
            >
              Discard
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddInvoice;

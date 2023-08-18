import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function EditInvoice() {
  let url = process.env.REACT_APP_API_URL;
  let navigate = useNavigate();
  const { id } = useParams();

  const [invoiceData, setInvoiceData] = useState({
    createdat: "",
    paymentdue: "",
    description: "",
    paymentterms: 0,
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

  useEffect(() => {
    fetchInvoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInvoice = async () => {
    try {
      const response = await axios.get(`${url}/invoices/${id}`);
      //   console.log(response.data);
      setInvoiceData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextChange = (e) => {
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
    try {
      const updatedInvoiceData = {
        ...invoiceData,
        paymentdue: paymentDueDate,
      };
      //   console.log(invoiceData);
      await axios.put(`${url}/invoices/${id}`, {
        ...invoiceData,
      });
      await axios.put(`${url}/invoices/${id}`, {
        ...updatedInvoiceData,
      });
      alert("Invoice successfully updated!");
      navigate(`/invoices/${id}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="add-pet container row-sm-1">
      <div>
        <h3 className="fw-bold">
          Edit <span>#</span>
          {id}
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <h5>
            <small>Bill From</small>
          </h5>
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
              value={invoiceData.senderstreetaddress}
              required
              onChange={handleTextChange}
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
              onChange={handleTextChange}
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
              value={invoiceData.senderpostcode}
              onChange={handleTextChange}
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
              value={invoiceData.sendercountry}
              onChange={handleTextChange}
            />
          </div>

          <div>
            <h5>
              <small>Bill To</small>
            </h5>
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
              value={invoiceData.clientname}
              onChange={handleTextChange}
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
              value={invoiceData.clientemail}
              onChange={handleTextChange}
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
              value={invoiceData.clientstreetaddress}
              onChange={handleTextChange}
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
              value={invoiceData.clientcity}
              onChange={handleTextChange}
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
              value={invoiceData.clientpostcode}
              onChange={handleTextChange}
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
              value={invoiceData.clientcountry}
              onChange={handleTextChange}
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
              disabled
              value={moment(invoiceData.createdat).format("YYYY-MM-DD")}
              onChange={(e) =>
                setInvoiceData({
                  ...invoiceData,
                  [e.target.id]: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="edit-label">
              <small>Payment Terms</small>
            </label>

            <select
              className="form-select"
              onChange={(e) =>
                setInvoiceData({
                  ...invoiceData,
                  [e.target.id]: e.target.value,
                })
              }
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
              value={invoiceData.description}
              onChange={handleTextChange}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-outline-dark">
              Save Changes
            </button>
            <button type="submit" className="btn btn-outline-dark">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditInvoice;

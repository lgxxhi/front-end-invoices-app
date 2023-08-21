import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Items.css";

function ItemForm(props) {
  let { id } = useParams();

  const { itemDetails } = props;

  const [item, setItem] = useState({
    invoice_id: id,
    item_name: "",
    quantity: 1,
    price: 0,
    total: 0,
  });

  useEffect(() => {
    if (itemDetails) {
      setItem(itemDetails);
    }
  }, [id, itemDetails, props]);

  function handleChange(e) {
    setItem({
      ...item,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.handleSubmit(item);
    setItem({ invoice_id: id, item_name: "", quantity: 0, price: 0, total: 0 });
  }

  return (
    <div className="edit-item container row-sm-1">
      {props.children}
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-3">
            <label>
              <small>Item Name</small>
            </label>
            <input
              required
              type="text"
              id="item_name"
              placeholder="Item Name..."
              value={item.item_name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label>
              <small>Quantity</small>
            </label>
            <input
              required
              type="number"
              min={1}
              id="quantity"
              placeholder="Quantity..."
              value={item.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label className="me-3">
              <small>Price</small>
            </label>
            <input
              required
              type="number"
              id="price"
              placeholder="Price..."
              min={0}
              value={item.price}
              onChange={handleChange}
              step="any"
            />
          </div>
          <div className="col-md-3">
            <label className="me-3">
              <small>Total</small>
            </label>
            <input
              disabled
              type="number"
              id="total"
              placeholder="Total..."
              min={0}
              value={(item.total = item.price * item.quantity)}
              onChange={handleChange}
              step="any"
            />
          </div>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-outline-dark ">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ItemForm;

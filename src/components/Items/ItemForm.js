import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ItemForm(props, { getItemTotal }) {
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

  function getItemTotal() {
    let itemTotal = item.price * item.quantity;

    return itemTotal;
  }

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
    <div className="edit-item">
      {props.children}
      <form onSubmit={handleSubmit}>
        <label htmlFor="item_name">Item Name</label>
        <input
          required
          type="text"
          id="item_name"
          placeholder="Item Name..."
          value={item.item_name}
          onChange={handleChange}
        />
        <label htmlFor="quantity">QTY.</label>
        <input
          required
          type="number"
          min={1}
          id="quantity"
          placeholder="Quantity..."
          value={item.quantity}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
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
        <label htmlFor="total">Total:</label>

        <input
          disabled
          type="number"
          id="total"
          placeholder="Total..."
          min={0}
          value={getItemTotal()}
          onChange={handleChange}
          step="any"
        />

        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default ItemForm;

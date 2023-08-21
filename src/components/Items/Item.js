import React, { useState } from "react";
import ItemForm from "./ItemForm";

function Item({ item, handleSubmit, handleDelete, totalDue }) {
  function getItemTotal() {
    let itemTotal = item.price * item.quantity;
    return itemTotal;
  }

  const [toggleView, setToggleView] = useState(false);

  function handleToggleView() {
    setToggleView(!toggleView);
  }

  return (
    <div className="Item">
      <div className="container text-start pt-3">
        <div className="row">
          <div className="col-6">
            <p className="fw-bold">{item.item_name}</p>
          </div>
          <div className="col-2">
            <p className="fw-bold status">{item.quantity}</p>
          </div>
          <div className="col-2">
            <p className="fw-bold status">$ {item.price}</p>
          </div>
          <div className="col-2">
            <p className="fw-bold">$ {getItemTotal()}</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleToggleView}
        type="button"
        className="btn btn-outline-dark btn-sm me-2"
      >
        {toggleView ? <div>Close</div> : <div>Edit this item</div>}
      </button>
      <button
        onClick={() => handleDelete(item.id)}
        type="button"
        className="btn btn-outline-dark btn-sm"
      >
        Delete
      </button>
      <div className="mt-3">
        {toggleView ? (
          <ItemForm
            handleSubmit={handleSubmit}
            getItemTotal={getItemTotal}
            itemDetails={item}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Item;

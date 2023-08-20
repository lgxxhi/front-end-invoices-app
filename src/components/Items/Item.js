import React from "react";
import ItemForm from "./ItemForm";

function Item({ item, handleSubmit, handleDelete }) {
  //   console.log(item);

  function getItemTotal() {
    let itemTotal = item.price * item.quantity;
    return itemTotal;
  }

  return (
    <div className="Item">
      <div className="d-flex">
        <div className="p-2 flex-fill">
          <p className="fw-bold">{item.item_name}</p>
        </div>
        <div className="p-2 flex-fill">
          <p className="fw-bold status">{item.quantity}</p>
        </div>
        <div className="p-2 flex-fill">
          <p className="fw-bold status">$ {item.price}</p>
        </div>
        <div className="p-2 flex-fill">
          <p className="fw-bold">$ {getItemTotal()}</p>
        </div>
      </div>
      <div className="">
        <ItemForm
          handleSubmit={handleSubmit}
          getItemTotal={getItemTotal}
          itemDetails={item}
        />
        <button onClick={() => handleDelete(item.id)}>Delete</button>
      </div>
    </div>
  );
}

export default Item;

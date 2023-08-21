import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Item from "./Item";
import ItemForm from "./ItemForm";
import "./Items.css";

function Items() {
  const url = process.env.REACT_APP_API_URL;
  const { id } = useParams();

  const [items, setItems] = useState([]);
  const [toggleView, setToggleView] = useState(false);

  useEffect(() => {
    fetchInvoiceItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, url]);

  async function handleAdd(newItem) {
    try {
      let result = await axios.post(`${url}/invoices/${id}/items`, newItem);

      setItems([result.data, ...items]);
      // console.log(items);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit(updatedItem) {
    console.log("Handle Edited", updatedItem);
    try {
      let result = await axios.put(
        `${url}/invoices/${id}/items/${updatedItem.id}`,
        updatedItem
      );

      const copyItemArray = [...items];

      const indexUpdatedItem = copyItemArray.findIndex((item) => {
        return item.id === updatedItem.id;
      });

      copyItemArray[indexUpdatedItem] = result.data;

      setItems(copyItemArray);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      let result = await axios.delete(`${url}/invoices/${id}/items/${id}`);
      console.log(result);
      let filteredItemArray = items.filter((item) => item.id !== id);

      console.log(filteredItemArray);
      setItems(filteredItemArray);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchInvoiceItems() {
    try {
      let result = await axios.get(`${url}/invoices/${id}/items`);
      console.log(result.data);

      setItems(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleTotalDue() {
    let totalDue = items.reduce((n, { total }) => n + Number(total), 0);

    return totalDue;
  }

  function toggleAddItem() {
    setToggleView(!toggleView);
  }

  return (
    <div className="Items ">
      {items.map((unit) => {
        return (
          <Item
            handleSubmit={handleEdit}
            key={unit.id}
            item={unit}
            handleDelete={handleDelete}
            totalDue={handleTotalDue}
          />
        );
      })}
      <div className="border-top border-end border-start border-2 rounded-top p-4">
        <div
          onClick={() => toggleAddItem()}
          className="fw-bold text-center toggle-add"
        >
          {toggleView ? <div>Close</div> : <div>Add a new item</div>}
        </div>
        {!toggleView ? null : <ItemForm handleSubmit={handleAdd} />}
      </div>
      <div className="amount-due-div fw-bold border-start border-end rounded-bottom d-flex justify-content-between">
        <div className="fs-5">
          <small>Amount Due</small>
        </div>
        <div className="fs-2">
          ${handleTotalDue()}
          {handleTotalDue() % 1 !== 0 ? null : ".00"}
        </div>
      </div>
    </div>
  );
}

export default Items;

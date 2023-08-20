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
  // console.log(items.id === 1);

  useEffect(() => {
    fetchInvoiceItems();
  }, [id, url]);

  async function handleAdd(newItem) {
    try {
      let result = await axios.post(`${url}/invoices/${id}/items`, newItem);

      setItems([result.data, ...items]);
      console.log(items);
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

  return (
    <div className="Items">
      {/* <div className="border border-2 p-4">
        <ItemForm handleSubmit={handleAdd}>
          <h3 className="fw-bold">Add a New Item</h3>
        </ItemForm>
      </div> */}
      {items.map((unit) => {
        return (
          <Item
            handleSubmit={handleEdit}
            key={unit.id}
            item={unit}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
}

export default Items;

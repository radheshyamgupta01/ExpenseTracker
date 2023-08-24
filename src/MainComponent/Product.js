import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Product.css';

export default function Product() {
  const [title, setTitle] = useState("");
  const [catogery, setCatogery] = useState("");
  const [amout, setAmount] = useState("");
  const [productData, setProductData] = useState([]);

  const fetchDataFunction = () => {
    fetch("https://expensetracker-1c197-default-rtdb.firebaseio.com/product.json")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((body) => {
        let transformedData = [];
        for (let key in body) {
          let obj = {
            title: body[key].title,
            amout: body[key].amout,
            catogery: body[key].catogery
          };
          transformedData.push(obj);
        }

        setProductData(transformedData);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    fetchDataFunction();
  }, []);

  const submitData = (e) => {
    e.preventDefault();
    fetch("https://expensetracker-1c197-default-rtdb.firebaseio.com/product.json", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        amout: amout,
        catogery: catogery
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (res.ok) {
          alert("Data added successfully");
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(() => {
        setTitle("");
        setAmount("");
        setCatogery("");
        fetchDataFunction();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="product-container">
      <div className="parent">
        <div className="child1">Welcome to Expense Tracker!!!</div>
        <div className="child2">
          Your profile is incomplete.{' '}
          <NavLink to="/update">
            <span>Complete Now</span>
          </NavLink>
        </div>
      </div>
      <form className="expense-form" onSubmit={submitData}>
        <input
          type="text"
          placeholder="Expense name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amout}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={catogery} onChange={(e) => setCatogery(e.target.value)}>
          <option value="^">select catogery</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" className="submit">Add Expense</button>
      </form>
      <div>
      <table className="styled-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Amount</th>
              <th>Category</th>
              <th> Edit</th>
              <th> Delete</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((itemData, index) => (
              <tr key={index}>
                <td>{itemData.title}</td>
                <td>{itemData.amout}</td>
                <td>{itemData.catogery}</td>
                 <td className='="edit'>Edit</td>
                <td className="delet">Delete</td> 
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

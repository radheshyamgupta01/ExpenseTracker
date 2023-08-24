import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Product.css';

export default function Product() {
  const [title, setTitle] = useState("");
  const [catogery, setCatogery] = useState("");
  const [amout, setAmount] = useState("");
  const [updateTitle,setUpdateTitle]=useState("")
   const [updateCatagory,setUpdateCatogory]=useState("")
   const [updateAmount,setUpdateAmout]=useState("")
   const [editingItem, setEditingItem] = useState(null);


  const [productData, setProductData] = useState([]);
  const updateEditHandler = (item) => {
    setEditingItem(item);
  };
  

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
            catogery: body[key].catogery,
            id: key
          };
          transformedData.push(obj);
        }

        setProductData(transformedData);
      })
      .catch((error) => {
       console.log(error)
      });
  };

  useEffect(() => {
    fetchDataFunction();
  }, [productData]);

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

  const deletHandler = (id) => {
    fetch(`https://expensetracker-1c197-default-rtdb.firebaseio.com/product/${id}.json`, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.ok) {
        
          return res.json()
        }
        else {
          throw new Error(" failed to delet")
        }
      })
      .then((item) => {
        const updatedData = productData.filter((id) => item.id !== id)
        setProductData(updatedData)

      })
      .catch((error) => {
      console.log(error)
      })

  }


  const updateHandler = (updatedItem) => {
    const id = updatedItem.id;
    fetch(`https://expensetracker-1c197-default-rtdb.firebaseio.com/product/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({
        title: updatedItem.title,
        amout: updatedItem.amout,
        catogery: updatedItem.catogery
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(() => {
        fetchDataFunction();
        setEditingItem(null); // Reset editing state
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
      {editingItem ? (
  <div className="expense-form">
    <input
      type="text"
      value={editingItem.title}
      onChange={(e) =>
        setEditingItem({ ...editingItem, title: e.target.value })
      }
    />
    <input
      type="number"
      value={editingItem.amout}
      onChange={(e) =>
        setEditingItem({ ...editingItem, amout: e.target.value })
      }
    />
    <select
      value={editingItem.catogery}
      onChange={(e) =>
        setEditingItem({ ...editingItem, catogery: e.target.value })
      }
    >
     <option >update catogery</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Other">Other</option>
    </select>
    {/* <button onClick={() => updateHandler(editingItem)} style={}>Update</button>
    <button onClick={() => setEditingItem(null)}>Cancel</button> */}
    <button
  onClick={() => updateHandler(editingItem)}
  style={{ marginBottom: '10px' ,borderRadius: '5px'  }} // Add margin bottom here
>
  Update
</button>
<button
  onClick={() => setEditingItem(null)}
  style={{ marginBottom: '10px', borderRadius: '5px' }} // Add margin bottom here
>
  Cancel
</button>

  </div>
) : (
  


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
          <option >select catogery</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" className="submit">Add Expense</button>
      </form>
      )}
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
            {productData.map((itemData) => (
              <tr key={itemData.id}>
                <td>{itemData.title}</td>
                <td>{itemData.amout}</td>
                <td>{itemData.catogery}</td>
                <td className='="edit'  onClick={()=>updateEditHandler(itemData)}>Edit</td>
                <td className="delet" onClick={() => deletHandler(itemData.id)}>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

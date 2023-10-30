import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import User from "../../../modules/User";


const Cart = ({ items, onDeleteItem }) => {
  const [user, setUser] = useState({});
  const [itemsCheckout, setItemsCheckout] = useState([]);


  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })();
    setItemsCheckout(items);
  }, [items]);

  var cartTotal = [];

  if (!items) {
    return <div></div>;
  }

  function deleteItem(event) {
    event.preventDefault();
    items = itemsCheckout.filter(item => item.id != event.target.value);
    setItemsCheckout(items);
    onDeleteItem(items)
  }
  

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Produto</th>
            <th scope="col">Tipo</th>
            <th scope="col">Preço</th>
            <th scope="col">X</th>
          </tr>
        </thead>
        <tbody>
          {itemsCheckout.map(
            (item, index) => (
             cartTotal.push(item.price),
              (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name + item.concentration}</td>
                  <td>{item.type}</td>
                  <td>{item.price}</td>
                  <td>
                    <button onClick={deleteItem} value={item.id}>
                      X
                    </button>
                  </td>
                </tr>
              )
              
            )
          )}
          <tr></tr>
          <tr>
            <th></th>
            <td></td>
            <td>Total: </td>
            <td> {(cartTotal.reduce((total, valor) => total + valor, 0).toFixed(2))}</td>

          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Cart;

import React from "react";
import Cart from "./Cart";
const CartList = ({ cartProducts }) => {

  return (
    <div>
      {cartProducts.map((product) => (
        <Cart
          key={product.id}
          category={product.category}
          price={product.price}
          img={product.image}
          id={product.id}
          
        />
      ))}
    </div>
  );
};
export default CartList;

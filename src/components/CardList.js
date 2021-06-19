import React from "react";
import Card from "./Card";

const CardList = ({ products }) => {
  return (
    <div>
      {products.map((product) => {
        return (
          <Card
            
            key={product.id}
            id={product.id}
            category={product.category}
            price={product.price}
            img={product.image}
            title={product.title}
            description={product.description}
            quantity={product.quantity}
          />
        );
      })}
    </div>
  );
};
export default CardList;

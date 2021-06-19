import React, { useState } from "react";
import firebase from "../fire";


const Card = ({ category, price, id, img, title, description, quantity }) => {

  const [cartobject, setCart] = useState("");
  const AddToCart = () => {



    const curruser = firebase.auth().currentUser;
    const db = firebase.firestore();
    let cartobj = "";
    db.collection("users").onSnapshot(snapshot => {
      const cartProductsData = [];
      snapshot.forEach(doc => cartProductsData.push(doc.data()))

      let obj = cartProductsData.find(user => user.email === curruser.email)
      cartobj = obj.cart.find((item) => item.id === id)

      setCart(cartobj);



    })
    if (cartobject) {
      alert("this item already in your cart")

    }
    else if (cartobject === undefined) {

      db.collection('users').doc(curruser.uid).update({
        cart: firebase.firestore.FieldValue
          .arrayUnion({ category: category, price: price, image: img, title: title, description: description, id: id, quantity: quantity })
      })
      alert("added succefully")

    }

  }

  return (


    <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
      <img alt="products" src={img} width="200px" height="200px" />
      <div>
        <h2>price: {price}</h2>
        <h3>category: {category}</h3>
        <h4>Quantity:{quantity}</h4>
        <button
          style={{
            backgroundColor: "#054666",
            color: "white",
            border: "none",
            padding: "10px 10px",
            display: "inline-block",
            margin: "4px 30px",
            borderRadius: "5px",
          }}
          onClick={() => AddToCart()}
        >
          add to cart
        </button>


      </div>
    </div>
  );
};
export default Card;

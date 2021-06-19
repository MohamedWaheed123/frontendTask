import React from "react";
import firebase from "../../fire";

const Cart = ({ category, price, img, id }) => {

  const onDelete = () => {
    const curruser = firebase.auth().currentUser;

    const dbs=firebase.firestore();
          dbs.collection("users").onSnapshot(snapshot=>{
          const cartProductsData=[];
          snapshot.forEach(doc=>cartProductsData.push(doc.data()))
         
          let obj=cartProductsData.find(user=>user.email===curruser.email)
          dbs.collection('users').doc(curruser.uid).update({
               cart:obj.cart.filter((item)=>item.id!==id)
             });
         
        })
    
   
    alert("deleted succefully")

  }
  const onCheckout = () => {

    const db = firebase.firestore();
    const decrement = firebase.firestore.FieldValue.increment(-1);
     db.collection('products').doc(id).update({quantity:decrement});
    alert("Successfully purchased")

  }

  return (
    
    <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
      <img alt="products" src={img} width="200px" height="200px" />
      <div>
        <h2>price: {price}</h2>
        <h3>category: {category}</h3>
        <button
          style={{
            backgroundColor: "teal",
            color: "white",
            border: "none",
            padding: "10px 10px",
            display: "inline-block",
            margin: "4px 30px",
            borderRadius: "5px",

          }}
          onClick={() => onCheckout()}
        >
          checkout
        </button>
        <button
          style={{
            backgroundColor: "#F34541",
            color: "white",
            border: "none",
            padding: "10px 10px",
            display: "inline-block",
            margin: "4px 30px",
            borderRadius: "5px",

          }}
          onClick={() => onDelete()}
        >
          delete
        </button>


      </div>
    </div>
  );
};






export default Cart;

import React, { Component } from 'react';
import './upperdiv.css';
import firebase from '../../fire';

class UpperDiv extends Component {



    signOut = () => {
      
        firebase.auth().signOut();

        this.props.onRouteChange('signout');


    }
    goHome = () => {
      
        
        if(this.props.route==="cart")
        {
            this.props.onRouteChange('home');

        }

       


    }
    getCartProducts=()=>{
    
        this.props.onRouteChange('cart')
        const curruser = firebase.auth().currentUser;
        
        if(curruser!==null)
        {
          console.log(curruser.email);
          const dbs=firebase.firestore();
          dbs.collection("users").onSnapshot(snapshot=>{
          const cartProductsData=[];
          snapshot.forEach(doc=>cartProductsData.push(doc.data()))
          console.log("users",cartProductsData);
          let obj=cartProductsData.find(user=>user.email===curruser.email)
          
         
          console.log("obj",obj.cart);
          this.props.setCartProducts(obj.cart);

          
         
      
      
        })
        }}

    render() {



        return (
            <div className='upperDiv'>
                <div style={{ display: 'flex', justifyContent: 'center', paddingLeft: '5px', paddingRight: '30px' }}>


                    <button onClick={this.goHome} className="shopName" style={{ marginLeft: "100px" }}>FAKESHOP</button>

                </div>

                {
                    this.props.user&&(this.props.route==="home"||this.props.route==="cart") ?



                        <div>
                            <button onClick={this.getCartProducts} className='navigationBtns'> My Cart</button>

                            <button onClick={this.signOut} className='navigationBtns'> Signout</button>

                        </div>

                        :this.props.route==="admin"&&this.props.user?
                        <button onClick={this.signOut} className='navigationBtns'> Signout</button>:


                        <div>

                            <button onClick={() => this.props.onRouteChange('signin')} className='navigationBtns'> SignIn</button>
                            <button onClick={() => this.props.onRouteChange('register')} className='navigationBtns'> Register</button>
                        </div>

                }


            </div>
        );

    }

}
export default UpperDiv;
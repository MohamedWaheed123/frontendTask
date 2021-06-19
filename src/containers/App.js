import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css";
import Scroll from "../components/Scroll";
import UpperDiv from "../components/UpperDiv/upperdiv";
import Register from "../components/Register/register";
import SignIn from "../components/SignIn/signin";
import CartList from "../components/Cart/CartList";
import UserList from "../components/admin/UserList";
import firebase from "../fire";


class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      searchfield: "",
      route: "signin",
      user: "",
      cartProducts: [],
      users: []
    };
  }
  authListenser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user })
      }
      else {
        this.setState({ user: "" })
      }

    })
  }
  getProducts = () => {
    const db = firebase.firestore();
    db.collection("products").onSnapshot(snapshot => {
      const productsData = [];
      snapshot.forEach(doc => productsData.push({ ...doc.data(), id: doc.id }))
      this.setState({ products: productsData })
    })

  }
  setCartProducts = (product) => {
    this.setState({ cartProducts: product })
  }
  getUsers = () => {

    const dbs = firebase.firestore();
    dbs.collection("users").onSnapshot(snapshot => {
      const usersData = [];
      snapshot.forEach(doc => usersData.push({ ...doc.data(), id: doc.id }))
      this.setState({ users: usersData })
    })

  }

  componentDidMount() {
    this.authListenser();
    this.getProducts();
    this.getUsers();


  }


  onSearchChange = (event) => {
    this.setState({
      searchfield: event.target.value,
    });
  };

  onRouteChange = (route) => {

    this.setState({ route: route });
  };

  
  render() {

    const filteredproducts = this.state.products.filter((product) => {
      return product.category
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });

    return (

      <div className="tc">
        <UpperDiv
          setCartProducts={this.setCartProducts}
          onRouteChange={this.onRouteChange}
          user={this.state.user}
          route={this.state.route}
        />
        {this.state.user && this.state.route === "home" ? (
          <div  >

            <SearchBox searchChange={this.onSearchChange} />
            <Scroll>
              <CardList products={filteredproducts} />
            </Scroll>
          </div>

        ) : this.state.route === "signin" ? (
          <SignIn
            onRouteChange={this.onRouteChange}
          />
        ) : this.state.route === "signout" || this.state.route === "register" ? (
          <Register

            onRouteChange={this.onRouteChange}


          />
        ) : this.state.route === "cart" && this.state.user ? (


          <div style={{ marginTop: "20px" }}>
            <Scroll>
              <CartList cartProducts={this.state.cartProducts} />
            </Scroll>

          </div>
        ) : this.state.route === "admin" && this.state.user ?
          <div style={{ marginTop: "20px" }}>
            <Scroll>
              <UserList users={this.state.users} />
            </Scroll>

          </div>
          : <></>}
      </div>
    );
  }
}
export default App;

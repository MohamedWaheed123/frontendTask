import React from "react";


const User = ({ user }) => {


  return (
    <div style={{
      margin: "auto",
      width: "70%",
      padding: "10px"
    }} className="ui segments">
      <div className="ui segment">
        <h3 style={{ textAlign: "left", marginLeft: "80px" }}>{user.name}</h3>
        <p style={{textAlign:"left", marginLeft: "80px"}}>{user.email}</p>
      </div>
      <div className="ui secondary segment">
        <table style={{ width: "90%", margin: "auto" }} className="ui celled table">
          <thead>
            <tr><th>Category</th>
              <th>Price</th>
              <th>Title</th>

            </tr></thead><tbody>
            {
              user.cart.map((item) => (

                <tr>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.title}</td>

                </tr>))

            }


          </tbody>
        </table>
      </div>
    </div>

  );
};






export default User;

import React from "react";
import User from "./User";

const UserList = ({ users }) => {


   let filteredUsers= users.filter((user)=>user.email!=="admin@gmail.com")
  return (
    <div>
      {filteredUsers.map((user) => (
        <User
          key={user.id}
          user={user}
          
        />
      ))}
    </div>
  );
};
export default UserList;

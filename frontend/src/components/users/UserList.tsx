import React from "react";
import { User } from "../../models/User";
import UserListItem from "./UserListItem";

interface IUserListProps {
  users: User[];
}

const UserList = ({ users }: IUserListProps) => {
  return (
    <>
      {users.length > 0 ? (
        users.map((user) => <UserListItem key={user.id} user={user} />)
      ) : (
        <div className="h4 text-muted m-5">
          Sorry, there aren't any users right now!
        </div>
      )}
    </>
  );
};

export default UserList;

import React from "react";
import { Alert } from "react-bootstrap";
import { useFetchAllUsersQuery } from "../../services/userService";
import MainLayoutWithToolbar from "../../layout/MainLayoutWithToolbar";
import Loadscreen from "../../components/Loadscreen";
import UserList from "../../components/users/UserList";

const UserListView = () => {
  const { data: users, error, isLoading } = useFetchAllUsersQuery();

  if (isLoading) return <Loadscreen />;

  return (
    <MainLayoutWithToolbar>
      <>
        {error && <Alert>{`${JSON.stringify(error)}`}</Alert>}

        <UserList users={users || []} />
      </>
    </MainLayoutWithToolbar>
  );
};

export default UserListView;

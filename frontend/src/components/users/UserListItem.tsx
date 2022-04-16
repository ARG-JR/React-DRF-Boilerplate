import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { EyeFill, TrashFill } from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";
import { User } from "../../models/User";

interface IUserListItemProps {
  user: User;
}

const UserListItem = ({ user }: IUserListItemProps) => (
  <Card className="shadow-sm mb-2">
    <Card.Body>
      <div className="d-flex justify-content-between">
        <span className="h5">{`${user.first_name} ${user.last_name}`}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>
          <small>
            <strong className="text-muted">@{user.username}</strong>
          </small>
        </span>
      </div>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-end">
      <ButtonGroup>
        <LinkContainer to={`/users/${user.id}`}>
          <Button size="sm" className="d-flex align-items-center">
            <EyeFill className="me-1" />
            Details
          </Button>
        </LinkContainer>
        <LinkContainer to={`/users/${user.id}`}>
          <Button
            variant="danger"
            size="sm"
            className="d-flex align-items-center">
            <TrashFill className="me-1" />
            Delete
          </Button>
        </LinkContainer>
      </ButtonGroup>
    </Card.Footer>
  </Card>
);

export default UserListItem;

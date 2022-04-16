import React from "react";
import { Container, Navbar } from "react-bootstrap";

interface IToolbarProps {
  children?: React.ReactElement
}

const Toolbar: React.FC<IToolbarProps> = ({ children }) => {
  return (
    <Navbar
      bg="light"
      expand={true}
      className="mt-n4 border-top border-bottom mb-3 p-0">
      <Container className="d-flex justify-content-end">{children}</Container>
    </Navbar>
  );
};

export default Toolbar;

import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer"
import Header from "./Header";

interface IMainLayoutProps {
  title?: string;
  children?: React.ReactElement
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children, title }) => {
  return (
    <div className="h-100">
      <Header />
      {title && <h1>{title}</h1>}
      <Container>{children}</Container>
      <Footer />
    </div>
  );
};

export default MainLayout;

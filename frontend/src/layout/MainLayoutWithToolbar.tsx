import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
import Toolbar from "./Toolbar";

interface IMainLayoutWithToolbarProps {
  title?: string;
  toolbarContent?: JSX.Element;
  children?: React.ReactElement;
}

const MainLayoutWithToolbar: React.FC<IMainLayoutWithToolbarProps> = ({
  children,
  title,
  toolbarContent,
}) => {
  return (
    <>
      <div className="h-100">
        <Header />
        {toolbarContent && <Toolbar>{toolbarContent}</Toolbar>}
        {title && <h1>{title}</h1>}
        <Container>{children}</Container>
        <Footer />
      </div>
    </>
  );
};

export default MainLayoutWithToolbar;

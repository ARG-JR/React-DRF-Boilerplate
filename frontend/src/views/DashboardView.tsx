import React from "react";
import { Col, Row } from "react-bootstrap";
import MainLayout from "../layout/MainLayout";

const DashboardView = () => {
  //const user = useAppSelector((state) => state.auth.currentUser) as User;

  //if (isLoading) return <Loadscreen />;

  return (
    <MainLayout>
      <Row>
        <Col lg={12} sm={12}>
          <h1>Dashboard</h1>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default DashboardView;

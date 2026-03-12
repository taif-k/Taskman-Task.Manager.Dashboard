import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import LeftSideLayout from "./LeftSideLayout";
import RightSideProfileLayout from "./RightSideProfileLayout";

const DashboardLayout = () => {
    return (
        <Container fluid className="vh-100 quicksand-font">
            <Row className="h-100">

                <LeftSideLayout />


                <Col md={8} xs={12} className="outlet-container vh-100 overflow-auto invisible-scroll">
                    <Outlet />
                </Col>


                <Col md={3} xs={12} className="vh-100 overflow-auto invisible-scroll">
                    <RightSideProfileLayout />
                </Col>

            </Row>
        </Container>
    );
};

export default DashboardLayout;

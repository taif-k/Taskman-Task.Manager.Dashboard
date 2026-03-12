import { useEffect, useState } from "react";
import avatarImg from "../assets/images/avatar_img.webp";
import recentActivityIcon from "../assets/icons/right-icons/rec_activity_sort_icon.svg";
import redTrashIcon from "../assets/icons/right-icons/red_trash_icon.svg";
import infoIcon from "../assets/icons/right-icons/info_icon.svg";
import gearIcon from "../assets/icons/right-icons/setting-icon.svg";
import Stack from "react-bootstrap/Stack";


import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import RecentActivity from "../components/RecentActivity";
import Members from "../components/Members";
import { useDispatch } from "react-redux";
import { resetTasks } from "../store/slices/tasksSlice";



const RightSideProfileLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("currentUser")) ||
      JSON.parse(sessionStorage.getItem("currentUser"));

    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");

    dispatch(resetTasks());
    navigate("/auth/sign-in");
  };

  return (
    <>

      <Accordion defaultActiveKey={["1"]} alwaysOpen>
        <Accordion.Item eventKey="0" className="bg-white">
<Accordion.Header className="mt-3 accordion-header-border">
  <Image
    src={currentUser?.avatar || avatarImg}
    roundedCircle
    width={50}
    height={50}
    className="me-2"
  />

  <Stack className="text-start">
    <span className="fw-semibold">
      {currentUser?.fullName || "User"}
    </span>
    <span className="text-muted small">
      {currentUser?.email || ""}
    </span>
  </Stack>
</Accordion.Header>


          <Accordion.Body className="p-2">
            <Stack gap={2}>
              <NavLink
                to="/profile"
                className="text-decoration-none text-dark fw-semibold"
              >
                View Profile
              </NavLink>

              <span
                onClick={handleLogout}
                className="text-danger fw-semibold cursor-pointer"
              >
                Logout
              </span>
            </Stack>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>


      <Container>
        <div style={{ marginTop: "24px" }} >
          <Members />
        </div>


        <Row className="mt-3" style={{ marginTop: "37px" }}>
        <Col
  className="mb-1"
  style={{
    fontSize: "18px",
    fontWeight: 600,
    color: "#363B45",
  }}
>
  Recent Activity
</Col>
          {/* <Col className="small text-muted mb-1 fw-semibold" style={{ fontSize: "18px" }}>Recent Activity</Col> */}
          <Col className="d-flex flex-column align-items-end pe-3">
            <Image src={recentActivityIcon} width={20} height={20} />
          </Col>
        </Row>

        <Row className="info-row">
          <RecentActivity />
        </Row>

        <Row className="align-items-center mt-3">
          <Col className="d-flex align-items-center gap-2">
            <Image src={redTrashIcon} width={20} height={20} />
            <Nav.Link as={NavLink} to="/archived" className="text-danger" disabled>
              Archived Items
            </Nav.Link>
          </Col>
          <Col
            xs="auto"
            className="d-flex align-items-center gap-2 justify-content-end"
          >
            <Image src={infoIcon} width={20} height={20} />
            <Image src={gearIcon} width={20} height={20} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RightSideProfileLayout;

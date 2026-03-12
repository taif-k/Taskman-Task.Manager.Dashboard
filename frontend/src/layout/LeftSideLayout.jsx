import { Col, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import mainLogo from "../assets/icons/left-icons/main_logo.svg";
import homeIcon from "../assets/icons/left-icons/left_home_logo.svg";
import bellIcon from "../assets/icons/left-icons/left_bell_icon.svg";
import msgIcon from "../assets/icons/left-icons/left_msg_icon.svg";
import barIcon from "../assets/icons/left-icons/left_bar_icon.svg";
import belowBarIcon from "../assets/icons/left-icons/left_below_bar_icon.svg";
import clockIcon from "../assets/icons/left-icons/left_clock_icon.svg";
import trashIcon from "../assets/icons/left-icons/left_trash_icon.svg";
import logoutIcon from "../assets/icons/left-icons/left_last_logout_icon.svg";

const LeftSideLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");

    
    // localStorage.clear();
    // sessionStorage.clear();

    navigate("/auth/sign-in");
  };

  return (
    <Col md={1} xs={12} className="left-side-col" >
      <Nav className="flex-column">
        <Nav.Link as={NavLink} to="/" className="mt-5">
          <img src={mainLogo} alt="Home" />
        </Nav.Link>

        <Nav.Link as={NavLink} to="/" className="mt-5">
          <img src={homeIcon} alt="Home" />
        </Nav.Link>

        <Nav.Link as={NavLink} to="/notification" className="mt-3" disabled>
          <img src={bellIcon} alt="notification" />
        </Nav.Link>

        <Nav.Link as={NavLink} to="/messages" className="mt-3" disabled>
          <img src={msgIcon} alt="messages" />
        </Nav.Link>

        <Nav.Link as={NavLink} to="/bar" className="mt-3" disabled>
          <img src={barIcon} alt="bar" />
        </Nav.Link>

        <Nav.Link as={NavLink} to="/below-bar" className="mt-3" disabled>
          <img src={belowBarIcon} alt="below-bar" />
        </Nav.Link>

        <Nav.Link as={NavLink} to="/clock" className="mt-3" disabled>
          <img src={clockIcon} alt="clock" />
        </Nav.Link>

        <Nav.Link as={NavLink} to="/removed-tasks" className="mt-3" disabled>
          <img src={trashIcon} alt="removed tasks" />
        </Nav.Link>

       
        <Nav.Link onClick={handleLogout} className="left-logout">
          <img src={logoutIcon} alt="logout" />
        </Nav.Link>
      </Nav>
    </Col>
  );
};

export default LeftSideLayout;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { Container, Row, Col, Image, Form, Button, Stack,} from "react-bootstrap";

import mainLogo from "../../assets/icons/left-icons/main_logo.svg";
import taskmanTextLogo from "../../assets/icons/taskmanText.svg";

import SignInForm from "../../components/forms/SignInForm";
import RightSideInBoth from "./RightSideInBoth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container fluid className="vh-100 p-0 poppins-font">
      <Row className="h-100">

        <Col md={6} className="d-flex flex-column justify-content-center px-3 px-md-5  signin-left">
          <Stack direction="horizontal" gap={2}  >
            <Image src={mainLogo} width={40} height={40} />
            <Image src={taskmanTextLogo} height={28} />
          </Stack>

          <h2 className="heading-neon" style={{marginBottom: "18px"}}>
            Logout the past, Login <br />
            to the <span className="neon-green">new</span>!
          </h2>

        <SignInForm setFormData={setFormData} dispatch={dispatch} navigate={navigate}/>
        </Col>

       
      <RightSideInBoth/>

      </Row>
    </Container>
  );
};

export default SignIn;

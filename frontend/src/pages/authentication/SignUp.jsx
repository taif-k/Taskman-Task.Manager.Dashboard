import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import mainLogo from "../../assets/icons/left-icons/main_logo.svg";
import taskmanTextLogo from "../../assets/icons/taskmanText.svg";
import SignUpForm from "../../components/forms/SignUpForm";
import RightSideInBoth from "./RightSideInBoth";


const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsChecked: false,
  });

  const navigate = useNavigate();

  return (
    <Container fluid className="sign-up-page">
      <Row className="h-100">

        <Col md={6} className="left-side">

          <div className="logo-row">
            <Image src={mainLogo} alt="Logo" className="main-logo" />
            <Image src={taskmanTextLogo} alt="Taskman" className="text-logo" />
          </div>

          <div className="heading-section">
            <h2 className="fw-bold lh-base">
              <span className="nowrap">If opportunity doesn’t </span><br />
              knock, build a <span className="neon-green">door.</span>
            </h2>

            <p className="terms-text">
              A designer knows he has achieved perfection not when there is nothing
              left to add, but when there is nothing left to take away.
            </p>
          </div>

          <SignUpForm signUpData={signUpData} setSignUpData={setSignUpData} navigate={navigate} />
        </Col>

        <RightSideInBoth />

      </Row>
    </Container>
  );
};

export default SignUp;

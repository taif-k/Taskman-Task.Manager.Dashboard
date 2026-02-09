import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Image, Button } from "react-bootstrap";
import avatarImg from "../assets/images/avatar_img.webp";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("currentUser")) ||
      JSON.parse(sessionStorage.getItem("currentUser"));

    if (!storedUser) {
      navigate("/auth/sign-in");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body className="text-center">
              <Image
                src={avatarImg}
                roundedCircle
                width={100}
                height={100}
                className="mb-3"
              />

              <h4 className="fw-bold mb-1">{user.fullName}</h4>
              <p className="text-muted">{user.email}</p>

              <hr />

              {/* Profile Info */}
              <div className="text-start">
                <Row className="mb-2">
                  <Col className="text-muted">Role</Col>
                  <Col className="fw-semibold">Team Member</Col>
                </Row>

                <Row className="mb-2">
                  <Col className="text-muted">Status</Col>
                  <Col className="fw-semibold text-success">Active</Col>
                </Row>

                <Row className="mb-2">
                  <Col className="text-muted">Account Type</Col>
                  <Col className="fw-semibold">Free</Col>
                </Row>
              </div>

              <Button
                variant="outline-success"
                className="mt-4 w-100"
                onClick={() => alert("Edit Profile coming soon 😄")}
              >
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;

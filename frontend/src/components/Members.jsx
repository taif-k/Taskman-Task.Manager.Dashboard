import { Col, Container, Row } from "react-bootstrap";
import avatarImg from "../assets/images/avatar_img.webp";
import Image from "react-bootstrap/Image";

const Members = () => {
  const avatarSizes = [30];

  let content;
  try {
    content = (
      <div className="d-flex gap-1 align-items-center flex-wrap">
        {avatarSizes.map((size, index) => (
          <Image
            key={index}
            src={avatarImg}
            roundedCircle
            width={size}
            height={size}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <Row>
        <div
          className="mb-2 section-title">
          Members <span>({avatarSizes.length})</span>
        </div>

        {content}
      </Row>
    </>
  );
};

export default Members;

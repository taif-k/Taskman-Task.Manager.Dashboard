import { Col, Container, Row } from "react-bootstrap";
import avatarImg from "../assets/images/avatar_img.webp";
import Image from 'react-bootstrap/Image';

const Members = () => {
    const avatarSizes = [30];
    return (
        <>
            <Row>
                <div className="mb-2 fw-semibold font-18" >Members <span>({avatarSizes.length})</span></div>
                
                <div className="d-flex gap-1 align-items-center flex-wrap">
                    {avatarSizes.map((size, index) => (
                        <Image key={index} src={avatarImg} roundedCircle width={size} height={size}/>
                    ))}
                </div>
            </Row>
        </>
    )
}

export default Members

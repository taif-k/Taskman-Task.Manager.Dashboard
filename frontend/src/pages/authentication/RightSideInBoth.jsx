import blankLogo from "../../assets/icons/signUpRightIcon.svg";

import { Col, Image, } from "react-bootstrap";
const RightSideInBoth = () => {
    return (
        <Col md={6} className="right-side-both">
            <Image src={blankLogo} className="illustration-logo" alt="sun and mountain logo" />
            <h2>
                Where <span className="light-brwn-underline">remote</span> teams
                <br /> get work done
            </h2>

            <p>
                The online collaborative whiteboard platform to bring teams together,
                anytime, anywhere.
            </p>
        </Col>


    )
}

export default RightSideInBoth

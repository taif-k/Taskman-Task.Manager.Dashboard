import React, { useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { handleInputChange, handleSignUp } from "../../helpers/InMultipleFiles";

const SignUpForm = ({ signUpData, setSignUpData, navigate }) => {


    const onInputChange = useCallback(
        (e) => handleInputChange(e, setSignUpData),
        [setSignUpData]
    );


    const onFormSubmit = useCallback(
        (e) => handleSignUp(e, signUpData, navigate),
        [signUpData, navigate]
    );

    return (
        <Form
            style={{ maxWidth: "400px" }}
            onSubmit={onFormSubmit}
            className="fw-normal"
        >

            <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    type="text"
                    name="fullName"
                    className="input-top-border"
                    value={signUpData.fullName}
                    onChange={onInputChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>E-mail Address</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    className="input-top-border"
                    value={signUpData.email}
                    onChange={onInputChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={signUpData.password}
                    onChange={onInputChange}
                    className="input-top-border"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={signUpData.confirmPassword}
                    onChange={onInputChange}
                    className="input-top-border"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Check
                    name="termsChecked"
                    type="checkbox"
                    label={<>I agree to all the Terms & Privacy Policy</>}
                    onChange={onInputChange}
                />
            </Form.Group>

            <Button type="submit" className="w-100 mb-3 btn-neon-green">
                Create Account
            </Button>

            <div>
                Already have an account?{" "}
                <NavLink to="/auth/sign-in" className="neon-green">
                    Log In
                </NavLink>
            </div>
        </Form>
    );
};


export default React.memo(SignUpForm);

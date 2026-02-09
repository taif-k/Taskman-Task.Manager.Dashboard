import React, { useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { handleSignIn, handleInputChange } from "../../helpers/InMultipleFiles";


const SignInForm = ({ setFormData, dispatch, navigate }) => {

    const onInputChange = useCallback(
        (e) => handleInputChange(e, setFormData),
        [setFormData]
    );


    const onFormSubmit = useCallback(
        (e) => handleSignIn(e, dispatch, navigate),
        [dispatch, navigate]
    );

    return (
        <Form className="signin-form" onSubmit={onFormSubmit}>
            <Form.Group className="mb-3">
                <Form.Label className="custom-form-label neon">
                    E-mail Address
                </Form.Label>
                <Form.Control
                    name="email"
                    type="email"
                    className="input-bottom-border"
                    onChange={onInputChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className="d-flex justify-content-between">
                    Password
                    <a href="#" className="neon-green fs-7">
                        Forgot Password?
                    </a>
                </Form.Label>
                <Form.Control
                    name="password"
                    type="password"
                    className="input-bottom-border"
                    onChange={onInputChange}
                    required
                />
            </Form.Group>

            <Form.Check
                name="remember"
                label="Remember my password"
                className="mb-3"
            />

            <Button
                type="submit"
                className="login-btn login-clr-bg"
                style={{ marginBlock: "41px 54px" }}
            >
                Login
            </Button>

            <div className="signup-text ">
                Don’t have an account?{" "}
                <NavLink to="/auth/sign-up" className="neon-green">
                    Sign Up
                </NavLink>
            </div>
        </Form>
    );
};


export default React.memo(SignInForm);

import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { findUserByEmail } from "../../firebase/api";
import sha256 from "crypto-js/sha256";
import { ForgotPassword } from './forgotPassword'; // Importa el componente ForgotPassword
import './loginform.css';

export const LoginForm = () => {
    const [loginError, setLoginError] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false); // Estado para controlar si se muestra el componente ForgotPassword

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.formBasicEmail.value;
        const password = e.target.elements.formBasicPassword.value;
        try {
            const userData = await findUserByEmail(email);
            if (userData) {
                if (sha256(password).toString() === userData.password) {
                    console.log("Logged in successfully");
                    setLoginError(false);
                    localStorage.setItem('user', JSON.stringify(userData));
                    window.location.href = '/'; // Replace '/' with the actual home route
                } else {
                    console.log("Incorrect password");
                    setLoginError("Contraseña incorrecta. Por favor, inténtelo de nuevo.");
                }
            } else {
                console.log("No such user found");
                setLoginError("Usuario no encontrado.");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleForgotPasswordClick = () => {
        setShowForgotPassword(true);
    };

    const handleHideForgotPasswordClick = () => {
        setShowForgotPassword(false);
    };

    return (
        <div className="login-form-container">
            {loginError && (
                <Alert variant="danger">
                    {loginError}
                </Alert>
            )}
            <div className="form-container mt-5">
                <Row className="justify-content-center">
                    <Col md="6">
                        <h2 className="text-center" style={{color: "navy"}}>Iniciar sesión</h2>
                        <Form onSubmit={handleLoginSubmit}>
                            <Form.Group controlId="formBasicEmail" className="text-center" style={{color: 'navy'}}>
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control type="email" placeholder="Ingrese su correo electrónico" size="m" style={{ width: '300px' }}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className="text-center" style={{color: 'navy'}}>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Ingrese su contraseña" size="m" style={{ width: '300px' }}/>
                            </Form.Group>
                            <div className="mt-3 d-flex justify-content-center"> 
                                <Button variant="primary" type="submit" block>
                                    Iniciar sesión
                                </Button>
                            </div>
                        </Form>
                        <p className="mt-3 text-center" style={{ color: 'navy'}}>
                            ¿No tienes una cuenta? 
                            <br></br>
                            <a href="register" style={{color: 'navy'}}>Crear una cuenta</a>
                        </p>
                        
                        {/* Agrega el enlace para mostrar el componente ForgotPassword */}
                        <p className="mt-3 text-center" style={{ color: 'navy', cursor: 'pointer' }} onClick={handleForgotPasswordClick}>
                            ¿Olvidaste la Contraseña?
                        </p>
                        {/* Muestra el componente ForgotPassword solo cuando showForgotPassword es true */}
                        {showForgotPassword && (
                            <div>
                                <ForgotPassword />
                                {/* Agrega un enlace para ocultar el componente ForgotPassword */}
                                <p className="mt-3 text-center" style={{ color: 'navy', cursor: 'pointer' }} onClick={handleHideForgotPasswordClick}>
                                    Ocultar
                                </p>
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

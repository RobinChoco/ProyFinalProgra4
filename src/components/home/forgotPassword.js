import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { findUserByEmail } from "../../firebase/api";
import { resetUserPassword } from "../../firebase/auth";
import sha256 from "crypto-js/sha256";
import './forgotPassword.css';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const userData = await findUserByEmail(email);
            if (userData) {
                // Reset user's password
                const newPassword = generateRandomPassword(); // Generate a random password
                await resetUserPassword(email, sha256(newPassword).toString());
                setSuccessMessage(`Se ha restablecido la contraseña para ${email}. La nueva contraseña es: ${newPassword}`);
                setError(null);
            } else {
                setError("No se encontró ningún usuario con este correo electrónico.");
                setSuccessMessage(null);
            }
        } catch (error) {
            console.error('Error:', error);
            setError("Hubo un error al restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.");
            setSuccessMessage(null);
        }
    };

    const generateRandomPassword = () => {
        // Logic to generate a random password
        // This is just an example, you can customize it as needed
        return Math.random().toString(36).slice(-8);
    };

    return (
        <div className="login-form-container">
            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}
            {successMessage && (
                <Alert variant="success">
                    {successMessage}
                </Alert>
            )}
            <div className="">
                <Row className="">
                    <Col md="6">
                        <h2 className="text-center" style={{ color: "navy" }}>Restablecer Contraseña</h2>
                        <Form onSubmit={handleResetPassword}>
                            <Form.Group controlId="formBasicEmail" >
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Ingrese su correo electrónico"
                                    style={{ width: '300px' }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <div className="btn-primary">
                                <Button variant="primary" type="submit" block>
                                    Restablecer Contraseña
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

export default function LoginPage() {

    let credentials = {};

    const getUser = () => {
        axios
            .post("authenticate", JSON.stringify(credentials), {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                localStorage.setItem("token", res.data.jwt);
            })
            .catch((err) => {
                console.log("Something wrong with BE...");
            });
    };

    return (
        <Container className="align-content-center w-50">
            <Form>
                <Form.Group>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your username.."
                        onChange={function (e) {
                            credentials.username = e.target.value;
                        }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password.."
                        onChange={function (e) {
                            credentials.password = e.target.value;
                        }}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={function (e) {
                        e.preventDefault();
                        getUser();
                    }}
                >
                    Login
                </Button>
            </Form>
        </Container>
    );
}

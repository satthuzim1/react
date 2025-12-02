import logo from './images/undraw_remotely_2j6y.svg';
import loadingGif from './images/gif/loading.gif';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { React, useState } from 'react';
import './js/main';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useCookies } from 'react-cookie'
import { postLogin, callApi } from './js/api';

function LoginForm(prop) {
    return (
        <Form id="loginForm" onSubmit={prop.onSubmit}>
            <div className="mb-3">
                <div className="w-auto">
                    <FloatingLabel controlId="username" label="Username">
                        <Form.Control type="text" placeholder="Username" value={prop.username} onChange={prop.onChange} />
                    </FloatingLabel>
                </div>
            </div>
            <div className="mb-3">
                <FloatingLabel controlId="password" label="Password">
                    <Form.Control type="password" placeholder="Password" value={prop.password} onChange={prop.onChange} />
                </FloatingLabel>
            </div>
            <div className="warning">
                <p>{prop.errMessage}</p>
            </div>
            <input type="submit" value="Log In" className="btn btn-block btn-primary submit" />
        </Form>
    )
}


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [cookies, setCookie] = useCookies(['user']);


    const handleChange = (e) => {
        e.target.id === "username" ? setUsername(e.target.value) : setPassword(e.target.value)
        setErrMessage('')
    }

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const qwe = { username, password }
            const response = await callApi(postLogin, qwe,'')

            if (response.isSuccess) {
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getSeconds() + 3600); // Thời gian hết hạn sau 7 ngày
                const cookieValue = JSON.stringify({ name: response.message.name, token: response.message.token });
                setCookie('user', cookieValue, { expires: expirationDate, path: '/' });
                window.location = '/admin'
            } else {
                setErrMessage("Sai tài khoản hoặc mật khẩu")
            }
            setLoading(false)
        } catch (e) {
            console.error("E: ", e.message)
            setLoading(false)
        }
    }


    return (
        <div className="login">
            <Container>
                <Row>
                    <div className="content-in-container" id="content-in-container">
                        <Col md={6}>
                            <img src={logo} alt="login" className="img-fluid" />
                        </Col>
                        <Col md={6}>
                            <Col md={8} className='mx-auto'>
                                <div className="sub-1">
                                    <div className="mb-4">
                                        <h3>Sign In</h3>
                                        <p className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur
                                            adipisicing.</p>
                                    </div>

                                    <LoginForm username={username} password={password} errMessage={errMessage} onChange={handleChange} onSubmit={handleSubmit} />

                                </div>
                            </Col>
                        </Col>
                    </div>
                </Row>

                <div className={loading ? 'loading-frame show' : ' loading-frame none'} id="loading-frame">
                    <div className="bars-1">
                        <img src={loadingGif} alt="loading" className="img-fluid" />
                    </div>
                </div>

            </Container>

        </div>
    );

    // return(
    //     <Router>
    //   <Route exact path="/">
    //     {isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
    //   </Route>
    //   <Route path="/login">
    //     <Login setIsLoggedIn={setIsLoggedIn} />
    //   </Route>
    //   <Route path="/home">
    //     {isLoggedIn ? <Home /> : <Redirect to="/login" />}
    //   </Route>
    //   <Route path="/about">
    //     {isLoggedIn ? <About /> : <Redirect to="/login" />}
    //   </Route>
    // </Router>
    // );
}

export default Login;
// cmd: npm start

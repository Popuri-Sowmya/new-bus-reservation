import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/RegisterComponent.css";
import UserService from '../services/UserService.jsx';
import '../styles/UserLogin.css';
import { loginSuccess } from './actions/authActions';
import login1 from '../utils/login1.jpeg';

const UserLoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [username, pwd])

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log("entered handle function....")
        const userlogindata = { username: username, password: pwd };
        console.log("username and password from form...", userlogindata)
        try {
            const response = await UserService.userlogin(userlogindata);
            const token = response.data;
            console.log("response from authentication...", token)
            const userResponse = await UserService.getbyUsername(username);
            const roles = userResponse.data.roles;
            const user = userResponse.data
            console.log("user recieved from getbyusername api...", user)
            console.log("dispatching values from loginform", user, roles, token)
            dispatch(loginSuccess({ user, roles, token }));
            setUsername('');
            setPwd('');
            switch (roles) {
                case 'ROLE_ADMIN':
                    navigate('/adminui');
                    break;
                case 'ROLE_OPERATOR':
                    navigate('/operatorui');
                    break;
                case 'ROLE_USER':
                    navigate('/');
                    break;
                default:
                    navigate('/89');
            }
        } catch (error) {
            console.log(error);
            if (!error.response) {
                setErrMsg("No server response");
            } else if (error.response.status === 403) {
                setErrMsg("Invalid username or password");
            } else {
                setErrMsg("Login failed");
            }
        }
    };

    return (
        <div className="background">
            <section className="vh-80" style={{ backgroundColor: '#87ceeb' }}>
                    <div className="container-fluid">
                        <div className="row">
                            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                                {errMsg}
                            </p>
                            <div className="col-sm-4 text-white ">
                                <div className="px-5 ms-xl-4">
                                    <br />
                                    <br />
                                    <br />
                                    <h3 className="color:blue">Your journey begins here!!</h3>
                                </div>

                                <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                                    <form style={{ width: '23rem' }} onSubmit={handleLoginSubmit}>
                                        <h1 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log in</h1>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="text"
                                                id="username"
                                                className="form-control form-control-lg"
                                                placeholder="User Name"
                                                onChange={(e) => setUsername(e.target.value)}
                                                value={username}
                                                required
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control form-control-lg"
                                                placeholder="Password"
                                                onChange={(e) => setPwd(e.target.value)}
                                                value={pwd}
                                                required
                                            />
                                        </div>
                                        <div className="pt-1 mb-4">
                                            <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                                        </div>
                                        <p className="small mb-40 pb-lg-2"><Link to="/forget">Forgot password?</Link></p>
                                        <p>Don&apos;t have an account? <Link to="/register" className="link-primary">Register here</Link></p>
                                    </form>
                                </div>
                            </div>
                            <div className="col-sm-8 px-0 d-none d-sm-block" style={{ marginBottom: '0' }}>
                                <img
                                    src={login1}
                                    alt="Login image"
                                    className="w-100 vh-90"
                                    style={{ maxHeight: 'calc(100vh - 64px)', objectFit: 'contain', marginTop: "0px", objectPosition: 'left' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
        </div>
    );
}

export default UserLoginForm;
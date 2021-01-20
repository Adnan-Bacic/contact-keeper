import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        //redirect
        if(isAuthenticated){
            props.history.push('/');
        }

        if(error === 'invalid credentials'){
            setAlert(error, 'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [ user, setUser ] = useState({
        email: '',
        password: ''
    });

    //destructure
    const { email, password } = user;

    const inputOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const formOnSubmit = (e) => {
        e.preventDefault();

        if(email === '' || password === ''){
            setAlert('please fill in all fields', 'danger');
        } else {
            login({
                email,
                password
            })
        }
    }

    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Login</span></h1>
            <form onSubmit={formOnSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={inputOnChange} required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={inputOnChange} required></input>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
        </div>
    )
}

export default Login
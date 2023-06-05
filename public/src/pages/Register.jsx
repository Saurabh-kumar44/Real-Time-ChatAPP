import React, { useState, useEffect } from 'react'
import { Link, json, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            console.log("Inside validation");
            const { password, username, email } = values;
            //sending post request to the register route URL with these paramenter to the backend server
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password
            });
            if(data.status === false){
                toast.error(data.msg, toastOption);
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                //if everything is ok then navigate to the login page
                navigate('/')
            }
        }
    };
    const handleChange = (event) => {
        // console.log(event.target.name);
        // console.log(event.target.value);
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const toastOption = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    }
    const handleValidation = (event) => {
        const { password, confirmPassword, username, email } = values;
        console.log(password, confirmPassword);
        if (password !== confirmPassword) {
            toast.error("Password and confirm password do not match",
                toastOption);
            return false;
        } else if (username.length < 3) {
            toast.error("User name must be greater than 3 characters",
                toastOption);
        } else if (password.length < 8) {
            toast.error("Password must be equal to or greater than 8 characters",
                toastOption);
            return false;
        } else if (email === '') {
            toast.error("Email required", toastOption);
            return false;
        } return true;
    }


    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => { handleSubmit(event) }}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" style={{ height: "5rem" }} />
                        <h1>Snappy</h1>
                    </div>
                    <input type="text" placeholder='Username' name='username' onChange={e => { handleChange(e) }} />
                    <input type="email" placeholder='Email' name='email' onChange={e => { handleChange(e) }} />
                    <input type="password" placeholder='Password' name='password' onChange={e => { handleChange(e) }} />
                    <input type="password" placeholder='Confirm password' name='confirmPassword' onChange={e => { handleChange(e) }} />
                    <button type='submit'>Create User</button>
                    <span>  Already have an account? <Link to="/login">Login</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand{
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img{
            height: 5rem;
        }
        h1{
            color: white;
        }
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding: 0.5rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.5rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus{
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button{
            background-color:#9971f0;
            padding: 0.5rem;
            border-radius: 1rem 2rem;
            font-weight: bold;
            text-transform: uppercase;
            cursor: pointer;
            &:hover{
                background-color: #4e0eff;
            }
        }
        span{
            color: white;
            text-transform: uppercase;
            a{
                color: #4e0eff;
                text-transform: uppercase;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
;
`

export default Register;


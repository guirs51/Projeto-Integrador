import React from 'react'
import './Register.css'
import { FaGooglePlusG } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";



function Register() {

    const container = document.getElementById('container');
    const register = document.getElementById('register');
    const logina = document.getElementById('login');


    function regis() {
        register.addEventListener('click', () => {
            container.classList.add("active");
        })
    }

    function login() {
        logina.addEventListener('click', () => {
            container.classList.remove("active");
        })
    }



    return (
        <>
            <div className='container'>
                <div className='form-container sign-up'>
                    <form>
                        <h1> Create Account</h1>
                        <div className='social-icons'>
                            <a className="icon" href=""><FaGooglePlusG /></a>
                            <a className="icon" href=""><FaFacebookF /></a>
                            <a className="icon" href=""><FaGithub /></a>
                            <a className="icon" href=""><FaLinkedinIn /></a>
                        </div>
                        <span>or use your email for registartion</span>
                        <input type="text" placeholder='Name' />
                        <input type="email" placeholder='Email' />
                        <input type="password" placeholder='password' />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className='form-container sign-in'>
                    <form>
                        <h1>Sign in</h1>
                        <div className='social-icons'>
                            <a className="icon" href=""><FaGooglePlusG /></a>
                            <a className="icon" href=""><FaFacebookF /></a>
                            <a className="icon" href=""><FaGithub /></a>
                            <a className="icon" href=""><FaLinkedinIn /></a>
                        </div>
                        <span>or use your email passsword</span>
                        <input type="email" placeholder='Email' />
                        <input type="password" placeholder='Password' />
                        <a href="">Forget Your Password</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className='toggle-container'>
                    <div className='toggle'>
                        <div className='toggle-panel toggle-left'>
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site feature</p>
                            <button className='hidden' id='login' onClick={login}>Sign In</button>
                        </div>
                        <div className='toggle-panel toggle-right'>
                            <h1>Hello</h1>
                            <p>Register  with your personal details to use all site features</p>
                            <button className='hidden' id='register' onClick={regis}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Register
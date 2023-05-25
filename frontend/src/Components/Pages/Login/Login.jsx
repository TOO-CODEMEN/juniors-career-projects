import React, { useState, useEffect } from 'react'
import cl from "./Login.module.css"
import Input from "../../UI/Input/Input"
import { NavLink, useNavigate } from 'react-router-dom'
import { signInUser } from "../../../firebase";
import { startSession } from "../../../session";
import { isLoggedIn } from "../../../session";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Пожалуйста, введите почту и пароль!");
            return;
        }

        try {
            let loginResponse = await signInUser(email, password);
            startSession(loginResponse.user);
            navigate("/main");
        } catch (error) {
            console.error(error.message);
        }

    }

    useEffect(() => {
        if (isLoggedIn()) {
            navigate("/main")
        }
    }, [navigate])

    return (
        <form className={cl.Authorization} onSubmit={
            onSubmitHandler
        }>
            <div className={cl.Input}><Input value={email} setValue={setEmail} type="text" label="E-mail" /></div>
            <div className={cl.Input}><Input value={password} setValue={setPassword} type="password" label="Пароль" /></div>
            <button className={cl.Button}>Авторизоваться</button>
            <NavLink to={'/register'} className={cl.register__link}>
                Зарегистрироваться
            </NavLink>
        </form>
    )
}

export default Login
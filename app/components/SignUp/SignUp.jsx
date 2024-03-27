"use client";

import { useEffect, useState } from "react";
import Styles from "../AuthForm/AuthForm.module.css";
import { isResponseOk, signUp } from "@/app/api/api-utils";
import { endpoints } from "@/app/api/config";
import { useStore } from "../../store/app-store";

export const SignUp = (props) => {
    const [signUpData, setSignUpData] = useState({username: "", email: "", password: ""});
    const [message, setMessage] = useState({status: null, text: null});
    const authConstext = useStore();

    const handleInput = (e) => {
        setSignUpData({...signUpData, [e.target.name]: e.target.value });
    }
    const handleLogin = () => {
        props.login();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await signUp(endpoints.register, signUpData);
        console.log(data);

        if (isResponseOk(data)) {
            setMessage({status: "success", text: "Регистрация прошла успешно!"});
            authConstext.login(data.user, data.jwt);
        }
        else {
            setMessage({status: "error", text: "Такая учётная запись уже существует!"})
        }

        const timer = setTimeout(() => {
            setMessage({status: null, text: null});
            clearTimeout(timer);
        }, 2000);
    }

    useEffect(() => {
        let timer;
        if (authConstext.user) {
            timer = setTimeout(() => {
                props.close();
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, authConstext.user)

    return (
        <form onSubmit={handleSubmit} className={Styles['form']}>
            <h2 className={Styles['form__title']}>Регистрация</h2>
            <div className={Styles['form__fields']}>
                <label className={Styles['form__field']}>
                    <span className={Styles['form__field-title']}>Ник</span>
                    <input onInput={handleInput} name='username' className={Styles['form__field-input']} type="text" placeholder="Aski"/>
                </label>
                <label className={Styles['form__field']}>
                    <span className={Styles['form__field-title']}>Email</span>
                    <input onInput={handleInput} name='email' className={Styles['form__field-input']} type="email" placeholder="hello@world.com"/>
                </label>
                <label className={Styles['form__field']}>
                    <span className={Styles['form__field-title']}>Пароль</span>
                    <input onInput={handleInput} name="password" className={Styles['form__field-input']} type="password" placeholder='***********'/>
                </label>
            </div>
            {message.status ? (
                <p className={Styles["form__message"]}>{message.text}</p>
            ) : (
                <p className={Styles["form__message"]}>Уже есть аккаунт? <span onClick={handleLogin} className={Styles["form__message-signup"]}>Войдите</span>!</p>
            )}
            <div className={Styles['form__actions']}>
                <button className={Styles['form__reset']} type="reset">Очистить</button>
                <button className={Styles['form__submit']} type="submit">Зарегистрироваться</button>
            </div>
        </form>
    )
}
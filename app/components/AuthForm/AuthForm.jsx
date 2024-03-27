"use client";

import Styles from './AuthForm.module.css';
import { authorize, isResponseOk } from '../../api/api-utils';
import { endpoints } from '../../api/config';
import { useEffect, useState } from 'react';
import { useStore } from "../../store/app-store";

export const AuthForm = (props) => {
  const [authData, setAuthData] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState({ status: null, text: null });
  const authContext = useStore();
  

  const handleInput = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempData = await authorize(endpoints.auth, authData);
    
    if (isResponseOk(tempData)) {
      authContext.login(tempData.user, tempData.jwt);
      setMessage({ status: "success", text: "Вы авторизовались!" });
    } else {
      setMessage({ status: "error", text: "Неверные почта или пароль" });
    }
    
    const timer = setTimeout(() => {
      setMessage({status: null, text: null});
      clearTimeout(timer);
    }, 2000);
  };

  const handleSignUp = () => {
    props.signUp();
  }

  useEffect(() => {
    let timer;
    if (authContext.user) {
      timer = setTimeout(() => {
        props.close();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [authContext.user]);

  return (
    <form onSubmit={handleSubmit} className={Styles['form']}>
      <h2 className={Styles['form__title']}>Авторизация</h2>
      <div className={Styles['form__fields']}>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Email</span>
          <input name='identifier' onInput={handleInput} className={Styles['form__field-input']} type="email" placeholder="hello@world.com"/>
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Пароль</span>
          <input name="password" onInput={handleInput} className={Styles['form__field-input']} type="password" placeholder='***********'/>
        </label>
      </div>
      {message.status ? (
          <p className={Styles["form__message"]}>{message.text}</p>
      ) : (
          <p className={Styles["form__message"]}>Ещё нет аккаунта? <span onClick={handleSignUp} className={Styles["form__message-signup"]}>Создайте</span>!</p>
      )}
      <div className={Styles['form__actions']}>
        <button className={Styles['form__reset']} type="reset">Очистить</button>
        <button className={Styles['form__submit']} type="submit">Войти</button>
      </div>
    </form>
  ) 
};

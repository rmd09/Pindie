"use client";

import Link from "next/link";
import Styles from "./Profile.module.css";
import { useStore } from "../store/app-store";
import { useEffect } from "react";
import { Preloader } from "../components/Preloader/Preloader";

export default function Profile() {
    const conventDate = (str) => {
        const time = str.slice(str.indexOf("T") + 1, str.lastIndexOf("."));
        const date = `${str.slice(8, 10)}.${str.slice(5, 7)}.${str.slice(0, 4)}`;
        return `Время: ${time}, Дата: ${date}`;
    }
//2024-03-17T15:14:56.153Z

    const authContext = useStore();
    const data = {
        username: authContext.user?.username,
        email: authContext.user?.email,
        dateOfCreate: authContext.user?.created_at,
        isBlocked: authContext.user?.isBlocked,
    };
    useEffect(() => console.log(typeof(data.dateOfCreate)), [data])

    return (
        authContext.user ?
        <main className={Styles["main"]}>
            <section className={Styles["header-section"]}>
                <h1 className={Styles["h"]}>Профиль</h1>
                <Link href="/"><h3 className={`${Styles["h"]} ${Styles["leave"]}`}>Выйти<img src="/images/arrow.png" alt="arrow"/></h3></Link>
            </section>
            <section className={Styles["main-section"]}>
                <p className={Styles["p"]}>Ник: <span className={Styles["p__span"]}>{data.username}</span></p>
                <p className={Styles["p"]}>Почта: <span className={Styles["p__span"]}>{data.email}</span></p>
                <p className={Styles["p"]}>Дата создания: <span className={Styles["p__span"]}>{conventDate(data.dateOfCreate)}</span></p>
                <p className={Styles["comment"]}>{data.isBlocked ? "К сожалению ваш аккаунт заблокировали. Можете написать в поддержку по адресу podderzhka@example.ru" : "Аккаунт рабочий и данные актуальны. Вы можете голосовать за понравившиеся игры!"}</p>
            </section>
        </main>
        :
        <Preloader />
    )
}
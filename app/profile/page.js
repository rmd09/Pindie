"use client";

import Link from "next/link";
import Styles from "./Profile.module.css";
import { useStore } from "../store/app-store";
import { Preloader } from "../components/Preloader/Preloader";

export default function Profile() {
//2024-03-17T15:14:56.153Z

    const authContext = useStore();
    const data = {
        username: authContext.user?.username,
        email: authContext.user?.email
    };

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
            </section>
        </main>
        :
        <Preloader />
    )
}
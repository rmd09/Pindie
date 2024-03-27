"use client";

import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { Preloader } from "../components/Preloader/Preloader"

export default function Runner() {
    const games = useGetDataByCategory(endpoints.games, "runner");

    return (
        <main className="main-inner">
            {games ? (
            <CardsListSection id="runner" title="Ранеры" data={games} />
            ) : (
            <Preloader />
            )}
        </main>
    );
}
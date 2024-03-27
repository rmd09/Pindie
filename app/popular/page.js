"use client";

import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { Preloader } from "../components/Preloader/Preloader"

export default function Popular() {
    const games = useGetDataByCategory(endpoints.games, "popular");

    return (
        <main className="main-inner">
            {games ? (
            <CardsListSection id="popular" title="Популярные" data={games} />
            ) : (
            <Preloader />
            )}
        </main>
    );
}
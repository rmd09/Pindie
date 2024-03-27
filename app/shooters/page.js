"use client";

import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { Preloader } from "../components/Preloader/Preloader"

export default function Shooter() {
    const games = useGetDataByCategory(endpoints.games, "shooter");

    return (
        <main className="main-inner">
            {games ? (
            <CardsListSection id="shooter" title="Шутеры" data={games} />
            ) : (
            <Preloader />
            )}
        </main>
    );
}
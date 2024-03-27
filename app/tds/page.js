"use client";

import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { Preloader } from "../components/Preloader/Preloader"

export default function TDS() {
    const games = useGetDataByCategory(endpoints.games, "TDS");

    return (
        <main className="main-inner">
            {games ? (
            <CardsListSection id="TDS" title="TDS" data={games} />
            ) : (
            <Preloader />
            )}
        </main>
    );
}
"use client";

import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { Preloader } from "../components/Preloader/Preloader"

export default function Pixel() {
    const games = useGetDataByCategory(endpoints.games, "pixel");

    return (
        <main className="main-inner">
            {games ? (
            <CardsListSection id="pixel" title="PIXEL" data={games} />
            ) : (
            <Preloader />
            )}
        </main>
    );
}
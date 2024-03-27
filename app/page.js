"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { Banner } from "./components/Banner/Banner";
import { Promo } from "./components/Promo/Promo";
import { CardsListSection } from "./components/CardsListSection/CardsListSection";
import { endpoints } from "./api/config";
import { useGetDataByCategory } from "./api/api-hooks";
import { Preloader } from "./components/Preloader/Preloader";

export default function Home() {
  const popularGames = useGetDataByCategory(endpoints.games, "popular");

  const newGames = useGetDataByCategory(endpoints.games, "new");

  return (
    <main className="main">
      {popularGames && newGames ? (
        <>
          <Banner />
          <CardsListSection type="slider" id="popular" title="Популярное" data={popularGames}/>
          <CardsListSection type="slider" id="new" title="Новинки" data={newGames}/>
          <Promo />
        </>
      ) : (
        <Preloader />
      )}
    </main>
  );
}

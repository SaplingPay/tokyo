'use client'
import Map from "@/components/map"
import Navbar from "@/components/navbar";
import { useEffect } from "react";
import { savedStore } from './store/state'

import SavedDrawer from "@/components/savedDrawer";
import RestaurantViewDrawer from "@/components/restaurantViewDrawer";
import RecommendedDrawer from "@/components/recommendedDrawer";


export default function Home() {

  useEffect(() => {
    savedStore.persist.rehydrate()
  }, [])

  return (
    <main>

      <Map />
      <Navbar />

      <RestaurantViewDrawer />
      <RecommendedDrawer />
      <SavedDrawer />

    </main>
  );
}

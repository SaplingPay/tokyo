'use client'
import Map from "@/components/map"
import HomeDrawer from "@/components/homeDrawer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import { ChevronUp, ShareIcon } from 'lucide-react';
import { drawerStore, navStore, savedStore } from './store/state'

import SavedDrawer from "@/components/savedDrawer";
import RestaurantViewDrawer from "@/components/restaurantViewDrawer";
import { Modal } from "antd";
import { CreateMenu, GetMenus, GetVenues, UpdateVenue } from "./actions";
import RecommendedDrawer from "@/components/recommendedDrawer";


export default function Home() {

  const [openVenueDrawer, setOpenVenueDrawer] = useState(false)
  const { selectedVenue, setSelectedVenue, setOpenRecommend } = drawerStore();

  useEffect(() => {
    savedStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    setOpenVenueDrawer(!!selectedVenue)
  }, [selectedVenue])

  return (
    <main>

      <Map setSelectedVenue={setSelectedVenue} setOpenVenueDrawer={setOpenVenueDrawer} />
      <Navbar />

      <RestaurantViewDrawer setOpen={setOpenVenueDrawer} open={openVenueDrawer} selectedVenue={selectedVenue} />
      <RecommendedDrawer />
      <SavedDrawer />



    </main>
  );
}

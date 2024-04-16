'use client'
import Map from "@/components/map"
import Navbar from "@/components/navbar";
import ProfileIcon from "@/components/profileIcon";
import { useEffect } from "react";
import { savedStore } from './store/state'

import SavedDrawer from "@/components/savedDrawer";
import RestaurantViewDrawer from "@/components/restaurantViewDrawer";
import { Modal } from "antd";
import { CreateMenu, GetMenus, GetVenues, UpdateVenue } from "./actions";
import SignInModal from "@/components/signInModal";
import { useUser } from "@clerk/nextjs";
import SignInPage from "@/components/signIn";
import RecommendedDrawer from "@/components/recommendedDrawer";


export default function Home() {

  useEffect(() => {
    savedStore.persist.rehydrate()
  }, [])

  return (
    <main>

      <Map />
      <Navbar />
      <ProfileIcon />

      <RestaurantViewDrawer />
      <RecommendedDrawer />
      <SavedDrawer />

      {/* <SignInModal openModal={openSignInModal} setOpenModal={setOpenSignInModal} /> */}

    </main>
  );
}

'use client'
import Map from "@/components/map"
import Navbar from "@/components/navbar";
import ProfileIcon from "@/components/profileIcon";
import { useEffect, useState } from "react";
import { savedStore, userStore } from './store/state'

import SavedDrawer from "@/components/savedDrawer";
import RestaurantViewDrawer from "@/components/restaurantViewDrawer";
import { Modal } from "antd";
import { CreateMenu, GetMenus, GetUser, GetVenues, UpdateVenue } from "./actions";
import SignInModal from "@/components/signInModal";
import { useUser } from "@clerk/nextjs";
import SignInPage from "@/components/signIn";
import RecommendedDrawer from "@/components/recommendedDrawer";
import { useRouter } from "next/navigation";


export default function Home() {
  const { user: clerkUser } = useUser();
  const { push } = useRouter()
  // const [user, setUser] = useState<any>({});
  const { user, setUser } = userStore()

  useEffect(() => {
    savedStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    if (clerkUser) {
      GetUser(clerkUser.id)
        .then((res) => {
          console.log(res)
          if (res.error == 'user not found') {
            push('/register')
          }
          setUser(res)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [clerkUser])

  return (
    <main>

      <Map />
      <Navbar />
      <ProfileIcon />

      <RestaurantViewDrawer />
      <RecommendedDrawer />
      <SavedDrawer />

    </main>
  );
}

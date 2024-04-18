'use client'
import Map from "@/components/map"
import Navbar from "@/components/navbar";
import ProfileIcon from "@/components/profileIcon";
import SearchButton from "@/components/ui/searchButton";
import { useEffect } from "react";
import { savedStore, userStore } from './store/state'

import SavedDrawer from "@/components/savedDrawer";
import RestaurantViewDrawer from "@/components/restaurantViewDrawer";
import { GetUser, GetUserSaves, GetVenues } from "./actions";
import { useUser } from "@clerk/nextjs";
import RecommendedDrawer from "@/components/recommendedDrawer";
import { useRouter } from "next/navigation";


export default function Home() {
  const { user: clerkUser } = useUser();
  const { push } = useRouter()
  const { user, setUser } = userStore()
  const { storedSaves, storeSaves, storeVenues } = savedStore()

  useEffect(() => {
    GetVenues().then((res: any) => {
      // console.log('res', res)
      storeVenues(res)
    })

    return () => { }
  }, [])


  useEffect(() => {
    // savedStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    // console.log("clerkUser", clerkUser)

    // Load user data
    if (clerkUser) {
      GetUser(clerkUser.id)
        .then((res) => {
          // console.log(res)
          if (res.error == 'user not found') {
            push('/register')
          } else {
            // Save user data
            setUser(res)

            storeSaves([])
            // Save user saves
            if (res.saves && res.saves.length > 0) {
              GetUserSaves(res.id)
                .then((res) => {
                  console.log(res)
                  storeSaves(res)
                })
            }

          }

        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      // Not logged in
      savedStore.persist.rehydrate()
    }
    // console.log('storedSaves', storedSaves)

  }, [clerkUser])

  return (
    <main>

      <SearchButton />
      <Map />
      <Navbar />
      <ProfileIcon />

      <RestaurantViewDrawer />
      <RecommendedDrawer />
      <SavedDrawer />

    </main>
  );
}

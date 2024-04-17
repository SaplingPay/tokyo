'use client'
import Map from "@/components/map"
import Navbar from "@/components/navbar";
import ProfileIcon from "@/components/profileIcon";
import SearchButton from "@/components/ui/searchButton";
import { useEffect, useState } from "react";
import { savedStore, userStore } from './store/state'

import SavedDrawer from "@/components/savedDrawer";
import RestaurantViewDrawer from "@/components/restaurantViewDrawer";
import { Modal } from "antd";
import { CreateMenu, GetMenu, GetMenus, GetUser, GetVenue, GetVenues, UpdateVenue } from "./actions";
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
  const { storedSaves, storeSaves, storeVenues } = savedStore()

  useEffect(() => {
    GetVenues().then((res: any) => {
      console.log('res', res)
      storeVenues(res)
    })

    return () => { }
  }, [])

  const getSaves = (userSaves: any[]) => {
    console.log('userSaves', userSaves)
    console.log('storedSaves', storedSaves)

    const sTemp = [] as any[]

    for (let i = 0; i < userSaves.length; i++) {

      GetVenue(userSaves[i].venue_id)
        .then((res) => {
          if (userSaves[i].type == 'menu_item') {
            GetMenu(userSaves[i].venue_id, userSaves[i].menu_id)
              .then((r: any) => {
                const sItem = r.items.filter((it: any) => userSaves[i].menu_item_id === it.id)[0]

                const s = {
                  type: 'menu_item',
                  venue_id: userSaves[i].venue_id,
                  menu_id: userSaves[i].menu_id,
                  menu_item_id: userSaves[i].menu_item_id,
                  name: sItem.name,
                  venue_name: res.name,
                  profile_pic_url: res.profile_pic_url,
                  location: res.location
                }
                console.log(s.name)
                const storeS = [...sTemp, s]
                sTemp.push(s)

                storeSaves(storeS)
              })

          } else if (userSaves[i].type == 'venue') {
            const s = {
              type: 'venue',
              venue_id: res.id,
              name: res.name,
              profile_pic_url: res.profile_pic_url,
              location: res.location
            }
            const storeS = [...sTemp, s]
            sTemp.push(s)

            storeSaves(storeS)
          }
        })
    }
  }

  useEffect(() => {
    // savedStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    console.log("clerkUser", clerkUser)

    // Load user data
    if (clerkUser) {
      GetUser(clerkUser.id)
        .then((res) => {
          console.log(res)
          if (res.error == 'user not found') {
            push('/register')
          } else {
            // Save user data
            setUser(res)

            storeSaves([])
            // Save user saves
            if (res.saves && res.saves.length > 0) {
              getSaves(res.saves)
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
    console.log('storedSaves', storedSaves)

  }, [clerkUser])

  return (
    <main>

      <SearchButton/>

      <Navbar />
      <ProfileIcon />

      <RestaurantViewDrawer />
      <RecommendedDrawer />
      <SavedDrawer />

    </main>
  );
}

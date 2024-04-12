'use client'
import Map from "@/components/map"
import Navbar from "@/components/navbar";
import ProfileIcon from "@/components/profileIcon";
import { useEffect } from "react";
import { savedStore } from './store/state'

import SavedDrawer from "@/components/savedDrawer";
import RestaurantViewDrawer from "@/components/restaurantViewDrawer";
<<<<<<< HEAD
import RecommendedDrawer from "@/components/recommendedDrawer";
=======
import { Modal } from "antd";
import { CreateMenu, GetMenus, GetVenues, UpdateVenue } from "./actions";
import SignInModal from "@/components/signInModal";
import { useUser } from "@clerk/nextjs";
import SignInPage from "@/components/signIn";
>>>>>>> 3f2fdae (Add User Auth)


export default function Home() {

<<<<<<< HEAD
=======
  const [openVenueDrawer, setOpenVenueDrawer] = useState(false)
  const [selectedVenue, setSelectedVenue] = useState<any>(null)
  const [currentTab, setCurrentTab] = useState("For You")
  const [openSignInModal, setOpenSignInModal] = useState(false)

  const { user } = useUser();

>>>>>>> 3f2fdae (Add User Auth)
  useEffect(() => {
    savedStore.persist.rehydrate()
  }, [])

<<<<<<< HEAD
=======
  useEffect(() => {
    setOpenVenueDrawer(!!selectedVenue)
  }, [selectedVenue])

  useEffect(() => {
    if (currentTab === "Saved") {
      setOpenSignInModal(true)
    }
  }, [currentTab])


  // if (!user) {
  //   return <SignInPage />
  // }

>>>>>>> 3f2fdae (Add User Auth)
  return (
    <main>

<<<<<<< HEAD
      <Map />
      <Navbar />
      <ProfileIcon />

      <RestaurantViewDrawer />
      <RecommendedDrawer />
      <SavedDrawer />
=======
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <RestaurantViewDrawer setOpen={setOpenVenueDrawer} open={openVenueDrawer} selectedVenue={selectedVenue} />
>>>>>>> 3f2fdae (Add User Auth)

      <SignInModal openModal={openSignInModal} setOpenModal={setOpenSignInModal} />

    </main>
  );
}

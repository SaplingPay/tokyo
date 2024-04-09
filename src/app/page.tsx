'use client'
import Map from "@/components/map"
import HomeDrawer from "@/components/homeDrawer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ChevronUp, ShareIcon } from 'lucide-react';
import { navStore } from './store/state'

import SavedDrawer from "@/components/savedDrawer";
import RestaurantViewDrawer from "@/components/restaurantViewDrawer";
import { Modal } from "antd";


export default function Home() {

  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const currentTab = navStore((state: any) => state.current)
  const updateTab = navStore((state: any) => state.update)
  const [openModal, setOpenModal] = useState(false)
  const [welcome, setWelcome] = useState(false)
  const [welcomed, setWelcomed] = useState(false)

  useEffect(() => {
    navStore.persist.rehydrate()
    if (!welcomed) {
      setInterval(() => {
        setWelcome(true)
        setWelcomed(true)
      }, 5 * 60000);
    }

  }, [welcomed])

  return (
    <main className='overflow-hidden'>
      <Navbar current={currentTab} update={updateTab} setOpenModal={setOpenModal} />
      <Map markerClick={() => setDialogOpen(true)} />

      <Button variant="outline" className="absolute bottom-10 right-2 rounded-full py-0 px-2 bg-[#12411B] text-white z-50" onClick={() => setOpen(!open)}><ChevronUp /></Button>

      {/* <HomeDrawer setOpen={setOpen} open={open} /> */}
      <SavedDrawer setOpen={setOpen} open={open} />
      <RestaurantViewDrawer setOpen={setDialogOpen} open={dialogOpen} />

      <Modal
        open={welcome}
        onCancel={() => setWelcome(false)}
        footer={null}
        closable={false}
        maskClosable={true}
        centered
        width={300}
      >
        <div className="text-center">
          <p>Welcome to Sapling! 👋</p>
          <p>Save this web app to your phone with the steps:</p>
          <div className="text-left px-2">
            <span className="flex">1. Click the <ShareIcon className="h-4 w-4 mx-1" /> button below</span>
            <p>{`2. Click 'Add to Home Screen'`}</p>
          </div>
          <button className='bg-[#12411B] px-10 rounded-full py-1 text-white mt-2' onClick={() => setWelcome(false)}>Okay</button>
        </div>
      </Modal>

      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        closable={false}
        maskClosable={true}
        centered
        width={300}
      >
        <div className="text-center pb-2">
          <p className="text-lg font-bold">Sign In to Your Account to Save Dishes</p>
          <button className='bg-slate-200 px-14 rounded-full py-2 text-black mt-2 w-42 mb-2' onClick={() => setOpenModal(false)}>Sign In</button>

          <p>{`Don't have an account?`}</p>
          <button className='bg-[#12411B] px-8 rounded-full py-2 text-white mt-2 w-42' onClick={() => setOpenModal(false)}>Create Account</button>
        </div>
      </Modal>
    </main>
  );
}

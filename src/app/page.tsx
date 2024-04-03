'use client'
import Map from "@/components/map"
import HomeDrawer from "@/components/homeDrawer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronUp } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function Home() {

  const [open, setOpen] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <main>
      <Navbar />
      <Map markerClick={() => setDialogOpen(true)} />

      <Button variant="outline" className="absolute bottom-5 right-5 rounded-full py-0 px-2 bg-[#12411B] text-white z-50" onClick={() => setOpen(!open)}><ChevronUp /></Button>

      <HomeDrawer setOpen={setOpen} open={open} />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              lorem ipsum emoji dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </main>
  );
}

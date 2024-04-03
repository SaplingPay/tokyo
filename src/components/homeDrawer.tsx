import React, { useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerOverlay,
    DrawerPortal
} from "@/components/ui/drawer"

type Props = {
    setOpen: (open: boolean) => void
    open: boolean
}

const HomeDrawer = (props: Props) => {
    // const [open, setOpen] = useState(true)
    const [snap, setSnap] = useState<number | string | null>("148px");

    return (
        <Drawer
            open={props.open}
            onOpenChange={props.setOpen}
        // snapPoints={[0.2, 0.5, 0.8]}
        // activeSnapPoint={snap}
        // setActiveSnapPoint={setSnap}
        >
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-lg">Recommended Restuarants For You</DrawerTitle>
                    {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
                </DrawerHeader>
                {/* <DrawerClose className="absolute top-7 right-5">
            <Button variant="outline" className="rounded-full">X</Button>
          </DrawerClose> */}
            </DrawerContent>
        </Drawer>
    )
}

export default HomeDrawer
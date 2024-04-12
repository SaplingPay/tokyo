import React, { use, useEffect, useState } from 'react'
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GetVenues } from '@/app/actions';
import { navStore, savedStore } from '@/app/store/state';

type Props = {
    markerClick?: () => void
    setSelectedVenue?: (venue: any) => void
    setOpenVenueDrawer?: (open: boolean) => void
}

const Page = (props: Props) => {
    const [venues, setVenues] = useState<any[]>([])
    const { current } = navStore();
    const { savedVenues, allVenues, storeVenues } = savedStore();

    useEffect(() => {
        GetVenues().then((res: any) => {
            console.log('res', res)
            setVenues(res)
            storeVenues(res)
        })

        return () => { }
    }, [])

    const selectVenue = (venue: any) => {
        console.log('venue', venue)
        props.setSelectedVenue!(venue)
        props.setOpenVenueDrawer!(true)
    }

    useEffect(() => {
        console.log('current', current)
        let res = venues
        if (current === 'Saved') {
            res = res.filter((venue: any) => savedVenues.find((sV: any) => sV.id === venue.id))
        } else {
            res = allVenues
        }
        setVenues(res)

        return () => {

        }
    }, [current])


    return (
        <Map
            mapboxAccessToken={process.env.MAP_TOKEN}
            initialViewState={{
                longitude: 4.885872830894215,
                latitude: 52.35999079266464,
                zoom: 12
            }}
            style={{ width: '100vw', height: '100vh', overflow: "hidden" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            {venues?.map((venue, index) => {
                return (
                    <Marker key={index} longitude={venue.location.latitude} latitude={venue.location.longitude} anchor="bottom" onClick={() => selectVenue(venue)}>
                        <div>
                            <div className='p-2 min-w-[3.5em] text-center bg-[#12411B] text-[#F5FFBE] rounded-full border-2 border-solid border-white'>
                                {venue.name.toUpperCase()[0]}
                            </div>
                            {/* <img src="Map_pin.png" className="w-7 h-8" /> */}
                        </div>
                    </Marker>
                )
            })}
            {/* <Marker longitude={4.916990558831426} latitude={52.349281395406265} anchor="bottom" onClick={props.markerClick}>
                <div>
                    <img src="Map_pin.png" className="w-7 h-8" />
                </div>
            </Marker>

            <Marker longitude={4.902386793443318} latitude={52.35344651515512} anchor="bottom">
                <div>
                    <img src="Map_pin.png" className="w-7 h-8" />
                </div>
            </Marker> */}
        </Map>
    )
}

export default Page
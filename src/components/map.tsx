import React, { use, useEffect, useState } from 'react'
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GetVenues } from '@/app/actions';
import { drawerStore, navStore, savedStore } from '@/app/store/state';
import { Avatar } from 'antd';

type Props = {
}

const Page = (props: Props) => {
    const [venues, setVenues] = useState<any[]>([])
    const { current } = navStore();
    const { savedVenues, allVenues, storeVenues } = savedStore();
    const { setSelectedVenue, openVenueFunc } = drawerStore();

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
        setSelectedVenue!(venue)
        openVenueFunc(venue)
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
                        {
                            venue?.profile_pic_url ?
                                <img src={venue.profile_pic_url} alt={""} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: 'white 2px solid' }} />
                                :
                                <Avatar
                                    style={{
                                        backgroundColor: '#12411B',
                                        color: '#F5FFBE',
                                        width: "40px",
                                        height: "40px",
                                        border: 'white 2px solid'
                                    }}>{venue.name.toUpperCase()[0]}
                                </Avatar>
                        }
                    </Marker>
                )
            })}
        </Map>
    )
}

export default Page
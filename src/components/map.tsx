import React, { use, useEffect, useState } from 'react'
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GetVenues } from '@/app/actions';
import { drawerStore, navStore, savedStore } from '@/app/store/state';
import { Avatar } from 'antd';
import VenueIcon from './ui/venueIcon';

type Props = {
}

const Page = (props: Props) => {
    const { current } = navStore();
    const { storedSaves, allVenues } = savedStore();
    const { setSelectedVenue, openVenueFunc } = drawerStore();

    const selectVenue = (venue: any) => {
        console.log('venue', venue)
        setSelectedVenue!(venue)
        openVenueFunc(venue)
    }

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
            {
                current === 'Saved' ?
                    storedSaves && storedSaves.map((venue: any, index: number) => {
                        if (venue.type === 'venue') {
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
                        }
                    })

                    :

                    allVenues && allVenues.map((venue: any, index: number) => {
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
                    })

            }
        </Map>
    )
}

export default Page
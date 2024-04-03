import React from 'react'
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const token = 'pk.eyJ1IjoiY2hyaXMtc2FwbGluZyIsImEiOiJjbHVpMmliY3YwMDFrMmtwMnRzMHFzZmxuIn0.6e-MObmJZpJ_HQg9IG7-OA'

type Props = {
    markerClick?: () => void
}

const Page = (props: Props) => {
    return (
        <Map
            mapboxAccessToken={token}
            initialViewState={{
                longitude: 4.916990558831426,
                latitude: 52.349281395406265,
                zoom: 12
            }}
            style={{ width: '100vw', height: '110vh', }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <Marker longitude={4.916990558831426} latitude={52.349281395406265} anchor="bottom" onClick={props.markerClick}>
                <div>
                    <img src="Map_pin.png" className="w-7 h-8" />
                </div>
            </Marker>

            <Marker longitude={4.902386793443318} latitude={52.35344651515512} anchor="bottom">
                <div>
                    <img src="Map_pin.png" className="w-7 h-8" />
                </div>
            </Marker>
        </Map>
    )
}

export default Page
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, CircleMarker, Tooltip } from 'react-leaflet'
import {sendToServer} from "./rest-commons";

const shopsDummy = [{ "location": [1.3314917725173554, 103.93013377329994] }];
const PoIDetail = () => {
    const { register, handleSubmit, reset } = useForm();
    const [shop, setShop] = useState({})
    const [shops, setShops] = useState([])
    const onSubmit = (data) => {
        if (shop.location) {
            const shopl = Object.assign({}, shop, data)
            const shopsl = [...shops, shopl]

            //sent to server

            sendToServer(shopl).then(()=>{
                setShop({})
                setShops(shopsl)
                reset()
            }).onError(t=>{});
            
        }
        console.error("select a pin ")


    }


    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
            click(e) {
                // map.locate()
                const ss = { ...shop };
                ss.location = e.latlng;
                console.log(e.latlng);
                setShop(ss)
            },
            locationfound(e) {
                // console.log(e.latlng)
                // map.flyTo(e.latlng, map.getZoom())
            },
        })

        return position === null ? null : (
            <Marker position={shop.location}>
                <Popup>You are here{shop.location}</Popup>
            </Marker>
        )
    }

    const points = () => {

        return shops && shops.map((s, index) => {
            const date = Date.now();
            return s.location && (<CircleMarker key={date + index}
                center={s.location}
                pathOptions={{ color: 'red' }}
                radius={5}>
                <Tooltip opacity={0.7} permanent>{s.name}</Tooltip>
            </CircleMarker>)
        })
    }


    return (
        <div>

            <div>
                <div><span>test</span></div>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <input {...register("name")} placeholder="Name of the Shop" />
                        <input {...register("poi")} placeholder="POI" />
                        <select {...register("category")}>
                            <option value="">Select...</option>
                            <option value="A">Category A</option>
                            <option value="B">Category B</option>
                        </select>

                        <input type="submit" />
                    </form>
                </div>


                <div>
                    <MapContainer center={[1.3162514, 103.9443486]} zoom={13} scrollWheelZoom={false} style={{ width: '500px', height: 200 }}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {points()}



                        <LocationMarker />
                    </MapContainer>
                    <span>{shop.name}</span>
                    <span>{JSON.stringify(shop)}</span>
                </div>

            </div>
        </div>
    );
}

export default PoIDetail;

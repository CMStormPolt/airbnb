import Leaflet from "leaflet"
import { MapContainer, TileLayer, Marker } from "react-leaflet"

import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import MarkerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import MarkerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

// @ts-ignore
delete Leaflet.Icon.Default.prototype._getIconUrl
Leaflet.Icon.Default.mergeOptions({
    iconUrl: MarkerIcon.src,
    iconRetinaUrl: MarkerIcon2x.src,
    shadowUrl: MarkerShadow.src
})

interface MapProps {
    center?: number[]
}

export const Map: React.FC<MapProps> = ({
    center
}) => {
    return (
        <MapContainer
            center={center as Leaflet.LatLngExpression || [51, -0.09]}
            zoom={center ? 4 : 2}
            scrollWheelZoom={false}
            className="h-[35vh] rounded-lg"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {center && (
                <Marker 
                    position={center as Leaflet.LatLngExpression}
                />
            )}
        </MapContainer>
    )
}

export default Map
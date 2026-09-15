import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-routing-machine'

interface Props {
    from: [number, number]
    to: [number, number]
    onClear: () => void
}

export default function Routing({ from, to, onClear }: Props) {
    const map = useMap()

    useEffect(() => {
        const control = (L as any).Routing.control({
            waypoints: [
                L.latLng(from[0], from[1]),
                L.latLng(to[0], to[1])
            ],
            routeWhileDragging: false,
            show: false,
            addWaypoints: false,
            lineOptions: {
                styles: [{ color: '#0b41ac', weight: 5, opacity: 0.8}]
            },
            createMarker: () => null
        }).addTo(map)
        return () => {
            try {
            if (map && control) {
                map.removeControl(control)
            }
        } catch (e) {
            console.warn('Could not remove routing control:', e)
        }
    }
    }, [from, to])

    return null
}
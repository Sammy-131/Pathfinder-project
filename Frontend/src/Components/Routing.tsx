import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-routing-machine'

export interface RouteStep {
    text: string
    distance: number
}

export interface RouteInfo {
    distance: number // metres
    time: number     // seconds
    steps: RouteStep[]
}

interface Props {
    from: [number, number]
    to: [number, number]
    onRoute: (route: RouteInfo) => void
}

export default function Routing({ from, to, onRoute }: Props) {
    const map = useMap()

    useEffect(() => {
        const control = (L as any).Routing.control({
            waypoints: [
                L.latLng(from[0], from[1]),
                L.latLng(to[0], to[1])
            ],
            // walking routes so it can cut through campus paths (the default server is car-only)
            router: (L as any).Routing.osrmv1({
                serviceUrl: 'https://routing.openstreetmap.de/routed-foot/route/v1',
                profile: 'foot'
            }),
            routeWhileDragging: false,
            show: false,
            addWaypoints: false,
            lineOptions: {
                styles: [{ color: '#0b41ac', weight: 5, opacity: 0.8}]
            },
            createMarker: () => null
        }).addTo(map)

        // grab the turn-by-turn steps so the building panel can show them
        control.on('routesfound', (e: any) => {
            const route = e.routes[0]
            onRoute({
                distance: route.summary.totalDistance,
                time: route.summary.totalTime,
                steps: route.instructions.map((i: any) => ({ text: i.text, distance: i.distance }))
            })
        })

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

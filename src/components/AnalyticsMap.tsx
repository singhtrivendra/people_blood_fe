
// import React, { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// // Use a temporary public token - in production this should be stored securely
// // This is a limited-functionality public token for demonstration purposes
// const MAPBOX_PUBLIC_TOKEN = 'pk.eyJ1IjoibG92YWJsZS1haS1kZW1vIiwiYSI6ImNsZ3RkbGx2OTBqOWkzZW1wbXlmZXFxbjQifQ.KjKTkBwOBU4E9C_UibeKXg';

// const AnalyticsMap = () => {
//   const mapContainer = useRef<HTMLDivElement>(null);
//   const map = useRef<mapboxgl.Map | null>(null);

//   useEffect(() => {
//     if (!mapContainer.current) return;

//     // Initialize map
//     mapboxgl.accessToken = MAPBOX_PUBLIC_TOKEN;
    
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/light-v11',
//       projection: 'globe',
//       zoom: 1.5,
//       center: [30, 15],
//       pitch: 45,
//     });

//     // Add navigation controls
//     map.current.addControl(
//       new mapboxgl.NavigationControl({
//         visualizePitch: true,
//       }),
//       'top-right'
//     );

//     // Sample donor locations data
//     const donorLocations = [
//       { lat: 40.7128, lng: -74.0060, count: 145, city: 'New York' },
//       { lat: 34.0522, lng: -118.2437, count: 118, city: 'Los Angeles' },
//       { lat: 51.5074, lng: -0.1278, count: 96, city: 'London' },
//       { lat: 48.8566, lng: 2.3522, count: 87, city: 'Paris' },
//       { lat: 35.6762, lng: 139.6503, count: 72, city: 'Tokyo' },
//       { lat: 19.4326, lng: -99.1332, count: 53, city: 'Mexico City' },
//       { lat: -33.8688, lng: 151.2093, count: 41, city: 'Sydney' },
//       { lat: -23.5505, lng: -46.6333, count: 35, city: 'São Paulo' },
//       { lat: 55.7558, lng: 37.6173, count: 29, city: 'Moscow' },
//       { lat: 30.0444, lng: 31.2357, count: 23, city: 'Cairo' },
//     ];

//     // Add markers when the map is loaded
//     map.current.on('load', () => {
//       // Add atmosphere and fog effects
//       map.current?.setFog({
//         color: 'rgb(255, 255, 255)',
//         'high-color': 'rgb(200, 200, 225)',
//         'horizon-blend': 0.2,
//       });
      
//       // Add markers for donor locations
//       donorLocations.forEach(location => {
//         const size = Math.min(50, Math.max(20, location.count / 3));
        
//         // Create a custom marker element
//         const el = document.createElement('div');
//         el.className = 'donor-marker';
//         el.style.width = `${size}px`;
//         el.style.height = `${size}px`;
//         el.style.borderRadius = '50%';
//         el.style.backgroundColor = 'rgba(229, 62, 62, 0.6)';
//         el.style.border = '2px solid rgba(229, 62, 62, 1)';
//         el.style.cursor = 'pointer';
        
//         // Add popup with information
//         const popup = new mapboxgl.Popup({ offset: 25 })
//           .setHTML(`<h3>${location.city}</h3><p>${location.count} donors</p>`);
        
//         new mapboxgl.Marker(el)
//           .setLngLat([location.lng, location.lat])
//           .setPopup(popup)
//           .addTo(map.current!);
//       });
//     });

//     // Rotation animation settings
//     const secondsPerRevolution = 240;
//     const maxSpinZoom = 5;
//     const slowSpinZoom = 3;
//     let userInteracting = false;
//     let spinEnabled = true;

//     // Spin globe function
//     function spinGlobe() {
//       if (!map.current) return;
      
//       const zoom = map.current.getZoom();
//       if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
//         let distancePerSecond = 360 / secondsPerRevolution;
//         if (zoom > slowSpinZoom) {
//           const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
//           distancePerSecond *= zoomDif;
//         }
//         const center = map.current.getCenter();
//         center.lng -= distancePerSecond;
//         map.current.easeTo({ center, duration: 1000, easing: (n) => n });
//       }
//     }

//     // Event listeners for interaction
//     map.current.on('mousedown', () => {
//       userInteracting = true;
//     });
    
//     map.current.on('dragstart', () => {
//       userInteracting = true;
//     });
    
//     map.current.on('mouseup', () => {
//       userInteracting = false;
//       spinGlobe();
//     });
    
//     map.current.on('touchend', () => {
//       userInteracting = false;
//       spinGlobe();
//     });

//     map.current.on('moveend', () => {
//       spinGlobe();
//     });

//     // Start the globe spinning
//     spinGlobe();

//     // Cleanup
//     return () => {
//       map.current?.remove();
//     };
//   }, []);

//   return (
//     <div className="w-full h-full min-h-[400px]">
//       <div ref={mapContainer} className="w-full h-full rounded-md" />
//     </div>
//   );
// };

// export default AnalyticsMap;



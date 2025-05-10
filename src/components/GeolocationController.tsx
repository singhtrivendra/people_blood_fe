// src/utils/geolocation.ts
export class GeolocationController {
    static async coordinatesToAddress(lat: number, lng: number) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        
        if (!response.ok) throw new Error('Geocoding failed');
        
        const data = await response.json();
        return {
          address: data.display_name || "Address not available",
          details: data.address
        };
      } catch (error) {
        console.error("Geocoding error:", error);
        return { address: "Location unavailable", details: null };
      }
    }
  
    static async addressToCoordinates(address: string) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
        );
        
        if (!response.ok) throw new Error('Reverse geocoding failed');
        
        const data = await response.json();
        if (data.length === 0) throw new Error('No coordinates found');
        
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      } catch (error) {
        console.error("Reverse geocoding error:", error);
        return { lat: 0, lng: 0 };
      }
    }
  }
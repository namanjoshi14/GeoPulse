const API_BASE_URL = import.meta.env.VITE_N2YO_API_BASE_URL || 'https://api.n2yo.com/rest/v1/satellite';
const API_KEY = import.meta.env.VITE_N2YO_API_KEY;

if (!API_KEY) {
    throw new Error('N2YO API key is missing. Please check your .env file and ensure VITE_N2YO_API_KEY is set.');
}

class SatelliteAPI {
    static async getTLE(satelliteId) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/tle/${satelliteId}&apiKey=${API_KEY}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch TLE data: ${error.message}`);
        }
    }

    static async getPositions(satelliteId, observerLat, observerLng, observerAlt, seconds = 60) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/positions/${satelliteId}/${observerLat}/${observerLng}/${observerAlt}/${seconds}&apiKey=${API_KEY}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch position data: ${error.message}`);
        }
    }

    static async getVisualPasses(satelliteId, observerLat, observerLng, observerAlt, days = 2, minVisibility = 300) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/visualpasses/${satelliteId}/${observerLat}/${observerLng}/${observerAlt}/${days}/${minVisibility}&apiKey=${API_KEY}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch visual passes data: ${error.message}`);
        }
    }

    static async getWhatsUp(observerLat, observerLng, observerAlt, searchRadius = 70, categoryId = 0) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/above/${observerLat}/${observerLng}/${observerAlt}/${searchRadius}/${categoryId}&apiKey=${API_KEY}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch satellites above data: ${error.message}`);
        }
    }
}

export default SatelliteAPI;
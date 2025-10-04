import { useSatelliteContext } from './useSatelliteContext';
import './SatelliteList.css';

const SatelliteList = () => {
    const { selectedSatellite, setSelectedSatellite, observerLocation, setObserverLocation } = useSatelliteContext();

    const popularSatellites = [
        { id: 25544, name: 'ISS (ZARYA)' },
        { id: 20580, name: 'HUBBLE SPACE TELESCOPE' },
        { id: 43013, name: 'STARLINK-1007' },
        { id: 37849, name: 'NOAA 19' },
        { id: 28654, name: 'SPOT 6' },
        { id: 39084, name: 'TERRA' },
        { id: 27424, name: 'AQUA' },
        { id: 32060, name: 'LANDSAT 8' }
    ];

    const handleSatelliteSelect = (satellite) => {
        setSelectedSatellite(satellite);
    };

    const handleLocationChange = (field, value) => {
        setObserverLocation(prev => ({
            ...prev,
            [field]: parseFloat(value) || 0
        }));
    };

    return (
        <div className="satellite-list-container">
            <div className="satellite-list-content">
                <h3 className="section-title">Observer Location</h3>
                <div className="location-inputs">
                    <div className="input-group">
                        <label>Latitude:</label>
                        <input
                            type="number"
                            step="0.001"
                            value={observerLocation.lat}
                            onChange={(e) => handleLocationChange('lat', e.target.value)}
                            className="location-input"
                            placeholder="41.702"
                        />
                    </div>
                    <div className="input-group">
                        <label>Longitude:</label>
                        <input
                            type="number"
                            step="0.001"
                            value={observerLocation.lng}
                            onChange={(e) => handleLocationChange('lng', e.target.value)}
                            className="location-input"
                            placeholder="-76.014"
                        />
                    </div>
                    <div className="input-group">
                        <label>Altitude (m):</label>
                        <input
                            type="number"
                            step="1"
                            value={observerLocation.alt}
                            onChange={(e) => handleLocationChange('alt', e.target.value)}
                            className="location-input"
                            placeholder="0"
                        />
                    </div>
                </div>

                <h3 className="section-title">Select Satellite</h3>
                <div className="satellite-grid">
                    {popularSatellites.map((satellite) => (
                        <div
                            key={satellite.id}
                            className={`satellite-card ${selectedSatellite.id === satellite.id ? 'active' : ''}`}
                            onClick={() => handleSatelliteSelect(satellite)}
                        >
                            <div className="satellite-name">{satellite.name}</div>
                            <div className="satellite-id">NORAD ID: {satellite.id}</div>
                        </div>
                    ))}
                </div>

                <div className="current-selection">
                    <h4>Selected:</h4>
                    <div className="selected-satellite">
                        <span className="selected-name">{selectedSatellite.name}</span>
                        <span className="selected-id">({selectedSatellite.id})</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SatelliteList;
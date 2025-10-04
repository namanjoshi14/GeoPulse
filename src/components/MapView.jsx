import { MapProvider } from './MapContext.jsx';
import WorldMap from './WorldMap';
import CountryDetails from './CountryDetails';
import './MapView.css';

const MapView = () => {
    return (
        <MapProvider>
            <div className="map-view-container">
                <div className="map-section">
                    <WorldMap />
                </div>
                <div className="details-section">
                    <CountryDetails />
                </div>
            </div>
        </MapProvider>
    );
};

export default MapView;
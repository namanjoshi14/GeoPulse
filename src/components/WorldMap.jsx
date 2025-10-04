import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useMapContext } from './useMapContext';
import mapdata from './features.json';
import './WorldMap.css';

const WorldMap = () => {
    const { activeCountry, handleCountryClick } = useMapContext();

    const activeStyle = {
        default: { outline: 'none' },
        hover: { outline: 'none' },
        pressed: { outline: 'none' }
    };

    const defaultStyle = {
        default: { outline: 'none' },
        hover: { outline: 'none', fill: '#4ade80' },
        pressed: { outline: 'none' }
    };

    return (
        <div className="world-map-container">
            <ComposableMap
                height={400}
                width={700}
                projectionConfig={{
                    scale: 120
                }}
            >
                <Geographies geography={mapdata}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={
                                    activeCountry.toLowerCase() === geo.id.toLowerCase()
                                        ? '#00ff00'
                                        : '#374151'
                                }
                                stroke="#6b7280"
                                strokeWidth={0.5}
                                style={
                                    activeCountry.toLowerCase() === geo.id.toLowerCase()
                                        ? activeStyle
                                        : defaultStyle
                                }
                                onClick={() => handleCountryClick(geo)}
                                className="country-path"
                            />
                        ))
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
};

export default WorldMap;
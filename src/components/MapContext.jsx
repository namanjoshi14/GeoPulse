import { useState } from 'react';
import { MapContext } from './mapContext.js';

export const MapProvider = ({ children }) => {
    const [activeCountry, setActiveCountry] = useState('ind');

    const handleCountryClick = (geo) => {
        setActiveCountry(geo.id.toLowerCase());
    };

    const value = {
        activeCountry,
        setActiveCountry,
        handleCountryClick
    };

    return (
        <MapContext.Provider value={value}>
            {children}
        </MapContext.Provider>
    );
};
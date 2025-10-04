import { useState } from 'react';
import { SatelliteContext } from './satelliteContext.js';

export const SatelliteProvider = ({ children }) => {
    const [selectedSatellite, setSelectedSatellite] = useState({
        id: 25544,
        name: 'ISS (ZARYA)'
    });
    const [observerLocation, setObserverLocation] = useState({
        lat: 41.702,
        lng: -76.014,
        alt: 0
    });
    const [satelliteData, setSatelliteData] = useState({
        tle: null,
        positions: null,
        visualPasses: null,
        whatsUp: null
    });
    const [loading, setLoading] = useState({
        tle: false,
        positions: false,
        visualPasses: false,
        whatsUp: false
    });
    const [errors, setErrors] = useState({
        tle: null,
        positions: null,
        visualPasses: null,
        whatsUp: null
    });

    const updateSatelliteData = (type, data) => {
        setSatelliteData(prev => ({
            ...prev,
            [type]: data
        }));
    };

    const updateLoading = (type, isLoading) => {
        setLoading(prev => ({
            ...prev,
            [type]: isLoading
        }));
    };

    const updateError = (type, error) => {
        setErrors(prev => ({
            ...prev,
            [type]: error
        }));
    };

    const value = {
        selectedSatellite,
        setSelectedSatellite,
        observerLocation,
        setObserverLocation,
        satelliteData,
        loading,
        errors,
        updateSatelliteData,
        updateLoading,
        updateError
    };

    return (
        <SatelliteContext.Provider value={value}>
            {children}
        </SatelliteContext.Provider>
    );
};
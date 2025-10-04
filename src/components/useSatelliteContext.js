import { useContext } from 'react';
import { SatelliteContext } from './satelliteContext.js';

export const useSatelliteContext = () => {
    const context = useContext(SatelliteContext);
    if (!context) {
        throw new Error('useSatelliteContext must be used within a SatelliteProvider');
    }
    return context;
};
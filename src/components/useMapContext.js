import { useContext } from 'react';
import { MapContext } from './mapContext.js';

export const useMapContext = () => {
    const context = useContext(MapContext);
    if (!context) {
        console.error('useMapContext: No context found - must be used within MapProvider');
        throw new Error('useMapContext must be used within a MapProvider');
    }
    return context;
};
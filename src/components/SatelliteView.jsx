import React from 'react';
import { SatelliteProvider } from './SatelliteContext.jsx';
import SatelliteList from './SatelliteList';
import SatelliteDetails from './SatelliteDetails';
import './SatelliteView.css';

const SatelliteView = () => {
    return (
        <SatelliteProvider>
            <div className="satellite-view">
                <div className="satellite-view-content">
                    <div className="satellite-list-column">
                        <SatelliteList />
                    </div>
                    <div className="satellite-details-column">
                        <SatelliteDetails />
                    </div>
                </div>
            </div>
        </SatelliteProvider>
    );
};

export default SatelliteView;
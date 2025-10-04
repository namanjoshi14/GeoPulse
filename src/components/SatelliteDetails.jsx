import React from 'react';
import { useSatelliteContext } from './useSatelliteContext';
import { FaSatellite } from 'react-icons/fa';
import './SatelliteDetails.css';

const SatelliteDetails = () => {
    const {
        selectedSatellite,
        satelliteData,
        loading,
        errors,
        observerLocation
    } = useSatelliteContext();

    if (!selectedSatellite) {
        return (
            <div className="satellite-details-container">
                <div className="no-selection">
                    <FaSatellite className="satellite-icon" />
                    <h3>Select a Satellite</h3>
                    <p>Choose a satellite from the list to view its details</p>
                </div>
            </div>
        );
    }

    const renderTLEData = () => {
        const { tle } = satelliteData;
        if (loading.tle) {
            return <div className="loading-spinner">Loading TLE data...</div>;
        }
        if (errors.tle) {
            return <div className="error-message">Error loading TLE: {errors.tle}</div>;
        }
        if (!tle) {
            return <div className="no-data">No TLE data available</div>;
        }

        return (
            <div className="data-section">
                <h4>Two-Line Element (TLE)</h4>
                <div className="tle-container">
                    <div className="tle-info">
                        <div className="tle-field">
                            <span className="field-label">Satellite Name:</span>
                            <span className="field-value">{tle.satname}</span>
                        </div>
                        <div className="tle-field">
                            <span className="field-label">NORAD ID:</span>
                            <span className="field-value">{tle.satid}</span>
                        </div>
                        <div className="tle-field">
                            <span className="field-label">Epoch:</span>
                            <span className="field-value">{new Date(tle.epoch * 1000).toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="tle-lines">
                        <div className="tle-line">
                            <span className="line-label">Line 1:</span>
                            <code className="tle-code">{tle.line1}</code>
                        </div>
                        <div className="tle-line">
                            <span className="line-label">Line 2:</span>
                            <code className="tle-code">{tle.line2}</code>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderPositions = () => {
        const { positions } = satelliteData;
        if (loading.positions) {
            return <div className="loading-spinner">Loading position data...</div>;
        }
        if (errors.positions) {
            return <div className="error-message">Error loading positions: {errors.positions}</div>;
        }
        if (!positions || positions.length === 0) {
            return <div className="no-data">No position data available</div>;
        }

        return (
            <div className="data-section">
                <h4>Current Positions</h4>
                <div className="positions-grid">
                    {positions.slice(0, 5).map((position, index) => (
                        <div key={index} className="position-card">
                            <div className="position-time">
                                {new Date(position.timestamp * 1000).toLocaleTimeString()}
                            </div>
                            <div className="position-coords">
                                <div className="coord">
                                    <span className="coord-label">Lat:</span>
                                    <span className="coord-value">{position.satlatitude}°</span>
                                </div>
                                <div className="coord">
                                    <span className="coord-label">Lng:</span>
                                    <span className="coord-value">{position.satlongitude}°</span>
                                </div>
                                <div className="coord">
                                    <span className="coord-label">Alt:</span>
                                    <span className="coord-value">{position.sataltitude} km</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderVisualPasses = () => {
        const { visualPasses } = satelliteData;
        if (loading.visualPasses) {
            return <div className="loading-spinner">Loading visual passes...</div>;
        }
        if (errors.visualPasses) {
            return <div className="error-message">Error loading visual passes: {errors.visualPasses}</div>;
        }
        if (!visualPasses || visualPasses.length === 0) {
            return <div className="no-data">No visual passes available for current location</div>;
        }

        return (
            <div className="data-section">
                <h4>Upcoming Visual Passes</h4>
                <div className="passes-list">
                    {visualPasses.slice(0, 3).map((pass, index) => (
                        <div key={index} className="pass-card">
                            <div className="pass-header">
                                <span className="pass-date">
                                    {new Date(pass.startUTC * 1000).toLocaleDateString()}
                                </span>
                                <span className="pass-duration">
                                    Duration: {pass.duration}s
                                </span>
                            </div>
                            <div className="pass-times">
                                <div className="pass-time">
                                    <span className="time-label">Rise:</span>
                                    <span className="time-value">
                                        {new Date(pass.startUTC * 1000).toLocaleTimeString()}
                                    </span>
                                    <span className="time-azimuth">({pass.startAz}°)</span>
                                </div>
                                <div className="pass-time">
                                    <span className="time-label">Max:</span>
                                    <span className="time-value">
                                        {new Date(pass.maxUTC * 1000).toLocaleTimeString()}
                                    </span>
                                    <span className="time-elevation">({pass.maxEl}°)</span>
                                </div>
                                <div className="pass-time">
                                    <span className="time-label">Set:</span>
                                    <span className="time-value">
                                        {new Date(pass.endUTC * 1000).toLocaleTimeString()}
                                    </span>
                                    <span className="time-azimuth">({pass.endAz}°)</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderWhatsUp = () => {
        const { whatsUp } = satelliteData;
        if (loading.whatsUp) {
            return <div className="loading-spinner">Loading satellites above...</div>;
        }
        if (errors.whatsUp) {
            return <div className="error-message">Error loading satellites above: {errors.whatsUp}</div>;
        }
        if (!whatsUp || whatsUp.length === 0) {
            return <div className="no-data">No satellites currently visible above your location</div>;
        }

        return (
            <div className="data-section">
                <h4>Satellites Currently Above</h4>
                <div className="whats-up-grid">
                    {whatsUp.slice(0, 6).map((satellite, index) => (
                        <div key={index} className="whats-up-card">
                            <div className="satellite-info">
                                <div className="satellite-name-small">{satellite.satname}</div>
                                <div className="satellite-id-small">ID: {satellite.satid}</div>
                            </div>
                            <div className="satellite-position">
                                <div className="position-detail">
                                    <span className="detail-label">Alt:</span>
                                    <span className="detail-value">{satellite.satalt}°</span>
                                </div>
                                <div className="position-detail">
                                    <span className="detail-label">Az:</span>
                                    <span className="detail-value">{satellite.sataz}°</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="satellite-details-container">
            <div className="satellite-header">
                <div className="header-info">
                    <FaSatellite className="header-icon" />
                    <div>
                        <h3 className="satellite-title">{selectedSatellite.name}</h3>
                        <p className="satellite-subtitle">NORAD ID: {selectedSatellite.id}</p>
                    </div>
                </div>
                {observerLocation.lat && observerLocation.lng && (
                    <div className="observer-info">
                        <span className="observer-label">Observer:</span>
                        <span className="observer-coords">
                            {observerLocation.lat}°, {observerLocation.lng}°
                        </span>
                    </div>
                )}
            </div>

            <div className="details-content">
                {renderTLEData()}
                {renderPositions()}
                {observerLocation.lat && observerLocation.lng && renderVisualPasses()}
                {observerLocation.lat && observerLocation.lng && renderWhatsUp()}
            </div>
        </div>
    );
};

export default SatelliteDetails;
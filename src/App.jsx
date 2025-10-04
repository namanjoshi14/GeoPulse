import { useState } from 'react';
import GeoBrandRotator from './components/GeoBrandRotator';
import TypewriterSubheading from './components/TypewriterSubheading';
import MapView from './components/MapView';
import SatelliteView from './components/SatelliteView';
import ErrorBoundary from './components/ErrorBoundary';
import Dock from './components/Dock';
import { FaGlobeAmericas, FaSatellite } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [activeView, setActiveView] = useState('map');

  const dockItems = [
    {
      icon: <FaGlobeAmericas size={24} />,
      label: 'World Map',
      onClick: () => setActiveView('map')
    },
    {
      icon: <FaSatellite size={24} />,
      label: 'Satellite',
      onClick: () => setActiveView('satellite')
    },
  ];

  const renderMainContent = () => {
    switch (activeView) {
      case 'map':
        return (
          <ErrorBoundary>
            <MapView />
          </ErrorBoundary>
        );
      case 'satellite':
        return (
          <ErrorBoundary>
            <SatelliteView />
          </ErrorBoundary>
        );
      default:
        return (
          <ErrorBoundary>
            <MapView />
          </ErrorBoundary>
        );
    }
  };

  return (
    <div className="app-container">
      <div className="heading-section">
        <GeoBrandRotator />
        <TypewriterSubheading />
      </div>

      <div className="main-content">
        {renderMainContent()}
      </div>

      <div className="dock-section">
        <Dock
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>
    </div>
  );
};

export default App
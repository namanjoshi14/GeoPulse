import { useEffect, useState, useCallback } from 'react';
import { useMapContext } from './useMapContext';
import './CountryDetails.css';

const CountryDetails = () => {
    const { activeCountry } = useMapContext();
    const [country, setCountry] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCountry = useCallback(async (countryCode) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);

            if (!response.ok) {
                throw new Error('Country not found');
            }

            const data = await response.json();
            setCountry(data[0]);
        } catch (err) {
            setError(err.message);
            setCountry(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activeCountry) {
            fetchCountry(activeCountry);
        }
    }, [activeCountry, fetchCountry]);

    if (isLoading) {
        return (
            <div className="country-details-container">
                <div className="loading-state">
                    <h3>Loading...</h3>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="country-details-container">
                <div className="error-state">
                    <h3>Error: {error}</h3>
                </div>
            </div>
        );
    }

    if (!country) {
        return (
            <div className="country-details-container">
                <div className="empty-state">
                    <h3>Select a country on the map</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="country-details-container">
            <div className="country-details-content">
                <h2 className="country-name">{country.name.common}</h2>

                <div className="country-flag">
                    <img
                        src={country.flags.png}
                        alt={`Flag of ${country.name.common}`}
                        className="flag-image"
                    />
                </div>

                <div className="country-info">
                    <div className="info-row">
                        <span className="info-label">Capital:</span>
                        <span className="info-value">{country.capital?.[0] || 'N/A'}</span>
                    </div>

                    <div className="info-row">
                        <span className="info-label">Population:</span>
                        <span className="info-value">{country.population?.toLocaleString() || 'N/A'}</span>
                    </div>

                    <div className="info-row">
                        <span className="info-label">Area:</span>
                        <span className="info-value">{country.area?.toLocaleString() || 'N/A'} km²</span>
                    </div>

                    <div className="info-row">
                        <span className="info-label">Region:</span>
                        <span className="info-value">{country.subregion || country.region || 'N/A'}</span>
                    </div>

                    {country.currencies && (
                        <div className="info-row">
                            <span className="info-label">Currency:</span>
                            <div className="info-value">
                                {Object.entries(country.currencies).map(([code, currency]) => (
                                    <div key={code} className="currency-item">
                                        <span className="currency-symbol">{currency.symbol}</span>
                                        <span className="currency-name">{currency.name}</span>
                                        <span className="currency-code">({code})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {country.languages && (
                        <div className="info-row">
                            <span className="info-label">Languages:</span>
                            <div className="info-value">
                                <div className="languages-list">
                                    {Object.values(country.languages).map((language, index) => (
                                        <span key={index} className="language-tag">
                                            {language}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {country.timezones && (
                        <div className="info-row">
                            <span className="info-label">Timezone:</span>
                            <span className="info-value">{country.timezones[0]}</span>
                        </div>
                    )}

                    {country.latlng && (
                        <div className="info-row">
                            <span className="info-label">Coordinates:</span>
                            <span className="info-value">
                                {country.latlng[0]?.toFixed(2)}°, {country.latlng[1]?.toFixed(2)}°
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CountryDetails;
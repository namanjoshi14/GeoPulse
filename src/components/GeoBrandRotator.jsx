import RotatingText from './RotatingText';

const GeoBrandRotator = ({
    alternatives = ['Pulse', 'Vision', 'Sphere', 'Sense'],
    className = '',
    rotationInterval = 2000,
    blurAmount = 5,
    borderColor = '#00ff00',
    glowColor = 'rgba(0, 255, 0, 0.6)',
    animationDuration = 0.5,
    pauseBetweenAnimations = 1,
    ...rotatingTextProps
}) => {
    const fullBrandNames = alternatives.map(alt => `Geo ${alt}`);

    return (
        <div className={`${className}`}>
            <RotatingText
                texts={fullBrandNames}
                rotationInterval={rotationInterval}
                blurAmount={blurAmount}
                borderColor={borderColor}
                glowColor={glowColor}
                animationDuration={animationDuration}
                pauseBetweenAnimations={pauseBetweenAnimations}
                mainClassName="text-4xl mt-4 font-bold capitalize"
                {...rotatingTextProps}
            />
        </div>
    );
};

export default GeoBrandRotator;
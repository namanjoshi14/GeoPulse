import { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'motion/react';
import './RotatingText.css';

const RotatingText = ({
    texts = [],
    rotationInterval = 2000,
    blurAmount = 5,
    borderColor = '#00ff00',
    glowColor = 'rgba(0, 255, 0, 0.6)',
    animationDuration = 0.5,
    pauseBetweenAnimations = 1,
    mainClassName = ''
}) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const containerRef = useRef(null);
    const wordRefs = useRef([]);
    const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

    useEffect(() => {
        if (texts.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentTextIndex(prev => (prev + 1) % texts.length);
            setCurrentWordIndex(0);
        }, rotationInterval);

        return () => clearInterval(interval);
    }, [texts.length, rotationInterval]);

    useEffect(() => {
        if (!texts[currentTextIndex]) return;

        const currentText = texts[currentTextIndex];
        const words = currentText.split(' ');

        if (words.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentWordIndex(prev => (prev + 1) % words.length);
        }, (animationDuration + pauseBetweenAnimations) * 1000);

        return () => clearInterval(interval);
    }, [currentTextIndex, texts, animationDuration, pauseBetweenAnimations]);

    useEffect(() => {
        if (!texts[currentTextIndex] || currentWordIndex === -1) return;

        if (!wordRefs.current[currentWordIndex] || !containerRef.current) return;

        const parentRect = containerRef.current.getBoundingClientRect();
        const activeRect = wordRefs.current[currentWordIndex].getBoundingClientRect();

        setFocusRect({
            x: activeRect.left - parentRect.left,
            y: activeRect.top - parentRect.top,
            width: activeRect.width,
            height: activeRect.height
        });
    }, [currentWordIndex, currentTextIndex, texts]);

    const currentText = texts[currentTextIndex] || '';
    const words = currentText.split(' ');

    if (!texts.length) return null;

    return (
        <div className={`rotating-container ${mainClassName}`} ref={containerRef}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentTextIndex}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {words.map((word, wordIndex) => {
                        const isActive = wordIndex === currentWordIndex;
                        return (
                            <span
                                key={`${currentTextIndex}-${wordIndex}`}
                                ref={el => (wordRefs.current[wordIndex] = el)}
                                className="rotating-word"
                                style={{
                                    filter: isActive ? `blur(0px)` : `blur(${blurAmount}px)`,
                                    '--border-color': borderColor,
                                    '--glow-color': glowColor,
                                    transition: `filter ${animationDuration}s ease`
                                }}
                            >
                                {word}
                            </span>
                        );
                    })}
                </motion.div>
            </AnimatePresence>

            <motion.div
                className="rotating-frame"
                animate={{
                    x: focusRect.x,
                    y: focusRect.y,
                    width: focusRect.width,
                    height: focusRect.height,
                    opacity: currentWordIndex >= 0 ? 1 : 0
                }}
                transition={{
                    duration: animationDuration
                }}
                style={{
                    '--border-color': borderColor,
                    '--glow-color': glowColor
                }}
            >
                <span className="rotating-corner top-left"></span>
                <span className="rotating-corner top-right"></span>
                <span className="rotating-corner bottom-left"></span>
                <span className="rotating-corner bottom-right"></span>
            </motion.div>
        </div>
    );
};

export default RotatingText;
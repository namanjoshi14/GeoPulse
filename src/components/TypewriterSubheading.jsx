import Typewriter from 'typewriter-effect';
import './TypewriterSubheading.css';

const TypewriterSubheading = ({
    text = 'Learn Geography In Fun And Interactive Way ',
    className = '',
    delay = 50,
    pauseAfter = 3000,
    deleteAfter = false,
    loop = false
}) => {
    return (
        <div className={`typewriter-container ${className}`}>
            <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .typeString(text)
                        .pauseFor(pauseAfter)
                        .callFunction(() => {
                            if (deleteAfter) {
                                typewriter.deleteAll().start();
                            }
                        });

                    if (loop && deleteAfter) {
                        typewriter.start();
                    } else {
                        typewriter.start();
                    }
                }}
                options={{
                    delay: delay,
                    deleteSpeed: 30,
                    loop: loop && deleteAfter,
                    autoStart: false,
                    cursor: '|',
                    wrapperClassName: 'typewriter-wrapper',
                    cursorClassName: 'typewriter-cursor'
                }}
            />
        </div>
    );
};

export default TypewriterSubheading;
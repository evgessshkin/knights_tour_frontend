import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ isVisible, duration, onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isVisible) {
            setProgress(0); // Сбросить прогресс, если окно скрыто
            return;
        }

        let startTime = Date.now();
        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const percent = Math.min((elapsedTime / duration) * 100, 100);
            setProgress(percent);

            if (percent === 100) {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, 100);

        return () => clearInterval(interval);
    }, [isVisible, duration, onComplete]);

    if (!isVisible) return null; // Если окно не нужно показывать, возвращаем null

    return (
        <div className="loading-overlay">
            <div className="loading-message">Riešenie pomocou genetickej metódy</div>
            <div className="loading-bar-container">
                <div className="loading-bar" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

export default LoadingScreen;

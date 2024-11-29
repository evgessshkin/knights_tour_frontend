import React from 'react';
import '../css/LoadingScreen.css';

const LoadingScreen = ({ isVisible }) => {
    if (!isVisible) return null; // Если окно не нужно показывать, возвращаем null

    return (
        <div className="loading-overlay">
            <div className="loading-message">Загрузка...</div>
        </div>
    );
};

export default LoadingScreen;

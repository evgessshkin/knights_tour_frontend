import React, { useState, useEffect } from 'react';
import '../css/App.css';

function Board(props) {
    const { cols, rows, posX, posY, solution } = props;
    const maxBoardSize = 80;
    const cellSize = maxBoardSize / Math.max(cols, rows);
    const [currentMove, setCurrentMove] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextMove = () => {
        if (!isAnimating && currentMove < solution.length - 1) {
            setCurrentMove(currentMove + 1);
        }
    };

    const previousMove = () => {
        if (!isAnimating && currentMove > 0) {
            setCurrentMove(currentMove - 1);
        }
    };

    // Сброс текущего хода при изменении решения
    useEffect(() => {
        setCurrentMove(0);
    }, [solution]);

    // Получение текущей позиции коня
    const currentPosition = solution[currentMove] || [posY - 1, posX - 1]; // Начальная позиция
    const nextPosition = solution[currentMove + 1] || null; // Следующий ход, если он есть

    const animateMoves = async (direction) => {
        if (isAnimating) return;

        setIsAnimating(true);

        if (direction === "forward") {
            for (let i = currentMove; i < solution.length; i++) {
                await new Promise((resolve) => setTimeout(resolve, 50));
                setCurrentMove(i);
            }
        } else if (direction === "backward") {
            for (let i = currentMove; i >= 0; i--) {
                await new Promise((resolve) => setTimeout(resolve, 50));
                setCurrentMove(i);
            }
        }

        setIsAnimating(false);
    };

    return (
        <div>
            <div
                id="board-container"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cols}, ${cellSize}vh)`,
                    gridTemplateRows: `repeat(${rows}, ${cellSize}vh)`,
                    width: `${cellSize * cols}vh`,
                    height: `${cellSize * rows}vh`,
                    "--tileSize": `${cellSize}vh`,
                }}
            >
                {new Array(rows).fill(null).map((_, rowIndex) =>
                    new Array(cols).fill(null).map((_, colIndex) => {
                        const moveIndex = solution.findIndex(
                            (move) => move[0] === rowIndex && move[1] === colIndex
                        );
                        const isKnightHere =
                            currentPosition[1] === colIndex && currentPosition[0] === rowIndex;
                        const isNextMove =
                            nextPosition &&
                            nextPosition[0] === rowIndex &&
                            nextPosition[1] === colIndex;
                        const isVisited =
                            moveIndex !== -1 && moveIndex <= currentMove;

                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`tile board-col ${
                                    (rowIndex + colIndex) % 2 === 0
                                        ? "white-tile"
                                        : "black-tile"
                                } ${isNextMove ? "highlight" : ""} ${
                                    isVisited ? "visited" : ""
                                }`}
                            >
                                {!isKnightHere && moveIndex !== -1 && (
                                    <div className="move-number">{moveIndex + 1}</div>
                                )}
                                {isKnightHere && <div className="knight"></div>}
                            </div>
                        );
                    })
                )}
            </div>
            <div
                className="controls"
                onWheel={(event) => {
                    if (event.deltaY < 0) {
                        nextMove();
                    } else {
                        previousMove();
                    }
                }}
            >
                <button
                    className="btn btn-light back-forward"
                    onClick={() => animateMoves("backward")}
                    disabled={isAnimating || currentMove === 0}
                >
                    &lt;&lt;
                </button>
                <button
                    className="btn btn-light back-forward"
                    onClick={previousMove}
                    disabled={isAnimating || currentMove === 0}
                >
                    Back
                </button>
                <button
                    className="btn btn-light back-forward"
                    onClick={nextMove}
                    disabled={isAnimating || currentMove === solution.length - 1}
                >
                    Forward
                </button>
                <button
                    className="btn btn-light back-forward"
                    onClick={() => animateMoves("forward")}
                    disabled={isAnimating || currentMove === solution.length - 1}
                >
                    &gt;&gt;
                </button>
            </div>
        </div>
    );
}

export default Board;


import React, { useState, useEffect } from 'react';
import '../css/App.css'
function Board(props) {
    const { cols, rows, posX, posY, solution } = props;
    const maxBoardSize = 80;
    const cellSize = maxBoardSize / Math.max(cols, rows);
    const [currentMove, setCurrentMove] = useState(0);

    const nextMove = () => {
        console.log(currentMove)
        if (currentMove < solution.length - 1) {
            setCurrentMove(currentMove + 1);
        }
    };

    const previousMove = () => {
        console.log(currentMove)

        if (currentMove > 0) {
            setCurrentMove(currentMove - 1);
        }
    };


    // Скидання поточного ходу при зміні розв'язку
    useEffect(() => {
        setCurrentMove(0);
    }, [solution]);

    // Отримайте поточну позицію коня
    const currentPosition = solution[currentMove] || [posY - 1, posX - 1]; // Ваша початкова позиція
    // Отримайте наступну позицію
    const nextPosition = solution[currentMove + 1] || null; // Наступний хід, якщо він є

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
                {new Array(rows).fill(null).map((_, rowIndex) => (
                    new Array(cols).fill(null).map((_, colIndex) => {
                        const moveIndex = solution.findIndex(move => move[0] === rowIndex && move[1] === colIndex);
                        const isKnightHere = currentPosition[1] === colIndex && currentPosition[0] === rowIndex;
                        const isNextMove = nextPosition && nextPosition[0] === rowIndex && nextPosition[1] === colIndex;
                        const isVisited = moveIndex !== -1 && moveIndex <= currentMove;

                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`tile board-col ${(rowIndex + colIndex) % 2 === 0 ? "white-tile" : "black-tile"} 
                                    ${isNextMove ? "highlight" : ""} 
                                    ${isVisited ? "visited" : ""}`} // Додаємо клас visited
                            >
                                {!isKnightHere && moveIndex !== -1 && (
                                    <div className="move-number">{moveIndex + 1}</div>
                                )}
                                {isKnightHere && (
                                    <div className="knight"></div>
                                )}
                            </div>
                        );
                    })
                ))}
            </div>
            <div className="controls"
                 onWheel={(event) => {
                     if (event.deltaY < 0) {
                         nextMove();
                     } else
                         previousMove()
                 }}
            >
                <button className="btn btn-light back-forward"
                        onClick={() => {
                            for (let i = currentMove; i >= 0; i--)
                                new Promise(resolve => setTimeout(() => setCurrentMove(i), 50 * Math.abs( i - currentMove)));

                        }
                        }
                >&lt;&lt;
                </button>
                <button className="btn btn-light back-forward" onClick={previousMove} disabled={currentMove === 0}
                > Back
                </button>
                <button className="btn btn-light back-forward" onClick={nextMove}
                        disabled={currentMove === solution.length - 1}
                >Forward
                </button>
                <button className="btn btn-light back-forward"
                        onClick={async () => {
                            for (let i = currentMove; i < cols * rows; i++) {
                                await new Promise(resolve => setTimeout(resolve, 50 /* (i - currentMove)*/));
                                setCurrentMove(i)
                            }
                        }}
                >>>
                </button>
            </div>
        </div>
    );
}

export default Board;

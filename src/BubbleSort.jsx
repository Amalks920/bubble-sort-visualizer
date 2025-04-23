import { useEffect, useRef, useState } from "react";

function BubbleSort() {
    const canvasRef = useRef(null);
    const inputRef = useRef(null);
    const [arr, setArr] = useState([]);

    function drawArray(currentArray,index1) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = currentArray.length * 100;
        canvas.height = 100;

        const squareSize = 100;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "24px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let i = 0; i < currentArray.length; i++) {
            const x = i * squareSize;
     
            ctx.fillStyle = i==index1 ?"green":i==index1+1?"yellow":"white";
            ctx.fillRect(x, 0, squareSize, squareSize);

            // Draw border
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.strokeRect(x, 0, squareSize, squareSize);

            // Draw number in center
            ctx.fillStyle = index1===i?"white":"black";
            ctx.fillText(currentArray[i], x + squareSize / 2, squareSize / 2);
        }
    }

    // function startBubbleSortAnimation() {
    //     let currentArray = [...arr];
    //     let n = currentArray.length;
    //     let i = 0, j = 0;
    
    //     function sortStep() {
    //         if (i < n) {
    //             if (j < n - i - 1) {
    //                 drawArray(currentArray, j); // Highlight current pair
    
    //                 if (currentArray[j] > currentArray[j + 1]) {
    //                     let temp = currentArray[j];
    //                     currentArray[j] = currentArray[j + 1];
    //                     currentArray[j + 1] = temp;
    //                 }
    //                 j++;
    //                 setTimeout(sortStep, 1000); // Faster step for better feel
    //             } else {
    //                 j = 0;
    //                 i++;
    //                 setTimeout(sortStep, 1000);
    //             }
    //         } else {
    //             drawArray(currentArray, -1); // Draw final array without highlights
    //             setArr(currentArray); // Update state
    //         }
    //     }
    
    //     sortStep();
    // }

    function startBubbleSortAnimation() {
        let currentArray = [...arr];
        let n = currentArray.length;
        let i = 0, j = 0;
    
        function animateSwap(a, b, callback) {
            const steps = 10;
            let step = 0;
    
            function drawStep() {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
    
                canvas.width = currentArray.length * 100;
                canvas.height = 100;
    
                const squareSize = 100;
    
                ctx.clearRect(0, 0, canvas.width, canvas.height);
    
                ctx.font = "24px sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
    
                for (let k = 0; k < currentArray.length; k++) {
                    let x = k * squareSize;
                    let offset = 0;
    
                    if (k === a) {
                        offset = ((b - a) * squareSize * step) / steps;
                    } else if (k === b) {
                        offset = ((a - b) * squareSize * step) / steps;
                    }
    
                    ctx.fillStyle = (k === a || k === b) ? "orange" : "white";
                    ctx.fillRect(x + offset, 0, squareSize, squareSize);
    
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = 2;
                    ctx.strokeRect(x + offset, 0, squareSize, squareSize);
    
                    ctx.fillStyle = "black";
                    ctx.fillText(currentArray[k], x + offset + squareSize / 2, squareSize / 2);
                }
    
                step++;
                if (step <= steps) {
                    requestAnimationFrame(drawStep);
                } else {
                    // Actually swap after animation
                    [currentArray[a], currentArray[b]] = [currentArray[b], currentArray[a]];
                    callback();
                }
            }
    
            drawStep();
        }
    
        function sortStep() {
            if (i < n) {
                if (j < n - i - 1) {
                    if (currentArray[j] > currentArray[j + 1]) {
                        animateSwap(j, j + 1, () => {
                            j++;
                            setTimeout(sortStep, 1000); // Short pause after animation
                        });
                    } else {
                        drawArray(currentArray, j);
                        j++;
                        setTimeout(sortStep, 1000);
                    }
                } else {
                    j = 0;
                    i++;
                    setTimeout(sortStep, 1000);
                }
            } else {
                drawArray(currentArray, -1);
                setArr(currentArray);
            }
        }
    
        sortStep();
    }
    
    
    useEffect(() => {
        drawArray(arr);
    }, [arr]);

    return (
        <div className="w-[100vw] flex flex-col gap-[50px] justify-center items-center">
            <canvas ref={canvasRef} className="border border-gray-400" />
            <div className="flex flex-col gap-2">
                <input ref={inputRef} type="number" className="border p-2" />
                <button
                    onClick={() => {
                        setArr([...arr, Number(inputRef.current.value)]);
                    }}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Add Number
                </button>

                <button
                    onClick={() => {
                        startBubbleSortAnimation();
                    }}
                    className="bg-green-500 text-white p-2 rounded"
                >
                    Do Bubble Sort...
                </button>
            </div>
        </div>
    );
}

export default BubbleSort;

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

            // Fill square
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
    //                 if (currentArray[j] > currentArray[j + 1]) {
    //                     // Swap
    //                     let temp = currentArray[j];
    //                     currentArray[j] = currentArray[j + 1];
    //                     currentArray[j + 1] = temp;
    //                 }
    //                 j++;
    //             } else {
    //                 j = 0;
    //                 i++;
    //             }

    //             drawArray(currentArray,j);
    //             setTimeout(sortStep, 2000); // Delay for animation
    //         } else {
    //             setArr(currentArray); // Final state
    //         }
    //     }

    //     sortStep();
    // }

    function startBubbleSortAnimation() {
        let currentArray = [...arr];
        let n = currentArray.length;
        let i = 0, j = 0;
    
        function sortStep() {
            if (i < n) {
                if (j < n - i - 1) {
                    drawArray(currentArray, j); // Highlight current pair
    
                    if (currentArray[j] > currentArray[j + 1]) {
                        // Swap
                        let temp = currentArray[j];
                        currentArray[j] = currentArray[j + 1];
                        currentArray[j + 1] = temp;
                    }
                    j++;
                    setTimeout(sortStep, 300); // Faster step for better feel
                } else {
                    j = 0;
                    i++;
                    setTimeout(sortStep, 300);
                }
            } else {
                drawArray(currentArray, -1); // Draw final array without highlights
                setArr(currentArray); // Update state
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

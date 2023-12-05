document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("paintDisp");
    const ctx = canvas.getContext("2d");
    const colorChanged = document.getElementById("color");
    const sizeChanged = document.getElementById("sized");
    let painting = false;
    let color;
    let sized;
    let drawingHistory = [];

    colorChanged.addEventListener("change", (event) => {
        color = event.target.value;
    });

    sizeChanged.addEventListener("change", (event) => {
        sized = parseInt(event.target.value, 10);
    });

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
        saveDrawing();
    }

    function draw(e) {
        if (!painting) {
            return;
        }

        const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

        ctx.lineWidth = sized || 1;
        ctx.lineCap = "round";
        ctx.strokeStyle = color || "black";

        ctx.lineTo(Math.round(clientX - canvas.offsetLeft), Math.round(clientY - canvas.offsetTop));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(Math.round(clientX - canvas.offsetLeft), Math.round(clientY - canvas.offsetTop));
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawingHistory = [];
    }

    function saveDrawing() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        drawingHistory.push(imageData);
    }

    function undoDrawing() {
        if (drawingHistory.length > 0) {
            drawingHistory.pop();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (drawingHistory.length > 0) {
                ctx.putImageData(drawingHistory[drawingHistory.length - 1], 0, 0);
            }
        }
    }

    function handleKeyPress(event) {
        if (event.key === "x") {
            clearCanvas();
        } else if (event.key === "z") {
            undoDrawing();
        }
    }

    document.addEventListener("keydown", handleKeyPress);

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("touchstart", startPosition);
    canvas.addEventListener("touchend", endPosition);
    canvas.addEventListener("touchmove", draw);
});
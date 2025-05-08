//this is an animation of an object falling
import { useEffect, useRef } from "react";
export default function Falling(drumSize: number) {
    const ballSize = 1;
    const size = drumSize - ballSize;
    const gravity = 2; // m/s^2
    const timeInterval = 0.016; // seconds (60 FPS)
    const imageSrcs = ["/sock.png", "/pants.png", "/shirt.png", "/jeans.png"]
    const imgScales = [150, 80, 200, 300];

    const numberOfObjects = imageSrcs.length;
    const fallProb = 0.03;
    const minFallAngle = 100 * Math.PI / 180;
    const xpos = useRef(Array(numberOfObjects));
    const ypos = useRef(Array(numberOfObjects));
    const yvel = useRef(Array(numberOfObjects).fill(1));
    const xvel = useRef(Array(numberOfObjects).fill(0));
    const angle = useRef(Array(numberOfObjects).fill(0));
    const shapeAngle = useRef(Array(numberOfObjects).fill(0));
    const shapeAngularVel = useRef(Array(numberOfObjects).fill(0));
    const isStuck = useRef(Array(numberOfObjects).fill(false));
    const colour = useRef(Array(numberOfObjects));
    const imgsRef = useRef<(HTMLImageElement | null)[]>(Array(numberOfObjects).fill(null));
    for (let i = 0; i < numberOfObjects; i++) {
        xpos.current[i] = size * (1 - 0.8 * Math.random())
        ypos.current[i] = size * (1 - 0.8 * Math.random());
        colour.current[i] = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }
    for (let i = 0; i < numberOfObjects; i++) {
        const sockImage = new Image();
        sockImage.src = imageSrcs[i];
        sockImage.onload = () => {
            imgsRef.current[i] = sockImage;
        };
    }
    function outOfBounds(x, y) {
        return (
            ((y - size / 2) ** 2 + (x - size / 2) ** 2) ** 0.5 >= size / 2 && (y > size / 2)
        )

    }
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId: number;
        const draw = () => {
            ctx.clearRect(0, 0, drumSize, drumSize);

            ctx.beginPath();
            ctx.arc(drumSize / 2, drumSize / 2, drumSize / 2, 0, Math.PI * 2);
            ctx.strokeStyle = "black";
            ctx.stroke();

            for (let i = 0; i < numberOfObjects; i++) {
                //code for displaying balls
                //ctx.fillStyle = colour.current[i];
                //ctx.beginPath();
                //ctx.arc(xpos.current[i], ypos.current[i], ballSize, 0, Math.PI * 2);
                //ctx.fill();

                if (imgsRef.current[i]) {
                    ctx.save();
                    ctx.translate(xpos.current[i], ypos.current[i]);
                    ctx.rotate(-shapeAngle.current[i]);
                    ctx.drawImage(
                        imgsRef.current[i],
                        -(imgScales[i] * ((imgsRef.current[i]?.width ?? 1) / (imgsRef.current[i]?.height ?? 1))) / 2,
                        -(imgScales[i]) / 2,
                        imgScales[i] * ((imgsRef.current[i]?.width ?? 1) / (imgsRef.current[i]?.height ?? 1)),
                        imgScales[i]
                    );
                    ctx.restore();
                }

                if (isStuck.current[i]) {
                    xpos.current[i] = (size) / 2 + Math.sin(angle.current[i]) * size / 2; // Oscillate horizontally
                    ypos.current[i] = (size) / 2 + Math.cos(angle.current[i]) * size / 2; // Oscillate horizontally
                    angle.current[i] += 1 * Math.PI / 180; // Rotate the object
                    shapeAngle.current[i] += 1 * Math.PI / 180; // Rotate the object
                    if (angle.current[i] > 2 * Math.PI)
                        angle.current[i] -= 2 * Math.PI

                    if (angle.current[i] > minFallAngle && angle.current[i] < 2 * Math.PI - minFallAngle) {
                        if (Math.random() > (1 - fallProb)) {
                            isStuck.current[i] = false;
                            const vel = 1 + Math.random();
                            xvel.current[i] = vel * Math.cos(angle.current[i]);
                            yvel.current[i] = 0// -vel * Math.sin(angle.current[i]);
                            shapeAngularVel.current[i] = 2 * Math.random() * Math.PI / 180;
                        }
                    }
                }
                if (!isStuck.current[i]) {
                    if (outOfBounds(xpos.current[i], ypos.current[i])) {
                        isStuck.current[i] = true;
                        angle.current[i] = Math.atan((xpos.current[i] - size / 2) / (ypos.current[i] - size / 2));
                        if (ypos.current[i] < size / 2)
                            angle.current[i] += Math.PI;
                    }
                    else {
                        yvel.current[i] += gravity * timeInterval; // Update velocity
                        ypos.current[i] += yvel.current[i];
                        xpos.current[i] += xvel.current[i]; // Update position
                        shapeAngle.current[i] += shapeAngularVel.current[i];
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        }

        requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animationFrameId);
    }, [size]);
    const canvasRef = useRef(null);
    return (
        <canvas ref={canvasRef} width={drumSize} height={drumSize} />
    );
}
//this is a washing machine component
import "./Washing.scss"
import Falling from "./Falling.tsx"
import { useEffect, useRef } from "react";
export default function Washing() {
    const speedRef = useRef(1);
    const speedIndex = useRef(1);
    const speeds = [1, 2, 3];
    useEffect(() => {
        document.getElementById("lcd")!.textContent = speedRef.current.toString();
    }, [speedRef])
    return (
        <div id="washing-machine">
            <div id="top-section">
                <div id="drawer"></div>
                <div id="dial" onClick={() => { speedIndex.current += 1; speedIndex.current %= speeds.length; speedRef.current = speeds[speedIndex.current] }} ></div>
                <div id="play"></div>
                <div id="lcd">{speeds[speedRef.current]}</div>
            </div>
            <div id="middle-section">
                <div id="door">
                    <div id="window">
                        {Falling(350, speedRef)}

                    </div>
                </div>
            </div>
            <div id="bottom-section"></div>
            This is a washing machine
        </div>
    );
}
//this is a washing machine component
import "./Washing.scss"
import Falling from "./Falling.tsx"
export default function Washing() {
    return (
        <div id="washing-machine">

            <div id="top-section">
                <div id="drawer"></div>
                <div id="dial"></div>
                <div id="play"></div>
                <div id="lcd"></div>
            </div>
            <div id="middle-section">
                <div id="door">
                    <div id="window">
                        {Falling(350)}

                    </div>
                </div>
            </div>
            <div id="bottom-section"></div>
            This is a washing machine
        </div>
    );
}
import React, { useEffect, useRef, useState } from "react";
import "98.css";
import "../../src/styles.css";

export default function Window() {
    const [count, setCount] = useState(0);
    const divRef = useRef(null);

    useEffect(() => {
        if (divRef.current) {
            dragElement(divRef.current);
        }
    }, []);

    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = document.getElementById(elmnt.id + "header");

        const dragMouseDown = (e) => {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        };

        const elementDrag = (e) => {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = elmnt.offsetTop - pos2 + "px";
            elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        };

        const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };

        if (header) header.onmousedown = dragMouseDown;
        else elmnt.onmousedown = dragMouseDown;
    }

    return (
        <div
            id="mydiv"
            ref={divRef}
            style={{ 
                width: 700, 
                position: "absolute", 
                top: "10vh",
                left: "20vw"
            }}
            className="window"
        >
            <div id="mydivheader" className="title-bar">
                <div className="title-bar-text prevent-select">Counter</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize" />
                    <button aria-label="Maximize" />
                    <button aria-label="Close" />
                </div>
            </div>

            <div className="window-body">
                <p style={{ textAlign: "center" }}>Current count: {count}</p>
                <div className="field-row" style={{ justifyContent: "center" }}>
                    <button onClick={() => setCount(count + 1)}>+</button>
                    <button onClick={() => setCount(count - 1)}>-</button>
                    <button onClick={() => setCount(0)}>0</button>
                </div>
            </div>
        </div>
    );
}

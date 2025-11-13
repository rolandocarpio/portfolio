import React, { useState, useEffect } from "react";
import "../styles.css"

export default function Time() {
    const currentDate = new Date();
    const ISODate = currentDate.toLocaleDateString("en-CA").split('T')[0];
    const [time, setTime] = useState(currentDate.toLocaleTimeString());

    useEffect(() => {
        // update time every second
        const update = () => setTime(new Date().toLocaleTimeString());
        update(); // run immediately on mount

        const timer = setInterval(update, 1000);
        // cleanup interval if/when component unmounts
        return () => clearInterval(timer);
    }, []);


    return (
        <div className="time">
            <p>{ISODate} {time}</p>
        </div>
    );
}
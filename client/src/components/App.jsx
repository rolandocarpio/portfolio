import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Border from "./Border";
import Screen from "./Screen";
import "../styles.css"

export default function App() {
    return <div className="border"><Border /><Screen /></div>;
}

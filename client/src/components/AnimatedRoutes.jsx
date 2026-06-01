import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Screen from "./Screen";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import Guestbook from "./Guestbook";
import Admin from "./Admin";
import "../styles.css";

export default function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Screen /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
                <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                <Route path="/guestbook" element={<PageWrapper><Guestbook /></PageWrapper>} />
                <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
            </Routes>
        </AnimatePresence>
    );
}

function PageWrapper({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ paddingTop: "7.5vh"}}
        >
            {children}
        </motion.div>
    );
}
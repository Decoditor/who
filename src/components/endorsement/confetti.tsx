import { useEffect } from "react";
import confetti from "canvas-confetti";

export function CelebrationConfetti() {
    useEffect(() => {
        const root = getComputedStyle(document.documentElement);

        const colors = [
            root.getPropertyValue("--green").trim(),
            root.getPropertyValue("--coral").trim(),
            root.getPropertyValue("--lime").trim(),
            root.getPropertyValue("--white").trim(),
        ].filter(Boolean);

        const fire = () => {
            confetti({
                particleCount: 70,
                spread: 100,
                startVelocity: 45,
                gravity: 1,
                scalar: 0.9,
                origin: {
                    x: 0.5,
                    y: 0.45,
                },
                colors,
                shapes: ["square", "circle"],
                disableForReducedMotion: true,
            });

            confetti({
                particleCount: 30,
                angle: 60,
                spread: 55,
                startVelocity: 50,
                gravity: 1,
                scalar: 0.8,
                origin: {
                    x: 0.05,
                    y: 0.65,
                },
                colors,
                shapes: ["square"],
                disableForReducedMotion: true,
            });

            confetti({
                particleCount: 30,
                angle: 120,
                spread: 55,
                startVelocity: 50,
                gravity: 1,
                scalar: 0.8,
                origin: {
                    x: 0.95,
                    y: 0.65,
                },
                colors,
                shapes: ["square"],
                disableForReducedMotion: true,
            });
        };

        const timer = window.setTimeout(fire, 150);

        return () => {
            window.clearTimeout(timer);
        };
    }, []);

    return null;
}
"use client";

import { ReactNode, useEffect, useRef } from "react";

export default function DottedBackground({
  children,
}: {
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updatePos = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };

    window.addEventListener("mousemove", updatePos);
    return () => window.removeEventListener("mousemove", updatePos);
  }, []);

  const style = {
    /* base dot style */
    "--dot-size": "1px",
    "--dot-color": "var(--canvas-solid)",
    "--dot-space": "14px",

    /* glow settings */
    "--glow-radius": "100px",
    "--glow-dot-size": "2px",
    "--glow-dot-color": "var(--canvas-text-contrast)",

    /* initial position off-screen so dots don't show fully on load */
    "--mouse-x": "-9999px",
    "--mouse-y": "-9999px",

    width: "100%",
    height: "100%",
    position: "relative",
    background: `
      radial-gradient(circle var(--dot-size), var(--dot-color) 98%, transparent)
      0 0 / var(--dot-space) var(--dot-space)
    `,
  } as React.CSSProperties;

  return (
    <div ref={ref} style={style}>
      {/* Glow layer (only dots grow, no lines) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",

          /* glowing dots pattern */
          background: `
            radial-gradient(circle var(--glow-dot-size), var(--glow-dot-color) 98%, transparent)
            0 0 / var(--dot-space) var(--dot-space)
          `,

          /* reveal glow only around cursor */
          mask: `
            radial-gradient(
              circle var(--glow-radius) at var(--mouse-x) var(--mouse-y),
              white 0%,
              transparent 100%
            )
          `,
          WebkitMask: `
            radial-gradient(
              circle var(--glow-radius) at var(--mouse-x) var(--mouse-y),
              white 0%,
              transparent 100%
            )
          `,

          transition: "mask 0.1s ease-out, -webkit-mask 0.1s ease-out",
        }}
      />

      {children}
    </div>
  );
}

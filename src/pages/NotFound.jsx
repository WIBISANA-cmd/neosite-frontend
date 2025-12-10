// NotFound.jsx
import React, { useEffect } from "react";
import feather from "feather-icons";

const NotFound = () => {
  useEffect(() => {
    // Replace feather icons
    feather.replace();

    // Binary rain effect
    const binaryRain = document.getElementById("binary-rain");
    if (!binaryRain) return;

    const characters = "01";
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    const rows = Math.floor(window.innerHeight / fontSize);
    const intervals = [];

    for (let i = 0; i < columns; i++) {
      const column = document.createElement("div");
      column.className =
        "absolute top-0 text-primary-400 opacity-20 font-mono";
      column.style.left = `${i * fontSize}px`;
      column.style.fontSize = `${fontSize}px`;
      column.style.width = `${fontSize}px`;

      let text = "";
      for (let j = 0; j < rows; j++) {
        text += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      column.textContent = text;

      binaryRain.appendChild(column);

      let position = 0;
      const intervalId = setInterval(() => {
        position++;
        if (position > rows) position = 0;
        column.style.transform = `translateY(${position * fontSize}px)`;

        // Randomly change some characters
        if (Math.random() > 0.9) {
          const newText = Array.from(column.textContent)
            .map((char, idx) =>
              idx === Math.floor(Math.random() * rows)
                ? characters.charAt(
                    Math.floor(Math.random() * characters.length)
                  )
                : char
            )
            .join("");
          column.textContent = newText;
        }
      }, 100 + Math.random() * 50);

      intervals.push(intervalId);
    }

    // Interactive cursor glow effect
    const handleMouseMove = (e) => {
      const cursorGlow = document.createElement("div");
      cursorGlow.className =
        "absolute rounded-full bg-primary-500 opacity-10 pointer-events-none";
      cursorGlow.style.left = `${e.clientX - 50}px`;
      cursorGlow.style.top = `${e.clientY - 50}px`;
      cursorGlow.style.width = "100px";
      cursorGlow.style.height = "100px";
      cursorGlow.style.transition = "all 0.3s ease-out";

      document.body.appendChild(cursorGlow);

      setTimeout(() => {
        cursorGlow.style.transform = "scale(0)";
        cursorGlow.style.opacity = "0";
        setTimeout(() => cursorGlow.remove(), 300);
      }, 50);
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup on unmount
    return () => {
      intervals.forEach((id) => clearInterval(id));
      if (binaryRain) binaryRain.innerHTML = "";
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-dark-900 text-gray-100 min-h-screen grid-pattern flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Animated Glitch Effect */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary-500 opacity-20 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-primary-700 opacity-20 blur-3xl animate-pulse-slow delay-1000" />

        {/* Main Content */}
        <div className="relative">
          <h1 className="text-9xl font-bold mb-4 glitch-text animate-glitch">
            404
          </h1>
          <h2 className="text-3xl font-semibold mb-6 text-primary-400">
            Quantum Disruption Detected
          </h2>

          <div className="bg-dark-800 border border-primary-800 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="font-mono text-sm">
              <p className="text-primary-400">
                $&gt; ERROR: DIMENSIONAL_COORDINATES_NOT_FOUND
              </p>
              <p className="text-gray-400">
                $&gt; REASON: QUANTUM_ENTANGLEMENT_FAILURE
              </p>
              <p className="text-gray-400">
                $&gt; STATUS: <span className="text-red-400">CRITICAL</span>
              </p>
              <p className="text-gray-400">
                $&gt; SOLUTION:{" "}
                <span className="text-primary-400">RETURN_TO_SAFE_DIMENSION</span>
              </p>
              <p className="text-gray-400">
                $&gt; <span className="terminal-cursor">_</span>
              </p>
            </div>
          </div>

          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            The page you&apos;re looking for has been lost in the quantum void.
            Our systems detected a dimensional rift at these coordinates.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-900/30 flex items-center justify-center gap-2"
            >
              <i data-feather="arrow-left" />
              Return to Safety
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-dark-700 hover:bg-dark-600 border border-primary-800 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <i data-feather="alert-triangle" />
              Report Anomaly
            </a>
          </div>
        </div>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute top-1/4 left-10 w-8 h-8 rounded-full bg-primary-500 opacity-30 animate-float" />
      <div className="absolute top-1/3 right-20 w-12 h-12 rounded-full bg-primary-400 opacity-20 animate-float delay-1000" />
      <div className="absolute bottom-1/4 left-1/4 w-6 h-6 rounded-full bg-primary-300 opacity-30 animate-float delay-1500" />
      <div className="absolute bottom-1/3 right-1/3 w-10 h-10 rounded-full bg-primary-600 opacity-20 animate-float delay-2000" />

      {/* Binary Rain Container */}
      <div
        id="binary-rain"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />
    </div>
  );
};

export default NotFound;

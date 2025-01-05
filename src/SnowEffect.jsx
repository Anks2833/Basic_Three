import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const SnowEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create snowflakes
    const numSnowflakes = 1000;
    const positions = new Float32Array(numSnowflakes * 3); // x, y, z for each snowflake

    for (let i = 0; i < numSnowflakes; i++) {
      positions[i * 3] = Math.random() * 10 - 5; // x position
      positions[i * 3 + 1] = Math.random() * 10 - 5; // y position
      positions[i * 3 + 2] = Math.random() * 10 - 5; // z position
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Create snowflake material
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03, // Snowflake size
      transparent: true,
    });

    const snowflakes = new THREE.Points(geometry, material);
    scene.add(snowflakes);

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Make snowflakes fall down
      const positionAttribute = geometry.attributes.position;
      for (let i = 0; i < numSnowflakes; i++) {
        positionAttribute.array[i * 3 + 1] -= 0.01; // Move down (y-axis)
        if (positionAttribute.array[i * 3 + 1] < -5) {
          positionAttribute.array[i * 3 + 1] = 5; // Reset position if it falls out of view
        }
      }
      positionAttribute.needsUpdate = true; // Mark the position attribute as needing an update

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-screen" />;
};

export default SnowEffect;
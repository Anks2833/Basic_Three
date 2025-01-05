import React, { useEffect, useRef } from 'react';
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from "gsap";

const BufferGeometry2 = () => {

    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 1.3;

        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array(3000);

        for (let i = 0; i < 3000; i++) { // Corrected loop condition
            vertices[i] = (Math.random() - 0.5);
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material = new THREE.MeshBasicMaterial({ color: "white", wireframe: true });
        const mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);

        const colorObj = { r: 1, g: 1, b: 1 };
        gsap.to(colorObj, {
            r: 1,
            g: 0,
            b: 0,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            onUpdate: () => {
                material.color.setRGB(colorObj.r, colorObj.g, colorObj.b);
            }
        });

        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const controls = new OrbitControls( camera, renderer.domElement )

        function animate() {
            window.requestAnimationFrame(animate);

            mesh.rotation.y += 0.01;
            controls.update();

            renderer.render(scene, camera);
        }

        animate();

        return () => {
            renderer.dispose();
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} className='w-full h-screen'></canvas>
        </>
    );
};

export default BufferGeometry2;

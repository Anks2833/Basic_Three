import React, { useEffect, useRef } from 'react';
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'; // Ensure you're importing the correct loader

const Textures = () => {

    const canvasRef = useRef(null);

    useEffect(() => {

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 5;

        // Texture loader for other textures
        let textureLoader = new THREE.TextureLoader();
        // Load the textures
        let albedoMap = textureLoader.load("./fabric_albedo.jpg");
        albedoMap.colorSpace = THREE.SRGBColorSpace;
        let normalMap = textureLoader.load("./fabric_normal.jpg");
        let displacementMap = textureLoader.load("./fabric_dis.jpg");
        let aoMap = textureLoader.load("./fabric_ao.jpg");
        let roughnessMap = textureLoader.load("./fabric_rough.jpg");

        const geometry = new THREE.BoxGeometry(3, 3, 3);
        const material = new THREE.MeshPhysicalMaterial({
            map: albedoMap,             // Albedo texture
            normalMap: normalMap,       // Normal map
            displacementMap: displacementMap, // Displacement map
            displacementScale: 0.1,
            aoMap: aoMap,
            aoMapIntensity: 1.0,
            roughnessMap: roughnessMap,
            roughness: 0.5,
        });

        const mesh = new THREE.Mesh(geometry, material);
        // mesh.rotation.x = 0.7;
        scene.add(mesh);

        // Load HDRI
        const hdriLoader = new RGBELoader();
        hdriLoader.load(
            "/hdri.hdr", // Ensure this URL works
            function (hdriTexture) {
                // Apply the HDRI texture for the scene environment and reflection
                hdriTexture.mapping = THREE.EquirectangularReflectionMapping;

                // Set HDRI as environment
                scene.environment = hdriTexture;

                // Set HDRI as background
                scene.background = hdriTexture;

                // Adjust HDRI intensity
                const intensity = 3; // Adjust this value for desired intensity
                hdriTexture.multiplyScalar(intensity); // Scale HDRI intensity

                console.log("HDRI Loaded with intensity", intensity);
            },
            undefined,
            function (error) {
                console.error("Error loading HDRI: ", error);
            }
        );


        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const controls = new OrbitControls(camera, renderer.domElement);

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
        <div>
            <canvas ref={canvasRef} className="w-full h-screen"></canvas>
        </div>
    );
};

export default Textures;

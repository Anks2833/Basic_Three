import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const BufferGeometry = () => {

    const canvasRef = useRef(null);

    useEffect(() => {

        const canvas = canvasRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        )
        camera.position.z = 5;

        const geometry = new THREE.BufferGeometry();

        // create a simple square shape. We duplicate the top left and bottom right
        // vertices because each vertex needs to appear once per triangle.
        const vertices = new Float32Array([
            -1.0, -1.0, 1.0, // v0
            1.0, -1.0, 1.0, // v1
            1.0, 1.0, 1.0, // v2

            1.0, 1.0, 1.0, // v3
            -1.0, 1.0, 1.0, // v4
            -1.0, -1.0, 1.0  // v5
        ]);

        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        const mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);

        const renderer = new THREE.WebGLRenderer({canvas});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);

        return () => {
            renderer.dispose();
        }
    }, [])



    return (
        <div className='w-full h-screen'>

            <canvas ref={canvasRef} className='w-full h-full'></canvas>

        </div>
    )
}

export default BufferGeometry
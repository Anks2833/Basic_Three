import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Get the canvas element
    const canvas = canvasRef.current;

    // Create a scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    // Create a camera
    const cam = new THREE.PerspectiveCamera(
      150,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );

    // GSAP animation for FOV
    gsap.to(cam, {
      fov: 40,
      duration: 5,
      yoyo: true,
      repeat: -1,
      onUpdate: () => {
        cam.updateProjectionMatrix();
      },
    });

    // // GSAP animation for background color
    // gsap.to(scene.background, {
    //   r: 0, // Target red channel (blue in this case: RGB(0, 0, 255))
    //   g: 0,
    //   b: 1,
    //   duration: 5,
    //   yoyo: true,
    //   repeat: -1,
    //   onUpdate: () => {
    //     renderer.render(scene, cam); // Ensure the change reflects immediately
    //   },
    // });

    // Create a box mesh
    const geometry = new THREE.SphereGeometry(5, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: "SlateBlue", wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);

    const boxGeometry = new THREE.BoxGeometry(5, 5, 5, 20, 20, 20);
    const boxMaterial = new THREE.MeshBasicMaterial({ color: "yellow", wireframe: true });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    // Create a group
    const meshGrp = new THREE.Group();
    meshGrp.add(mesh);
    meshGrp.add(boxMesh);

    scene.add(meshGrp);

    // Position the camera
    cam.position.z = 15;

    // Create a renderer and attach it to the canvas
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the meshes
      mesh.rotation.x += 0.01;
      boxMesh.rotation.y += 0.004;

      // Render the scene with the camera
      renderer.render(scene, cam);
    };

    animate();

    // Clean up on unmount
    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default App;

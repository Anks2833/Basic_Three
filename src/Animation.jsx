import { useRef, useEffect } from "react";
import * as THREE from "three";

const Animation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    
    const canvas = canvasRef.current;


    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    
    const cam = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );

    const geometry = new THREE.BoxGeometry(6, 6, 6);
    const material = new THREE.MeshBasicMaterial({ color: "SlateBlue", wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    cam.position.z = 15;

    const clock = new THREE.Clock();
    
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    function animate() {
      window.requestAnimationFrame(animate);
      
      const deltaTime = clock.getDelta();
      // mesh.rotation.y += clock.getElapsedTime();
      // mesh.rotation.z += clock.getElapsedTime();

      mesh.rotation.y += deltaTime * 1.5;
      mesh.rotation.x += deltaTime * 1.5;
      renderer.render(scene, cam);
    }

    animate();

    
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

export default Animation;
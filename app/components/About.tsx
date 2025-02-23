"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Image from 'next/image'
import Razor from "@/app/images/TextAbout.png"

const AboutSection = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Prevent re-creating the scene if already exists
    if (!sceneRef.current) {
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 2, 8);

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      mountRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Orbit Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.minDistance = 4;
      controls.maxDistance = 10;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.2;

      // Load 3D Model (Only once)
      if (!modelRef.current) {
        const loader = new GLTFLoader();
        loader.load("/models/razer_keyboard.glb", (gltf) => {
          const model = gltf.scene;
          model.scale.set(2, 2, 2);
          model.position.set(0, -1, 0);
          scene.add(model);
          modelRef.current = model; // Store reference to prevent duplication
        });
      }

      // Animation Loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // Handle window resizing
      const handleResize = () => {
        if (mountRef.current) {
          camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        }
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []); // Runs only once to prevent re-renders affecting the model

  return (
    <section id="about" className="min-h-screen flex bg-gray-900 text-white justify-center items-center py-12">
      <div className="flex w-[90%] max-w-7xl flex-col md:flex-row justify-between items-center gap-10 md:gap-16">
        {/* Left Side - Text Content */}
        <div className="w-full md:w-1/2 text-left text-green-400 mb-8 md:mb-0 md:mr-12">
        <Image src={Razor} width={400} height={400} alt="brand"/>
          <h1 className="text-2xl md:text-3xl font-extrabold mb-4">Razer</h1>
          <p className="text-lg leading-relaxed mb-4">
            Razer™ is the world’s leading lifestyle brand made For Gamers. By Gamers.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            The triple-headed snake trademark of Razer is one of the most recognized logos in the global gaming and esports communities.
          </p>
          <p className="text-lg leading-relaxed">
            Razer has designed and built the world’s largest gamer-focused ecosystem of hardware, software, and services.
          </p>
        </div>

        {/* Right Side - 3D Model */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div ref={mountRef} className="w-[800px] h-[600px]" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
















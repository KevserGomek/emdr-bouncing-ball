import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Ball = ({ color, speed = 5, paused = false, soundOn = false }) => {

  const mountRef = useRef(null);
  const ballRef = useRef(null);
  const directionRef = useRef(1);
  const ballPositionX = useRef(0);
  const speedRef = useRef(speed);
  const animationFrameId = useRef(null);
  const renderer = useRef(null);
  const scene = useRef(null);
  const camera = useRef(null);
  const audioRef = useRef(null);
  const backgroundColor = 0x87CEEB;
  
  useEffect(() => {
    const width = 875;
    const height = 700;
    const ballRadius = 50;

    const _renderer = new THREE.WebGLRenderer();
    _renderer.setSize(width, height);
    _renderer.shadowMap.enabled = true;
    _renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    if (mountRef.current) {
      mountRef.current.appendChild(_renderer.domElement);
    }

    const _scene = new THREE.Scene();
    _scene.background = new THREE.Color(backgroundColor);
    const _camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    _camera.position.z = 500;

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    _scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(100, 200, 100).normalize();
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 8192;
    directionalLight.shadow.mapSize.height = 8192;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.bias = -0.05;
    directionalLight.shadow.radius = 0;

    _scene.add(directionalLight);

    const groundGeometry = new THREE.PlaneGeometry(2000, 2000);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -ballRadius;
    ground.receiveShadow = true;
    _scene.add(ground);

    const geometry = new THREE.SphereGeometry(ballRadius, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(color) });
    const ball = new THREE.Mesh(geometry, material);

    ball.castShadow = true;
    ball.receiveShadow = true;
    _scene.add(ball);

    renderer.current = _renderer;
    scene.current = _scene;
    camera.current = _camera;
    ballRef.current = ball;


    const audio = new Audio('/ball-sound.wav');
    audioRef.current = audio;

    return () => {
      if (mountRef.current && renderer.current) {
        mountRef.current.removeChild(renderer.current.domElement);
      }

      renderer.current.dispose();
      geometry.dispose();
      material.dispose();
      scene.current.remove(ballRef.current);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (ballRef.current) {
      ballRef.current.material.color.set(new THREE.Color(color));
    }
  }, [color]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    const animate = () => {
      if (!paused) {

        if (speedRef.current > 0) {
          ballPositionX.current += speedRef.current * directionRef.current;

          if (ballPositionX.current > 1000 / 2 - 50 || ballPositionX.current < -1000 / 2 + 50) {
            directionRef.current = -directionRef.current;
            ballPositionX.current = Math.max(Math.min(ballPositionX.current, 1000 / 2 - 50), -1000 / 2 + 50);

            if (soundOn && audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play();
            }

          }
        }

        ballRef.current.position.set(ballPositionX.current, 0, 0);
      }

      renderer.current.render(scene.current, camera.current);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [paused, soundOn]);

  return <div ref={mountRef} />;
};

export default Ball;
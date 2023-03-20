import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';
import {gsap} from "gsap";
import {bool} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

@Component({
  selector: 'app-spline-stuff',
  templateUrl: './spline-stuff.component.html',
  styleUrls: ['./spline-stuff.component.css']
})
export class SplineStuffComponent implements OnInit {
  createSplineObject() {
    // camera
    const canvas = document.querySelector('canvas')
    const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -100000, 100000);
    camera.position.set(0, 0, 1000);
    camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

// scene
    const scene = new THREE.Scene();

// spline scene
    const loader = new SplineLoader();
    loader.load(
      'https://prod.spline.design/142AnBAD2b5kB7dq/scene.splinecode',
      (splineScene) => {
        scene.add(splineScene);
      }
    );

// renderer
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    // document.body.appendChild(renderer.domElement);

// scene settings
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    scene.background = new THREE.Color('#ffd2d2');
    renderer.setClearAlpha(1);

// orbit controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.125;

    window.addEventListener('resize', onWindowResize);

    function onWindowResize() {
      camera.left = window.innerWidth / -2;
      camera.right = window.innerWidth / 2;
      camera.top = window.innerHeight / 2;
      camera.bottom = window.innerHeight / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate(time) {
      controls.update();
      renderer.render(scene, camera);
    }

    const tl = gsap.timeline({defaults: {duration: 1}})
    tl.fromTo("nav", {y: "-100%"}, {y: "0%"});
    tl.fromTo('.title', {opacity: 0}, {opacity: 1})
  }
  ngOnInit() {
    this.createSplineObject()
  }
}

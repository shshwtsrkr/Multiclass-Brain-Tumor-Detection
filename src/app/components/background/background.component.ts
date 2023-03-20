import {Component, OnInit} from '@angular/core';
import * as three from 'three'
import {ImageModel} from "../image.model";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass";
import * as THREE from "three";
import {BufferGeometry, BufferGeometryUtils, Vector3} from "three";
import {style} from "@angular/animations";


@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  constructor() {
  }

  backgroundCreation() {
    const canvas = document.querySelector('.webgl');
    // canvas.setAttribute('style', '')
    const scene = new three.Scene();
    const fov = 60;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;

    const camera = new three.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 20);
    scene.add(camera);
    const renderer = new three.WebGLRenderer({
      canvas,
      antialias: true,

    });
    renderer.autoClear = false;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    renderer.setClearColor(0x000000, 0.0);
    const bloomPass = new UnrealBloomPass(
      new three.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0;
    bloomPass.strength = 2;
    bloomPass.radius = 0;
    const renderScene = new RenderPass(scene, camera);
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.renderToScreen = true;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

//sun object #FDB813
    const color = new three.Color("#facc6a");
    const geometry = new three.IcosahedronGeometry(1, 15);
    const material = new three.MeshBasicMaterial({color: color});
    const sphere = new three.Mesh(geometry, material);
    sphere.position.set(0, 0, 0);
    sphere.layers.set(1);
    scene.add(sphere);
    //sphere 2
    const geometry1 = new THREE.SphereGeometry(5, 64, 64);
    const material1 = new THREE.MeshStandardMaterial({
      color: '#00ff83',
      roughness: 0.5
    })
    sphere.updateMatrix();


// galaxy geometry
    const starGeometry = new three.SphereGeometry(80, 64, 64);

// galaxy material
    const image = new ImageModel();
    const tex  = new three.TextureLoader().load(`${image.source}`);;
    const starMaterial = new three.MeshBasicMaterial({
      map: tex,
      side: three.BackSide,
      transparent: false,
    });

// galaxy mesh
    const starMesh = new three.Mesh(starGeometry, starMaterial);
    // starMesh.scale.x=window.innerWidth;
    starMesh.layers.set(1);
    scene.add(starMesh);

//ambient light
    const ambientLight = new three.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

//resize listener
    window.addEventListener(
      "resize",
      () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        bloomComposer.setSize(window.innerWidth, window.innerHeight);
      },
      false
    );

//animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      starMesh.rotation.y += 0.001;
      camera.layers.set(1);
      bloomComposer.render();
    };

    animate();
  }

  ngOnInit() {
    console.log(window.innerWidth)
    this.backgroundCreation();
  }
}

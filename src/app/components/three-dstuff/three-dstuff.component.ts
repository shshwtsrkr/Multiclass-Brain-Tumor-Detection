import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {gsap} from "gsap";

@Component({
  selector: 'app-three-dstuff',
  templateUrl: './three-dstuff.component.html',
  styleUrls: ['./three-dstuff.component.css']
})
export class ThreeDStuffComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', {static: true}) canopy: ElementRef<HTMLCanvasElement>;
  sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  createOnCanvas() {
    const scene = new THREE.Scene();
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: '#00ff83',
      roughness: 0.5
    })
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh)
    const light = new THREE.PointLight(0xffffff, 1.5, 100)
    light.position.set(0, 10, 10)
    scene.add(light)
    const camera = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100);
    camera.position.z = 10
    // scene.add(camera)
    const canvas = document.querySelector('.webgl') as HTMLCanvasElement
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(this.sizes.width, this.sizes.height)
    renderer.setPixelRatio(2);
    // renderer.render(scene, camera)
    window.addEventListener('resize', () => {
      this.sizes.width = window.innerWidth
      this.sizes.height = window.innerHeight
      camera.aspect = this.sizes.width / this.sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(this.sizes.width, this.sizes.height)
    })
    const loop = () => {
      controls.update();
      renderer.render(scene, camera)
      requestAnimationFrame(loop)
    }
    loop()
    const tl = gsap.timeline({defaults: {duration: 1}})
    tl.fromTo(mesh.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1});
    tl.fromTo("nav", {y: "-100%"}, {y: "0%"});
    tl.fromTo('.title', {opacity: 0}, {opacity: 1})

    let mousedown = false;
    let rgb = []
    window.addEventListener('mousedown', () => {
      mousedown = true
    })
    window.addEventListener('mouseup', () => {
      mousedown = false
    })
    window.addEventListener('mousemove', (event) => {
      if (mousedown) {
        rgb = [Math.round(event.pageY / this.sizes.width * 255),
          Math.round(event.pageY / this.sizes.width * 255),
          150]
      }
      let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
      gsap.to(mesh.material.color, {r: newColor.r, g: newColor.g, b: newColor.b})
    })
  }

  ngOnInit() {
    this.createOnCanvas()
  }

  ngAfterViewInit() {
  }
}

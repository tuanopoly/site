// Hero orb, after Pavel Mazhuga's Codrops "Animated Displaced Sphere" (2024):
// MeshPhysicalMaterial, ridged smoothMod pattern warped by Perlin noise, drifting downward.
// Non-interactive: time drives everything. Colour follows the AccentPal palette variables.
//
// The displacement and normal-rebuild shader code is adapted from
// https://github.com/pavel-mazhuga/codrops-tutorial-distorted-sphere-custom-material
// MIT License. Copyright (c) 2009 - 2024 Codrops (https://tympanus.net/codrops)
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
// associated documentation files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions: The above copyright notice and this
// permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// Perlin noise: Stefan Gustavson, https://github.com/stegu/webgl-noise (MIT).
import * as THREE from '/vendor/three.module.min.js';

const NOISE =/* glsl */ `
  // Classic Perlin 3D noise, Stefan Gustavson (MIT).
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec3 fade(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}
  float cnoise(vec3 P){
    vec3 Pi0 = floor(P); vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0); Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz; vec4 iz1 = Pi1.zzzz;
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0); vec4 ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 / 7.0; vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5; gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0); vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    vec4 gx1 = ixy1 / 7.0; vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5; gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1); vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x); vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z); vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x); vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z); vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000), dot(g010,g010), dot(g100,g100), dot(g110,g110)));
    g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001), dot(g011,g011), dot(g101,g101), dot(g111,g111)));
    g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
    vec3 f = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), f.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, f.y);
    return 2.2 * mix(n_yz.x, n_yz.y, f.x);
  }

  float smoothMod(float axis, float amp, float rad) {
    float top = cos(PI * (axis / amp)) * sin(PI * (axis / amp));
    float bottom = pow(sin(PI * (axis / amp)), 2.0) + pow(rad, 2.0);
    float at = atan(top / bottom);
    return amp * (1.0 / 2.0) - (1.0 / PI) * at;
  }

  float getDisplacement(vec3 p) {
    vec3 pos = p;
    pos.y -= uTime * 0.05 * uSpeed;
    pos += cnoise(pos * 1.65) * uNoiseStrength;
    return smoothMod(pos.y * uFractAmount, 1.0, 1.5) * uDisplacementStrength;
  }
`;

function init(canvas) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) {
    canvas.remove();
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 6;

  scene.add(new THREE.AmbientLight('#ffffff', 1));
  const key = new THREE.DirectionalLight('#ffffff', 5);
  key.position.set(-2, 2, 3.5);
  scene.add(key);

  const uniforms = {
    uTime: { value: 0 },
    uSpeed: { value: 1.58 },
    uNoiseStrength: { value: 0.3 },
    uDisplacementStrength: { value: 0.57 },
    uFractAmount: { value: 4 },
  };

  const material = new THREE.MeshPhysicalMaterial({
    roughness: 0.56,
    metalness: 0.76,
    reflectivity: 0.46,
    clearcoat: 0,
    ior: 2.81,
    iridescence: 0.96,
  });

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);

    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
        uniform float uTime; uniform float uSpeed; uniform float uNoiseStrength;
        uniform float uDisplacementStrength; uniform float uFractAmount;
        varying float vPattern;
        ${NOISE}`)
      // Displace along the normal, then rebuild the normal from two shifted neighbours.
      .replace('#include <beginnormal_vertex>', `
        vec3 objectNormal = normalize(normal);
        vec3 tng = normalize(cross(objectNormal, abs(objectNormal.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
        vec3 btg = cross(objectNormal, tng);
        float shift = 0.01;
        vec3 posA = position + tng * shift;
        vec3 posB = position + btg * shift;
        float pattern = getDisplacement(position);
        vPattern = pattern;
        vec3 displaced = position + objectNormal * pattern;
        posA += objectNormal * getDisplacement(posA);
        posB += objectNormal * getDisplacement(posB);
        objectNormal = normalize(cross(normalize(posA - displaced), normalize(posB - displaced)));`)
      .replace('#include <begin_vertex>', `vec3 transformed = displaced;`);

    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        varying float vPattern;`)
      .replace('#include <color_fragment>', `#include <color_fragment>
        diffuseColor.rgb *= vPattern;`);
  };

  // 80 subdivisions is ~390k vertices and builds in ~150ms; 200 was 2.4M and ~850ms.
  const detail = window.matchMedia('(max-width: 640px)').matches ? 56 : 80;
  const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.3, detail), material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    material.color.set(cs.getPropertyValue('--ap-accent').trim());
  }

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clock = new THREE.Clock();
  let raf = 0;
  let visible = true;

  function frame() {
    raf = 0;
    uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
    if (!reduced.matches && visible) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }

  new ResizeObserver(() => { resize(); kick(); }).observe(canvas);
  new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; if (visible) kick(); }).observe(canvas);
  new MutationObserver(() => { readColors(); kick(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  reduced.addEventListener('change', kick);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });

  readColors();
  resize();
  renderer.compile(scene, camera);
  frame();
  canvas.classList.add('is-ready');
  performance.mark('orb-ready');
}

const canvas = document.getElementById('orb');
if (canvas) init(canvas);

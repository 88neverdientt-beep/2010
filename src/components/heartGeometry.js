import * as THREE from 'three';
export const HEART_TURNS = 5;
export const HEART_ROTATION = Math.PI * 2 * HEART_TURNS;
export const HEART_DURATION = 10;
// A closed, volumetric heart: longitude follows the classic heart outline,
// latitude sweeps from the back pole to the front pole through the silhouette.
export function heartPoint(u, v) {
  const s = Math.sin(v);
  return [16 * Math.sin(u) ** 3 * s / 11,
    ((13 * Math.cos(u) - 5 * Math.cos(2*u) - 2 * Math.cos(3*u) - Math.cos(4*u)) * s + 2) / 11,
    .88 * Math.cos(v) * (.82 + .18 * Math.sin(u) ** 2)];
}
export function makeHeartGeometry() {
  const positions = [];
  const segment = (a, b) => positions.push(...a, ...b);
  for (let j = 1; j < 38; j++) {
    const v = j / 38 * Math.PI;
    for (let i = 0; i < 160; i++) segment(heartPoint(i/160*Math.PI*2,v),heartPoint((i+1)/160*Math.PI*2,v));
  }
  for (let i = 0; i < 72; i++) {
    const u = i / 72 * Math.PI * 2;
    for (let j = 0; j < 80; j++) segment(heartPoint(u,j/80*Math.PI),heartPoint(u,(j+1)/80*Math.PI));
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

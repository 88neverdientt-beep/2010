import test from 'node:test';
import assert from 'node:assert/strict';
import { HEART_TURNS, HEART_DURATION, HEART_ROTATION, makeHeartGeometry, heartPoint } from '../src/components/heartGeometry.js';
test('rotation contract is five complete Y turns in ten seconds',()=>{
  assert.equal(HEART_TURNS,5);assert.equal(HEART_DURATION,10);assert.equal(HEART_ROTATION,10*Math.PI);assert.equal(HEART_ROTATION/HEART_DURATION,Math.PI);
});
test('heart is a finite volumetric surface with a continuous outline and front/back depth',()=>{
  const g=makeHeartGeometry();const a=g.attributes.position;
  assert.ok(a.count>20000);assert.equal(a.count%2,0);assert.ok([...a.array].every(Number.isFinite));
  g.computeBoundingBox();assert.ok(g.boundingBox.max.z-g.boundingBox.min.z>1);
  assert.ok(g.boundingBox.max.x-g.boundingBox.min.x>2.8);
  for(let i=0;i<=20;i++){const v=i/20*Math.PI;const p=heartPoint(0,v),q=heartPoint(Math.PI*2,v);for(let k=0;k<3;k++)assert.ok(Math.abs(p[k]-q[k])<1e-9);}
  g.dispose();
});

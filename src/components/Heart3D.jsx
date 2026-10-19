import { Component, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { makeHeartGeometry, heartPoint, HEART_ROTATION, HEART_DURATION } from './heartGeometry';

function HeartMesh({ onComplete, onProgress, onContextLost }) {
  const group = useRef(), material = useRef(), sparks = useRef(), sparkMaterial = useRef();
  const invalidate = useThree(s => s.invalidate);
  const gl = useThree(s => s.gl);
  useEffect(()=>{const canvas=gl.domElement;const lost=e=>{e.preventDefault();onContextLost();};canvas.addEventListener('webglcontextlost',lost);return()=>canvas.removeEventListener('webglcontextlost',lost);},[gl,onContextLost]);
  const geometry = useMemo(makeHeartGeometry, []);
  const scatter = useMemo(() => {
    const count = window.innerWidth < 600 ? 260 : 540;
    const start = new Float32Array(count * 3), target = new Float32Array(count * 3);
    for (let i=0;i<count;i++) {
      const p=heartPoint(i*2.39996, .15 + ((i*73)%count)/count*(Math.PI-.3));
      for(let k=0;k<3;k++) { start[i*3+k]=p[k]; target[i*3+k]=p[k]*3.4 + Math.sin(i*13+k)*1.5; }
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.BufferAttribute(start.slice(),3));
    return { geo, start, target };
  }, []);
  useEffect(() => {
    let completed = false, lastTurn = -1;
    const mesh = group.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onUpdate: invalidate });
      tl.fromTo(mesh.scale,{x:.025,y:.025,z:.025},{x:1,y:1,z:1,duration:1.5,ease:'power2.out'});
      tl.to(mesh.rotation,{y:HEART_ROTATION,duration:HEART_DURATION,ease:'none',onStart:()=>{gl.domElement.dataset.rotationStarted=String(performance.now());},onUpdate:()=> {
        gl.domElement.dataset.rotationY=String(mesh.rotation.y);
        gl.domElement.dataset.rotationX=String(mesh.rotation.x);
        gl.domElement.dataset.rotationZ=String(mesh.rotation.z);
        const turns = Math.min(5,Math.floor((mesh.rotation.y + 1e-8)/(Math.PI*2)));
        if(turns!==lastTurn) {lastTurn=turns;onProgress(turns);}
      },onComplete:()=> {mesh.rotation.y=HEART_ROTATION;gl.domElement.dataset.rotationY=String(HEART_ROTATION);gl.domElement.dataset.rotationCompleted=String(performance.now());onProgress(5);}});
      tl.to(material.current,{opacity:1,duration:.24});
      tl.set(sparkMaterial.current,{opacity:.9});
      tl.to(material.current,{opacity:0,duration:.9});
      const dissolve = {value:0};
      tl.to(dissolve,{value:1,duration:1.25,ease:'power2.out',onUpdate:()=> {
        const a = scatter.geo.attributes.position;
        for(let i=0;i<a.array.length;i++) a.array[i]=THREE.MathUtils.lerp(scatter.start[i],scatter.target[i],dissolve.value);
        a.needsUpdate=true; invalidate();
      }},'<');
      tl.to(sparkMaterial.current,{opacity:0,duration:.65},'>-.55');
      tl.call(()=>{if(!completed){completed=true;onComplete();}});
    });
    return () => ctx.revert();
  }, [onComplete, onProgress, invalidate, scatter, gl]);
  useEffect(()=>()=>{geometry.dispose();scatter.geo.dispose();},[geometry,scatter]);
  return <group ref={group}><lineSegments geometry={geometry}><lineBasicMaterial ref={material} color="#ffffff" transparent opacity={.58} depthWrite={false} blending={THREE.AdditiveBlending}/></lineSegments><points ref={sparks} geometry={scatter.geo}><pointsMaterial ref={sparkMaterial} color="white" size={.035} transparent opacity={0} depthWrite={false}/></points></group>;
}
function canUseWebGL() {
  try {const canvas=document.createElement('canvas'); const gl=canvas.getContext('webgl2')||canvas.getContext('webgl'); if(!gl)return false; gl.getExtension('WEBGL_lose_context')?.loseContext();return true;}catch{return false;}
}
class CanvasBoundary extends Component {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed ? this.props.fallback : this.props.children;}
}
function Fallback({onComplete}) {
  return <div className="webgl-fallback"><span>♡</span><p>Thiết bị này chưa hỗ trợ trái tim WebGL.<br/>Món quà của em vẫn ở đây.</p><button className="primary" onClick={onComplete}>Xem điều bất ngờ ❤️</button></div>;
}
export default function Heart3D({onComplete,onProgress}) {
  const [supported,setSupported]=useState(canUseWebGL);
  const contextLost = useMemo(()=>()=>setSupported(false),[]);
  if(!supported)return <Fallback onComplete={onComplete}/>;
  return <CanvasBoundary fallback={<Fallback onComplete={onComplete}/>}><Canvas frameloop="demand" dpr={[1,1.7]} camera={{position:[0,0,5.6],fov:44}} gl={{alpha:true,antialias:true,powerPreference:'low-power'}}><HeartMesh onComplete={onComplete} onProgress={onProgress} onContextLost={contextLost}/></Canvas></CanvasBoundary>;
}

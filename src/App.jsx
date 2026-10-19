import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Volume2, VolumeX } from 'lucide-react';
import IntroPage from './pages/IntroPage';
import ExperiencePage from './pages/ExperiencePage';
const FinalPage = lazy(() => import('./pages/FinalPage'));
import Particles from './components/Particles';
export default function App() {
  const [stage,setStage]=useState(0),[opening,setOpening]=useState(false),[sound,setSound]=useState(false);
  const timer=useRef(),audio=useRef(),lock=useRef(false);
  useEffect(()=>()=>{clearTimeout(timer.current);audio.current?.close();},[]);
  useEffect(()=>{if(stage===3){import('./pages/FinalPage');const preload=document.createElement('video');preload.preload='auto';preload.src='/videos/love.mp4';preload.load();return()=>{preload.removeAttribute('src');preload.load();};}},[stage]);
  function chime(){if(!sound)return;try{const ctx=audio.current;if(!ctx)return;ctx.resume();[523.25,659.25,783.99].forEach((frequency,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=frequency;g.gain.setValueAtTime(0,ctx.currentTime);g.gain.linearRampToValueAtTime(.035,ctx.currentTime+.02+i*.1);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+1+i*.1);o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+1.4);});}catch{}}
  function toggleSound(){if(!audio.current){const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;audio.current=new Audio();}setSound(s=>!s);audio.current.resume();}
  function open(){if(lock.current)return;lock.current=true;chime();setOpening(true);timer.current=setTimeout(()=>{setStage(1);setOpening(false);lock.current=false;},1100);}
  function next(){chime();setStage(stage+1);}
  function restart(){clearTimeout(timer.current);setStage(0);setOpening(false);lock.current=false;}
  return <div className={`app ${stage===4?'final-background':''}`}><Particles/><header><a className="brand" href="#" onClick={e=>{e.preventDefault();restart();}}><span className="brand-icon"><Heart size={18}/></span>a little love<span className="brand-dot">.</span></a><div className="header-right"><span className="edition">JUST FOR YOU · 20 / 10</span><button className="sound-button" onClick={toggleSound} aria-label={sound?'Tắt âm thanh hiệu ứng':'Bật âm thanh hiệu ứng'} aria-pressed={sound}>{sound?<Volume2 size={17}/>:<VolumeX size={17}/>}</button></div></header>
    <main><Suspense fallback={<p className="signature">Một chút yêu thương đang đến… ♡</p>}><AnimatePresence mode="wait">{stage===0?<IntroPage key="intro" onOpen={open} opening={opening}/>:stage<4?<ExperiencePage key={`stage-${stage}`} stage={stage} onNext={next}/>:<FinalPage key="final" onRestart={restart}/>}</AnimatePresence></Suspense></main>
    <footer><span>MADE WITH <Heart size={10} fill="currentColor"/> & A LITTLE MAGIC</span><nav aria-label="Các giai đoạn trải nghiệm">{['Món quà','Lời thương','Bất ngờ'].map((label,i)=><span key={label} className={(stage===0?0:stage<4?1:2)===i?'active':''}><i/>{label}</span>)}</nav><span className="footer-note"><Sparkles size={13}/> Dành riêng cho một người.</span></footer>
  </div>;
}

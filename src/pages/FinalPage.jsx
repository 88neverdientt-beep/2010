import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Heart3D from '../components/Heart3D';
import LoveVideo from '../components/LoveVideo';
import Transition from '../components/Transition';
export default function FinalPage({onRestart}) {
  const [done,setDone]=useState(false),[turns,setTurns]=useState(0);
  const complete=useCallback(()=>setDone(true),[]);
  const progress=useCallback(n=>setTurns(n),[]);
  return <Transition className="final"><AnimatePresence mode="wait">{!done?<motion.div className="heart-scene" key="heart" exit={{opacity:0,filter:'blur(12px)'}} transition={{duration:.6}}><div className="eyebrow">MỖI VÒNG QUAY, MỘT LỜI YÊU</div><h2>Một trái tim.<br/><em>Chỉ dành cho em.</em></h2><div className={`heart-canvas ${turns===5?'heart-complete':''}`}><div className="heart-halo"/><div className="heart-rays" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i} style={{'--angle':`${i*20}deg`,'--ray-delay':`${i%3*.08}s`}}/>)}</div><Heart3D onComplete={complete} onProgress={progress}/></div><div className="turns" aria-label={`Đã hoàn thành ${turns} trên 5 vòng`}>{[1,2,3,4,5].map(n=><span className={turns>=n?'filled':''} key={n}>♥</span>)}</div><p className="micro" aria-live="polite">{turns<5?`${turns} / 5 vòng yêu thương · Chờ anh một chút nhé`:'Đủ năm vòng yêu thương. Điều bất ngờ đang đến…'}</p></motion.div>:<motion.div key="video" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.8}}><LoveVideo onRestart={onRestart}/></motion.div>}</AnimatePresence></Transition>;
}

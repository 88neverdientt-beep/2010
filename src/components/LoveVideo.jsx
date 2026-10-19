import { useCallback, useEffect, useRef, useState } from 'react';
import { Maximize, Play, RotateCcw, Volume2, VolumeX, Pause, Heart } from 'lucide-react';
export default function LoveVideo({ onRestart }) {
  const video = useRef();
  const [blocked,setBlocked]=useState(false),[muted,setMuted]=useState(false),[playing,setPlaying]=useState(false),[missing,setMissing]=useState(false),[ended,setEnded]=useState(false),[fullError,setFullError]=useState('');
  const play=useCallback(async()=>{try {await video.current.play();setBlocked(false);}catch{setBlocked(true);}},[]);
  useEffect(()=>{play();},[play]);
  const fullscreen=async()=>{try{const v=video.current;if(v.requestFullscreen)await v.requestFullscreen();else if(v.webkitEnterFullscreen)v.webkitEnterFullscreen();else setFullError('Trình duyệt này chưa hỗ trợ toàn màn hình.');}catch{setFullError('Em có thể dùng nút toàn màn hình trên video.');}};
  return <div className="video-scene"><span className="eyebrow">VÀ ĐÂY LÀ ĐIỀU ANH MUỐN NÓI</span><h2>Em là điều <em>đặc biệt nhất.</em></h2>
    <div className="video-frame"><video ref={video} src="/videos/love.mp4" playsInline preload="auto" muted={muted} controls={playing || ended} onVolumeChange={event=>setMuted(event.currentTarget.muted)} onPlay={()=>{setPlaying(true);setEnded(false);setBlocked(false);}} onPause={()=>setPlaying(false)} onEnded={()=>setEnded(true)} onError={()=>setMissing(true)} />
    {!missing && (blocked || ended) && <div className="video-overlay"><button className="primary" onClick={()=>{if(ended)video.current.currentTime=0;play();}}><Play size={18}/>{ended ? 'Xem lại khoảnh khắc này' : '❤️ Nhấn để xem điều bất ngờ'}</button></div>}
    {missing && <div className="video-overlay missing"><Heart size={38}/><h3>Món quà đang chờ video của em</h3><p>Video chưa có hoặc không thể đọc được.<br/>Hãy thêm video rồi tải lại trang nhé.</p><button className="secondary" onClick={()=>{setMissing(false);video.current.load();play();}}>Thử tải lại video</button></div>}
    </div><div className="video-controls"><button onClick={()=>{if(playing)video.current.pause();else play();}} aria-label={playing?'Tạm dừng':'Phát video'} disabled={missing}>{playing?<Pause size={18}/>:<Play size={18}/>}</button><button onClick={()=>setMuted(m=>!m)} aria-label={muted?'Bật âm thanh':'Tắt âm thanh'}>{muted?<VolumeX size={18}/>:<Volume2 size={18}/>}</button><button onClick={()=>{video.current.currentTime=0;play();}} aria-label="Phát lại video" disabled={missing}><RotateCcw size={18}/></button><button onClick={fullscreen} aria-label="Toàn màn hình" disabled={missing}><Maximize size={18}/></button></div>
    {fullError&&<p role="status" className="micro">{fullError}</p>}<button className="text-button" onClick={onRestart}>Mở lại món quà từ đầu ↗</button><p className="signature">All my love, always. ♡</p></div>;
}

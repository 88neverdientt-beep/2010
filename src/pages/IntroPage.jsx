import GiftBox from '../components/GiftBox';
import Transition from '../components/Transition';
import { ArrowUpRight, Heart } from 'lucide-react';
export default function IntroPage({ opening, onOpen }) {
  return <Transition className="intro"><div className="eyebrow"><span/> MỘT CHÚT BẤT NGỜ, DÀNH RIÊNG CHO EM <span/></div>
    <h1>Có một món quà<br/><em>đang chờ em.</em><span className="heading-star" aria-hidden="true">✧</span></h1>
    <p className="subtitle">Không phải ngày đặc biệt mới cần một món quà.<br/>Vì có em, ngày nào cũng đặc biệt.</p>
    <GiftBox opening={opening} onOpen={onOpen}/>
    <button className="primary" onClick={onOpen} disabled={opening}>{opening ? 'Bất ngờ đang mở ra…' : 'Mở quà của em'}<ArrowUpRight size={18}/></button>
    <p className="micro"><Heart size={12}/> Một món quà nhỏ. Rất nhiều yêu thương.</p>
    <span className="handwritten">psst… chạm vào hộp quà nhé <span>↗</span></span>
  </Transition>;
}

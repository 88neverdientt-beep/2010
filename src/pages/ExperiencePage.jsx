import { useState } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import Transition from '../components/Transition';
import DialogBox from '../components/DialogBox';
export default function ExperiencePage({ stage, onNext }) {
  const [hesitated, setHesitated] = useState(false);
  return <Transition className="experience"><div className="eyebrow">MỘT LÁ THƯ TỪ TRÁI TIM</div>
    {stage === 1 && <DialogBox title="Gửi em, người thương của anh" actions={<button className="primary" onClick={onNext}>Em đọc tiếp nhé <ArrowRight size={17}/></button>}><p>Giữa rất nhiều điều đẹp đẽ trên thế giới này,<br/>gặp được em vẫn là điều anh thích nhất.</p><p>Cảm ơn em đã đến, đã ở lại,<br/>và làm những ngày bình thường trở nên thật dịu dàng.</p><span className="signature">Thương em, thật nhiều ♡</span></DialogBox>}
    {stage === 2 && <DialogBox pixel title="Em có muốn nhận thêm yêu thương?" actions={<><button className="primary" onClick={onNext}>Có, tất nhiên rồi <Heart size={16}/></button><button className="secondary" onClick={() => setHesitated(true)}>Để em nghĩ một chút</button></>}><p>{hesitated ? 'Anh đợi được mà. Khi nào sẵn sàng, em nhấn “Có” nhé ♡' : 'Có một điều nữa anh đã để dành cho em. Chỉ cần em gật đầu thôi…'}</p></DialogBox>}
    {stage === 3 && <div className="letter"><div className="letter-flower">✿</div><span className="eyebrow">HAPPY WOMEN’S DAY · 20 / 10</span><h2>Chúc em luôn được yêu,<br/><em>theo cách em xứng đáng.</em></h2><p>Luôn rạng rỡ, luôn tự tin và luôn là chính em.<br/>Còn những ngày mỏi mệt, cứ để anh ở bên.</p><span className="signature">Điều cuối cùng, dành riêng cho em…</span><button className="primary" onClick={onNext}>Chạm vào trái tim anh <Heart size={17}/></button></div>}
    <p className="micro">Được gửi bằng tất cả sự chân thành.</p>
  </Transition>;
}

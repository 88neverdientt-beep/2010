import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const executablePath=process.env.BROWSER_PATH || (process.platform==='win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined);
const browser=await chromium.launch({executablePath,headless:true,args:['--use-angle=swiftshader','--enable-webgl','--autoplay-policy=document-user-activation-required']});
await mkdir('test-results',{recursive:true});
const errors=[];
const warnings=new Set(),consoleErrors=[],results=[];
const baseURL=process.env.BASE_URL || 'http://localhost:5173';
async function setup(viewport){const page=await browser.newPage({viewport});page.on('pageerror',e=>errors.push(e.message));page.on('console',msg=>{if(msg.type()==='warning')warnings.add(msg.text());});await page.goto(baseURL);await page.getByRole('heading',{name:/Có một món quà/}).waitFor();return page;}
async function reachHeart(p){
  await p.getByRole('button',{name:'Mở quà của em',exact:true}).click();
  await p.getByRole('button',{name:/Em đọc tiếp nhé/}).click();
  await p.getByRole('button',{name:'Để em nghĩ một chút'}).click();
  await p.getByText(/Anh đợi được mà/).waitFor();
  await p.getByRole('button',{name:/Có, tất nhiên rồi/}).click();
  await p.getByRole('button',{name:/Chạm vào trái tim anh/}).click();
}
try {
  for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
    const p=await setup(viewport);await p.screenshot({path:`test-results/${name}-intro.png`,fullPage:true});
    p.on('console',msg=>{if(msg.type()==='error')consoleErrors.push(msg.text());});
    assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'No horizontal overflow');
    await reachHeart(p);
    await p.waitForFunction(()=>!!document.querySelector('canvas')?.dataset.rotationStarted);
    const samples=await p.evaluate(()=>new Promise(resolve=>{const results=[];const started=performance.now();function sample(){const c=document.querySelector('canvas');if(!c){resolve(results);return;}results.push({time:performance.now(),y:Number(c.dataset.rotationY||0),x:Number(c.dataset.rotationX||0),z:Number(c.dataset.rotationZ||0),videoVisible:!!document.querySelector('video')});if(performance.now()-started<10300)requestAnimationFrame(sample);else resolve(results);}sample();}));
    const first=samples.find(s=>s.y>0),last=samples.at(-1);
    assert.ok(samples.length>30,'Animation renders repeatedly');
    assert.ok(Math.abs(last.y-10*Math.PI)<1e-9,'Stops exactly at 10π');
    const elapsed=await p.locator('canvas').evaluate(c=>Number(c.dataset.rotationCompleted)-Number(c.dataset.rotationStarted));
    assert.ok(Math.abs(elapsed-10000)<500,`Rotation takes ten seconds: ${elapsed}`);
    assert.ok(samples.every((s,i)=>!i||s.y>=samples[i-1].y),'Never reverses');
    assert.ok(samples.every(s=>s.x===0&&s.z===0),'Never rotates around X or Z');
    assert.ok(samples.every(s=>!s.videoVisible),'No video appears at any sampled point during rotation');
    assert.equal(await p.locator('video').count(),0,'Video is not mounted during rotation or initial dissolve');
    const rates=samples.filter(s=>s.y>1&&s.y<29);
    const speed=(rates.at(-1).y-rates[0].y)/((rates.at(-1).time-rates[0].time)/1000);
    assert.ok(Math.abs(speed-Math.PI)<.2,`Constant rotation speed: ${speed}`);
    await p.locator('video').waitFor({timeout:10000});
    await p.waitForFunction(()=>document.querySelector('video')?.readyState>=2);
    const play=p.getByRole('button',{name:'❤️ Nhấn để xem điều bất ngờ'});
    if(await play.isVisible())await play.click();
    await p.waitForFunction(()=>!document.querySelector('video').paused);
    assert.ok(await p.locator('video').evaluate(v=>v.videoWidth>0&&v.videoHeight>0));
    await p.getByRole('button',{name:'Tắt âm thanh',exact:true}).click();assert.equal(await p.locator('video').evaluate(v=>v.muted),true);
    await p.getByRole('button',{name:'Bật âm thanh',exact:true}).click();
    assert.equal(await p.locator('video').evaluate(v=>v.muted),false,'Sound unmutes');
    await p.locator('video').evaluate(v=>{v.muted=true;});
    await p.getByRole('button',{name:'Bật âm thanh',exact:true}).waitFor();
    await p.getByRole('button',{name:'Bật âm thanh',exact:true}).click();
    await p.getByRole('button',{name:'Phát lại video',exact:true}).click();
    assert.ok(await p.locator('video').evaluate(v=>v.currentTime<2));
    await p.getByRole('button',{name:'Toàn màn hình',exact:true}).click();
    if(await p.evaluate(()=>!!document.fullscreenElement))await p.evaluate(()=>document.exitFullscreen());
    await p.screenshot({path:`test-results/${name}-video.png`,fullPage:true});
    await p.getByRole('button',{name:/Mở lại món quà từ đầu/}).click();
    await p.getByRole('heading',{name:/Có một món quà/}).waitFor();
    console.log(`${name}: full flow, 5 turns, linear speed ${speed.toFixed(3)} rad/s, video, sound and replay PASS (${Math.round(last.time-first.time)} ms observed)`);
    results.push({name,viewport,rotationY:last.y,rotationX:last.x,rotationZ:last.z,durationMs:elapsed,speedRadPerSecond:speed});
    await p.close();
  }
  const fallback=await setup({width:390,height:844});
  await fallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl'||type==='webgl2')return null;return original.call(this,type,...args);};});
  await fallback.reload();await reachHeart(fallback);
  await fallback.getByText(/Thiết bị này chưa hỗ trợ/).waitFor();
  await fallback.route('**/videos/love.mp4',route=>route.fulfill({status:404,body:''}));
  await fallback.getByRole('button',{name:'Xem điều bất ngờ ❤️',exact:true}).click();
  await fallback.getByText('Món quà đang chờ video của em').waitFor();
  await fallback.getByRole('button',{name:/Mở lại món quà từ đầu/}).click();
  console.log('WebGL fallback and missing video recovery PASS');
  await fallback.unroute('**/videos/love.mp4');
  await fallback.addInitScript(()=>{const original=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){if(!window.allowVideoPlay)return Promise.reject(new DOMException('Autoplay blocked','NotAllowedError'));return original.call(this);};});
  await fallback.reload();await reachHeart(fallback);
  await fallback.getByRole('button',{name:'Xem điều bất ngờ ❤️',exact:true}).click();
  await fallback.getByRole('button',{name:'❤️ Nhấn để xem điều bất ngờ',exact:true}).waitFor();
  await fallback.evaluate(()=>window.allowVideoPlay=true);
  await fallback.getByRole('button',{name:'❤️ Nhấn để xem điều bất ngờ',exact:true}).click();
  await fallback.waitForFunction(()=>!document.querySelector('video').paused);
  console.log('Blocked autoplay with explicit play button PASS');
  for(const width of [320,375,430,768]){
    const p=await setup({width,height:900});
    await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(750);
    assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`No overflow at ${width}px`);
    const button=p.getByRole('button',{name:'Mở quà của em',exact:true});assert.ok(await button.isVisible());
    await p.screenshot({path:`test-results/responsive-${width}.png`,fullPage:true});await p.close();
  }
  assert.deepEqual(consoleErrors,[],'No console errors during normal experience');
  assert.deepEqual(errors,[],'No browser runtime errors');
  await writeFile('test-results/final-audit.json',JSON.stringify({baseURL,results,warnings:[...warnings],consoleErrors,runtimeErrors:errors,responsiveWidths:[320,375,390,430,768,1440],autoplayFallback:true,webGLFallback:true,missingVideoFallback:true},null,2));
  console.log('Responsive checks and console audit PASS. Report: test-results/final-audit.json');
}finally{await browser.close();}

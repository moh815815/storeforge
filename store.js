
/* StoreForge — Auto-generated 6‏/5‏/2026 */
var cart = JSON.parse(localStorage.getItem('sf_cart')||'[]');

function addToCart(name,price,cat){
  var item=cart.find(function(i){return i.name===name});
  if(item) item.qty++; else cart.push({name:name,price:+price,qty:1,cat:cat||'all'});
  localStorage.setItem('sf_cart',JSON.stringify(cart));
  updateCartUI();
  notify('✅ أُضيف: '+name);
}

function removeFromCart(name){
  cart=cart.filter(function(i){return i.name!==name});
  localStorage.setItem('sf_cart',JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI(){
  var count=cart.reduce(function(s,i){return s+i.qty},0);
  var sub=cart.reduce(function(s,i){return s+i.price*i.qty},0);
  var badge=document.getElementById('cartBadge');
  if(badge) badge.textContent=count;
  var ci=document.getElementById('cartItems');
  var ce=document.getElementById('cartEmpty');
  var cs=document.getElementById('cartSummary');
  var ct=document.getElementById('cartTotal');
  if(!ci) return;
  if(count===0){ci.innerHTML='';if(ce)ce.style.display='block';if(cs)cs.style.display='none';return;}
  if(ce)ce.style.display='none';
  if(cs){cs.style.display='block';if(ct)ct.textContent=(sub+35)+' ج.م';}
  ci.innerHTML=cart.map(function(i){return '<div style="display:flex;gap:10px;padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:13px;align-items:center"><div style="font-size:22px">🛍️</div><div style="flex:1"><div style="font-weight:600">'+i.name+'</div><div style="color:#888;font-size:11px">× '+i.qty+'</div></div><div style="color:#7c6bff;font-weight:700">'+(i.price*i.qty)+' ج.م</div><button onclick="removeFromCart(''+i.name+'')" style="background:none;border:none;color:#ff5f87;cursor:pointer">✕</button></div>';}).join('');
}

function filterProducts(cat,btn){
  document.querySelectorAll('.cat-filter-btn').forEach(function(b){b.style.background='#f5f5f5';b.style.color='#555';});
  btn.style.background='#7c6bff';btn.style.color='#fff';
  document.querySelectorAll('[data-cat]').forEach(function(el){el.style.display=(cat==='all'||el.getAttribute('data-cat')===cat)?'block':'none';});
}

function toggleCartDrawer(){var d=document.getElementById('cartDrawer');if(d)d.style.display=d.style.display==='none'?'block':'none';updateCartUI();}
function goCheckout(){window.location.href='checkout.html';}
function openWA(e){e.preventDefault();window.open('https://wa.me/201234567890?text='+encodeURIComponent('مرحباً، أريد الاستفسار عن...'),'_blank');}

function notify(msg){
  var d=document.createElement('div');
  d.textContent=msg;
  d.style.cssText='position:fixed;top:70px;left:50%;transform:translateX(-50%);background:#7c6bff;color:#fff;padding:10px 20px;border-radius:25px;z-index:9999;font-family:Cairo,sans-serif;font-size:13px;font-weight:600';
  document.body.appendChild(d);setTimeout(function(){d.remove()},2500);
}

// Countdown
(function(){
  var tgt=Date.now()+24*3600*1000;
  function tick(){
    var diff=tgt-Date.now();if(diff<=0)return;
    var h=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    var m=Math.floor((diff%(1000*60*60))/(1000*60));
    var s=Math.floor((diff%(1000*60))/1000);
    var p=function(v){return String(v).padStart(2,'0')};
    [['#ct-h',h],['#ct-m',m],['#ct-s',s]].forEach(function(pair){var el=document.querySelector(pair[0]);if(el)el.textContent=p(pair[1]);});
    document.querySelectorAll('.cd-h').forEach(function(el){el.textContent=p(h)});
    document.querySelectorAll('.cd-m').forEach(function(el){el.textContent=p(m)});
    document.querySelectorAll('.cd-s').forEach(function(el){el.textContent=p(s)});
  }
  setInterval(tick,1000);tick();
})();

updateCartUI();

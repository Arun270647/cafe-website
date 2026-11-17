const cart = [];
const drawer = document.getElementById('cartDrawer');
const count = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const total = document.getElementById('cartTotal');
const toast = document.getElementById('toast');
function money(n){return '₹'+n.toLocaleString('en-IN')}
function renderCart(){
  count.textContent = cart.reduce((s,x)=>s+x.qty,0);
  const sum = cart.reduce((s,x)=>s+x.price*x.qty,0);
  total.textContent = money(sum);
  if(!cart.length){cartItems.innerHTML='<p class="empty-cart">Your cart is taking a little nap.</p>';return;}
  cartItems.innerHTML = cart.map((x,i)=>`<div class="cart-row"><div><strong>${x.name}</strong><br><small>${money(x.price)} × ${x.qty}</small></div><div>${money(x.price*x.qty)} <button data-remove="${i}" aria-label="Remove ${x.name}">×</button></div></div>`).join('');
}
document.querySelectorAll('.quick-add').forEach(btn=>btn.addEventListener('click',()=>{
  const name=btn.dataset.name, price=Number(btn.dataset.price);
  const found=cart.find(x=>x.name===name);
  if(found) found.qty++; else cart.push({name,price,qty:1});
  renderCart(); toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),1500);
}));
cartItems.addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(b){cart.splice(Number(b.dataset.remove),1);renderCart();}});
function openCart(){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');}
function closeCart(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');}
document.getElementById('cartOpen').addEventListener('click',openCart);
document.getElementById('cartClose').addEventListener('click',closeCart);
drawer.addEventListener('click',e=>{if(e.target===drawer)closeCart();});
document.getElementById('checkoutBtn').addEventListener('click',()=>{alert(cart.length?'Demo checkout: connect a payment gateway and order backend to accept payments.':'Your cart is empty. Add something delicious first.');});
const toggle=document.querySelector('.menu-toggle'), nav=document.querySelector('.nav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
renderCart();

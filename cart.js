/* ── Couleur du Temps — Cart Manager ── */
const CART_KEY = 'cdt_cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateBadge();
}

function addToCart(titre, prix) {
  const cart = getCart();
  const existing = cart.find(item => item.titre === titre);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ titre, prix: parseFloat(prix), qty: 1 });
  }
  saveCart(cart);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function updateCartQty(index, delta) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qty = Math.max(1, cart[index].qty + delta);
  saveCart(cart);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateBadge() {
  const count = getCartCount();
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  if (count === 0) {
    badge.textContent = '🛒 Panier';
  } else if (count === 1) {
    badge.textContent = '🛒 1 article';
  } else {
    badge.textContent = '🛒 ' + count + ' articles';
  }
}

function showNotification(titre) {
  let notif = document.getElementById('cdt-cart-notif');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'cdt-cart-notif';
    notif.style.cssText = [
      'position:fixed', 'top:1.2rem', 'right:1.2rem', 'z-index:9999',
      'background:#1a1a1a', 'color:#fff',
      'padding:0.75rem 1.25rem',
      'font-family:"Source Sans 3",sans-serif',
      'font-size:0.88rem', 'line-height:1.5',
      'max-width:300px',
      'box-shadow:0 4px 16px rgba(0,0,0,0.18)',
      'opacity:0', 'transform:translateY(-8px)',
      'transition:opacity 0.22s ease, transform 0.22s ease',
      'pointer-events:none'
    ].join(';');
    document.body.appendChild(notif);
  }
  const short = titre.length > 40 ? titre.slice(0, 40) + '…' : titre;
  notif.innerHTML = '&#10003; &nbsp;<strong>' + short + '</strong><br>ajouté au panier';
  notif.style.opacity = '1';
  notif.style.transform = 'translateY(0)';
  clearTimeout(notif._t);
  notif._t = setTimeout(() => {
    notif.style.opacity = '0';
    notif.style.transform = 'translateY(-8px)';
  }, 2400);
}

document.addEventListener('DOMContentLoaded', () => {
  updateBadge();
  document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      addToCart(btn.dataset.titre, btn.dataset.prix);
      showNotification(btn.dataset.titre);
    });
  });
});

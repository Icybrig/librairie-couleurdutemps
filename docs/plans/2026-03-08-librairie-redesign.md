# Librairie Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the book showcase site to visually match librairie-couleurdutemps.com — neutral palette, horizontal nav, product grid with Acheter buttons, 4-column footer.

**Architecture:** Pure static HTML + CSS, no build tools. Rewrite styles.css with a new design system, then rewrite index.html and all 8 detail pages to use the new layout. No JS required.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), Google Fonts (Playfair Display + Source Sans 3)

---

### Task 1: Rewrite styles.css

**Files:**
- Modify: `styles.css`

**Step 1: Replace entire file with new design system**

```css
/* ===== DESIGN TOKENS ===== */
:root {
  --white: #ffffff;
  --gray-light: #ededed;
  --gray-mid: #d0d0d0;
  --gray-dark: #6b6b6b;
  --ink: #1a1a1a;
  --accent: #1a1a1a;
  --max-w: 1290px;
  --font-serif: "Playfair Display", serif;
  --font-sans: "Source Sans 3", sans-serif;
}

/* ===== RESET ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-sans);
  background: var(--white);
  color: var(--ink);
  font-size: 0.95rem;
  line-height: 1.6;
}

a { color: inherit; text-decoration: none; }

img { display: block; width: 100%; object-fit: cover; }

/* ===== WRAPPER ===== */
.wrapper {
  width: min(var(--max-w), 94vw);
  margin: 0 auto;
}

/* ===== TOP BAR ===== */
.top-bar {
  border-bottom: 1px solid var(--gray-mid);
  padding: 0.7rem 0;
}
.top-bar .wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.top-bar .site-name {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.top-bar .top-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.88rem;
  color: var(--gray-dark);
}
.top-bar .cart {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

/* ===== NAV ===== */
.site-nav {
  background: var(--gray-light);
  border-bottom: 1px solid var(--gray-mid);
}
.site-nav .wrapper {
  display: flex;
  align-items: center;
  overflow-x: auto;
  gap: 0;
}
.site-nav a {
  display: block;
  padding: 0.75rem 1.1rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
  color: var(--ink);
  border-right: 1px solid var(--gray-mid);
  transition: background 0.2s;
}
.site-nav a:first-child { border-left: 1px solid var(--gray-mid); }
.site-nav a:hover { background: var(--gray-mid); }

/* ===== HERO ===== */
.hero {
  background: var(--gray-light);
  padding: 2.5rem 0;
  text-align: center;
  border-bottom: 1px solid var(--gray-mid);
}
.hero h1 {
  font-family: var(--font-serif);
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* ===== PRODUCT GRID ===== */
.collection-section {
  padding: 2.5rem 0 4rem;
}
.collection-section h2 {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--gray-mid);
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.product-card {
  border: 1px solid var(--gray-mid);
  background: var(--white);
  display: flex;
  flex-direction: column;
}
.product-card .cover {
  aspect-ratio: 3/4;
  background: var(--gray-light);
  overflow: hidden;
}
.product-card .cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.product-card:hover .cover img {
  transform: scale(1.03);
}
.product-card .card-info {
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}
.product-card .card-title {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.3;
}
.product-card .card-author {
  font-size: 0.85rem;
  color: var(--gray-dark);
}
.product-card .card-price {
  font-size: 1rem;
  font-weight: 600;
  margin-top: auto;
  padding-top: 0.5rem;
}
.product-card .btn-acheter {
  display: block;
  background: var(--ink);
  color: var(--white);
  text-align: center;
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0.9rem;
  margin-top: 0;
  cursor: default;
  transition: background 0.2s;
}
.product-card .btn-acheter:hover { background: #333; }

/* ===== DETAIL PAGE ===== */
.detail-section {
  padding: 2.5rem 0 4rem;
}
.detail-layout {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 3rem;
  align-items: start;
}
.detail-cover {
  border: 1px solid var(--gray-mid);
  aspect-ratio: 3/4;
  overflow: hidden;
}
.detail-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.detail-cover.placeholder {
  background: var(--gray-light);
}
.detail-info { display: grid; gap: 1.5rem; }
.detail-info h1 {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 600;
}
.detail-info .author {
  font-size: 1rem;
  color: var(--gray-dark);
}
.detail-info .price {
  font-size: 1.5rem;
  font-weight: 600;
}
.btn-acheter-lg {
  display: inline-block;
  background: var(--ink);
  color: var(--white);
  padding: 0.85rem 2.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: default;
  transition: background 0.2s;
}
.btn-acheter-lg:hover { background: #333; }
.detail-description {
  border-top: 1px solid var(--gray-mid);
  padding-top: 1.2rem;
}
.detail-description h2 {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
}
.detail-description p {
  color: var(--gray-dark);
  line-height: 1.8;
}
.back-link {
  display: inline-block;
  font-size: 0.85rem;
  color: var(--gray-dark);
  text-decoration: underline;
  margin-bottom: 1.5rem;
}
.back-link:hover { color: var(--ink); }

/* ===== FOOTER ===== */
.site-footer {
  background: var(--gray-light);
  border-top: 1px solid var(--gray-mid);
  padding: 2.5rem 0;
  margin-top: 2rem;
}
.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}
.footer-col h3 {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.footer-col ul {
  list-style: none;
  display: grid;
  gap: 0.5rem;
}
.footer-col ul li,
.footer-col p {
  font-size: 0.88rem;
  color: var(--gray-dark);
  line-height: 1.6;
}
.footer-bottom {
  border-top: 1px solid var(--gray-mid);
  margin-top: 2rem;
  padding-top: 1rem;
  text-align: center;
  font-size: 0.82rem;
  color: var(--gray-dark);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-grid { grid-template-columns: repeat(2, 1fr); }
  .detail-layout { grid-template-columns: 1fr; }
  .detail-cover { max-width: 340px; }
}
@media (max-width: 560px) {
  .product-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
  .top-bar .site-name { font-size: 1rem; }
}
```

**Step 2: Verify** — open index.html in browser, confirm no style errors.

**Step 3: Commit**
```bash
git add styles.css
git commit -m "style: complete redesign matching librairie-couleurdutemps.com"
```

---

### Task 2: Rewrite index.html

**Files:**
- Modify: `index.html`

**Step 1: Replace entire file**

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Couleur du Temps | Livres d'Art</title>
    <link rel="stylesheet" href="./styles.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet" />
  </head>
  <body>

    <!-- TOP BAR -->
    <header class="top-bar">
      <div class="wrapper">
        <span class="site-name">Couleur du Temps</span>
        <div class="top-actions">
          <span>Compte</span>
          <span class="cart">🛒 0,00 EUR</span>
        </div>
      </div>
    </header>

    <!-- NAV -->
    <nav class="site-nav">
      <div class="wrapper">
        <a href="#">Culture Jidong</a>
        <a href="#">Art &amp; Photographie</a>
        <a href="#">Architecture</a>
        <a href="#">Essais</a>
        <a href="#">Carnets illustrés</a>
        <a href="#">Correspondances</a>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero">
      <div class="wrapper">
        <h1>Découvrez notre sélection de livres d'art</h1>
      </div>
    </section>

    <!-- BOOK GRID -->
    <main class="collection-section">
      <div class="wrapper">
        <h2>Book Collection</h2>
        <div class="product-grid">

          <div class="product-card">
            <a href="./book-aube.html">
              <div class="cover">
                <img src="./cover-aube.png" alt="L'Aube des Idées" />
              </div>
            </a>
            <div class="card-info">
              <p class="card-title">L'Aube des Idées</p>
              <p class="card-author">Auteur à définir</p>
              <p class="card-price">45,00 EUR</p>
            </div>
            <span class="btn-acheter">Acheter</span>
          </div>

          <div class="product-card">
            <a href="./book-brise.html">
              <div class="cover cover-placeholder" style="background:linear-gradient(135deg,#9bc9c0,#3d6d66);aspect-ratio:3/4;"></div>
            </a>
            <div class="card-info">
              <p class="card-title">La Brise d'Argile</p>
              <p class="card-author">Auteur à définir</p>
              <p class="card-price">45,00 EUR</p>
            </div>
            <span class="btn-acheter">Acheter</span>
          </div>

          <div class="product-card">
            <a href="./book-constellations.html">
              <div class="cover cover-placeholder" style="background:linear-gradient(135deg,#b7b7e1,#54547a);aspect-ratio:3/4;"></div>
            </a>
            <div class="card-info">
              <p class="card-title">Constellations Intérieures</p>
              <p class="card-author">Auteur à définir</p>
              <p class="card-price">45,00 EUR</p>
            </div>
            <span class="btn-acheter">Acheter</span>
          </div>

          <div class="product-card">
            <a href="./book-escale.html">
              <div class="cover cover-placeholder" style="background:linear-gradient(135deg,#a0b8e0,#37558f);aspect-ratio:3/4;"></div>
            </a>
            <div class="card-info">
              <p class="card-title">Escale Indigo</p>
              <p class="card-author">Auteur à définir</p>
              <p class="card-price">45,00 EUR</p>
            </div>
            <span class="btn-acheter">Acheter</span>
          </div>

          <div class="product-card">
            <a href="./book-jardin.html">
              <div class="cover cover-placeholder" style="background:linear-gradient(135deg,#c6d7a4,#6a7b3d);aspect-ratio:3/4;"></div>
            </a>
            <div class="card-info">
              <p class="card-title">Le Jardin des Encres</p>
              <p class="card-author">Auteur à définir</p>
              <p class="card-price">45,00 EUR</p>
            </div>
            <span class="btn-acheter">Acheter</span>
          </div>

          <div class="product-card">
            <a href="./book-vela.html">
              <div class="cover cover-placeholder" style="background:linear-gradient(135deg,#f0d3c2,#91514d);aspect-ratio:3/4;"></div>
            </a>
            <div class="card-info">
              <p class="card-title">Vela, carnet des marées</p>
              <p class="card-author">Auteur à définir</p>
              <p class="card-price">45,00 EUR</p>
            </div>
            <span class="btn-acheter">Acheter</span>
          </div>

          <div class="product-card">
            <a href="./book-secret.html">
              <div class="cover cover-placeholder" style="background:linear-gradient(135deg,#f0c5d6,#8c4a6a);aspect-ratio:3/4;"></div>
            </a>
            <div class="card-info">
              <p class="card-title">Le Secret des Ateliers</p>
              <p class="card-author">Auteur à définir</p>
              <p class="card-price">45,00 EUR</p>
            </div>
            <span class="btn-acheter">Acheter</span>
          </div>

        </div>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="site-footer">
      <div class="wrapper">
        <div class="footer-grid">
          <div class="footer-col">
            <h3>Informations</h3>
            <ul>
              <li>Conditions générales</li>
              <li>Politique de confidentialité</li>
              <li>Modes de paiement</li>
              <li>Livraison</li>
            </ul>
          </div>
          <div class="footer-col">
            <h3>Contact</h3>
            <p>Sur rendez-vous uniquement.<br />bonjour@couleurdutemps.fr</p>
          </div>
          <div class="footer-col">
            <h3>Notre Librairie</h3>
            <ul>
              <li>À propos</li>
              <li>Actualités</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div class="footer-col">
            <h3>Nous Rendre Visite</h3>
            <p>24 rue Dauphine<br />75006 Paris, France</p>
          </div>
        </div>
        <div class="footer-bottom">© 2026 Couleur du Temps — Tous droits réservés</div>
      </div>
    </footer>

  </body>
</html>
```

**Step 2: Commit**
```bash
git add index.html
git commit -m "feat: redesign index page — new header, nav, hero, product grid, footer"
```

---

### Task 3: Rewrite book-aube.html (detail page template)

**Files:**
- Modify: `book-aube.html`

**Step 1: Replace file**

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>L'Aube des Idées | Couleur du Temps</title>
    <link rel="stylesheet" href="./styles.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet" />
  </head>
  <body>

    <header class="top-bar">
      <div class="wrapper">
        <a href="./index.html" class="site-name">Couleur du Temps</a>
        <div class="top-actions">
          <span>Compte</span>
          <span class="cart">🛒 0,00 EUR</span>
        </div>
      </div>
    </header>

    <nav class="site-nav">
      <div class="wrapper">
        <a href="./index.html">Culture Jidong</a>
        <a href="./index.html">Art &amp; Photographie</a>
        <a href="./index.html">Architecture</a>
        <a href="./index.html">Essais</a>
        <a href="./index.html">Carnets illustrés</a>
        <a href="./index.html">Correspondances</a>
      </div>
    </nav>

    <main class="detail-section">
      <div class="wrapper">
        <a href="./index.html" class="back-link">← Retour à la collection</a>
        <div class="detail-layout">
          <div class="detail-cover">
            <img src="./cover-aube.png" alt="L'Aube des Idées" />
          </div>
          <div class="detail-info">
            <h1>L'Aube des Idées</h1>
            <p class="author">Auteur à définir</p>
            <p class="price">45,00 EUR</p>
            <span class="btn-acheter-lg">Acheter</span>
            <div class="detail-description">
              <h2>À propos du livre</h2>
              <p>Cet ouvrage présente de manière détaillée et rigoureuse les différentes caractéristiques culturelles de la région de Jidong. Pour ce qui est de l'originalité, l'ouvrage sort des sentiers battus, emploie une nouvelle méthode. Accompagné de nombreuses photos et rédigé dans une langue belle et vivante, ce livre est un ouvrage rare et important qui permet aux lecteurs d'avoir une compréhension globale de la culture Jidong.</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="site-footer">
      <div class="wrapper">
        <div class="footer-grid">
          <div class="footer-col">
            <h3>Informations</h3>
            <ul><li>Conditions générales</li><li>Politique de confidentialité</li><li>Modes de paiement</li><li>Livraison</li></ul>
          </div>
          <div class="footer-col">
            <h3>Contact</h3>
            <p>Sur rendez-vous uniquement.<br />bonjour@couleurdutemps.fr</p>
          </div>
          <div class="footer-col">
            <h3>Notre Librairie</h3>
            <ul><li>À propos</li><li>Actualités</li><li>FAQ</li></ul>
          </div>
          <div class="footer-col">
            <h3>Nous Rendre Visite</h3>
            <p>24 rue Dauphine<br />75006 Paris, France</p>
          </div>
        </div>
        <div class="footer-bottom">© 2026 Couleur du Temps — Tous droits réservés</div>
      </div>
    </footer>

  </body>
</html>
```

**Step 2: Commit**
```bash
git add book-aube.html
git commit -m "feat: redesign book-aube detail page"
```

---

### Task 4: Rewrite remaining 6 detail pages

**Files:** `book-brise.html`, `book-constellations.html`, `book-escale.html`, `book-jardin.html`, `book-vela.html`, `book-secret.html`

Apply the same structure as book-aube.html for each, changing:
- `<title>` — book title
- `<h1>` — book title
- Cover: use gradient placeholder div (no img tag) since images not yet available
- Description: keep existing French text from each file

Each book's placeholder cover div:
```html
<div class="detail-cover placeholder" style="background: LINEAR_GRADIENT;"></div>
```

Gradients per book:
- brise: `linear-gradient(135deg,#9bc9c0,#3d6d66)`
- constellations: `linear-gradient(135deg,#b7b7e1,#54547a)`
- escale: `linear-gradient(135deg,#a0b8e0,#37558f)`
- jardin: `linear-gradient(135deg,#c6d7a4,#6a7b3d)`
- vela: `linear-gradient(135deg,#f0d3c2,#91514d)`
- secret: `linear-gradient(135deg,#f0c5d6,#8c4a6a)`

**Step 1: Rewrite each file following the template above**

**Step 2: Commit**
```bash
git add book-brise.html book-constellations.html book-escale.html book-jardin.html book-vela.html book-secret.html
git commit -m "feat: redesign all remaining book detail pages"
```

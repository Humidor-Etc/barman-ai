# 🌿 Pantry AI — PWA Android

App mobile de recettes intelligentes basée sur tes ingrédients disponibles.

---

## 🚀 Démarrage rapide

### Prérequis
- **Node.js 18+** — https://nodejs.org
- **npm** inclus avec Node.js
- Compte **Vercel** gratuit — https://vercel.com
- Compte **GitHub** gratuit — https://github.com

---

## 📦 Installation locale

```bash
# 1. Ouvre un terminal dans le dossier pantry-ai
cd pantry-ai

# 2. Installe les dépendances
npm install

# 3. Lance en mode développement
npm run dev

# → Ouvre http://localhost:5173 dans ton navigateur
```

---

## 📱 Tester sur ton Android (même réseau Wi-Fi)

```bash
# Lance avec l'IP de ta machine visible sur le réseau
npm run dev -- --host

# Tu verras quelque chose comme:
#   Local:   http://localhost:5173/
#   Network: http://192.168.1.42:5173/   ← tape cette URL sur ton Android
```

Sur Android :
1. Ouvre Chrome → tape l'URL réseau
2. Menu (⋮) → **"Ajouter à l'écran d'accueil"**
3. L'app apparaît comme une vraie app!

---

## 🌐 Déploiement sur Vercel (gratuit, HTTPS, installable)

### Option A — Interface web (le plus simple)

1. **Build le projet :**
   ```bash
   npm run build
   ```

2. **Va sur vercel.com** → Sign up gratuit

3. **Drag & drop** le dossier `dist/` directement sur vercel.com/new

4. Vercel te donne une URL `https://pantry-ai-xxx.vercel.app`

5. **Sur ton Android :** ouvre l'URL dans Chrome → Menu ⋮ → "Ajouter à l'écran d'accueil"

### Option B — GitHub + déploiement auto

```bash
# Initialise Git
git init
git add .
git commit -m "Initial commit — Pantry AI PWA"

# Crée un repo sur github.com puis:
git remote add origin https://github.com/TON_USERNAME/pantry-ai.git
git push -u origin main
```

Sur vercel.com → "Import Git Repository" → sélectionne ton repo → Deploy

Chaque `git push` redéploie automatiquement. ✨

---

## 🎨 Générer les icônes (obligatoire pour le PWA)

1. Ouvre `public/icons/generate-icons.html` dans un navigateur
2. Clique les deux liens de téléchargement
3. Place `icon-192.png` et `icon-512.png` dans `public/icons/`

---

## 🔑 Note sur la clé API

L'app utilise l'API Anthropic directement depuis le navigateur.
Pour la production, il est recommandé de créer un petit backend proxy
pour protéger ta clé API. Mais pour tester et valider l'idée, ça fonctionne tel quel.

**Pour un vrai backend proxy (optionnel) :**
- Crée une Vercel Function dans `/api/chat.js`
- Mets ta clé dans les variables d'environnement Vercel
- Change les fetch dans `useStore.js` pour pointer vers `/api/chat`

---

## 📁 Structure du projet

```
pantry-ai/
├── public/
│   └── icons/           ← Icônes PWA (à générer)
├── src/
│   ├── components/
│   │   ├── Header.jsx      ← En-tête + toggle FR/EN
│   │   ├── BottomNav.jsx   ← Navigation bas d'écran
│   │   ├── RecipeCard.jsx  ← Carte recette expandable + favoris
│   │   └── SlotModal.jsx   ← Modal multi-photos par compartiment
│   ├── pages/
│   │   ├── ScanPage.jsx    ← Scanner photos + saisie manuelle
│   │   ├── RecipesPage.jsx ← Liste des recettes générées
│   │   └── FavsPage.jsx    ← Recettes sauvegardées
│   ├── App.jsx             ← Composant racine
│   ├── useStore.js         ← État global + appels API
│   ├── i18n.js             ← Traductions FR/EN
│   ├── index.css           ← Styles globaux mobile-first
│   └── main.jsx            ← Point d'entrée React
├── index.html
├── vite.config.js          ← Config Vite + PWA plugin
├── vercel.json             ← Config déploiement Vercel
└── package.json
```

---

## ✨ Fonctionnalités

- 📷 **Multi-photos par compartiment** — Frigo, Garde-manger, Congélateur, etc.
- 🤖 **IA Claude** — Détection d'ingrédients + génération de recettes
- ⚡ **Recettes rapides** — Filtrées à 30 min max
- 🌿 **Régimes alimentaires** — Végétarien, sans gluten, etc.
- ❤️ **Favoris persistants** — Sauvegardés localement
- 🇫🇷🇬🇧 **Bilingue FR/EN** — Toggle instantané
- 📱 **PWA Android** — Installable, plein écran, icône sur l'accueil

---

## 🛠 Prochaines étapes suggérées

- [ ] Backend proxy pour sécuriser la clé API
- [ ] Compte utilisateur + sync cloud (Supabase)
- [ ] Historique du garde-manger
- [ ] Liste de courses auto-générée
- [ ] Notifications "X expire bientôt"
- [ ] Publication Play Store via Bubblewrap

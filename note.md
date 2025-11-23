Jour1;
✔️ 1. Installation & Setup général
1.1 – Installation de Node.js

Obligatoire pour npm / Bolt / Continue.
Vérification :

node -v
npm -v


Si npm ne fonctionne pas → changer la politique PowerShell :

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

✔️ 2. Setup de BOLT.DIY (version locale)
2.1 – Cloner Bolt.diy

Fichiers récupérés depuis GitHub.

2.2 – Installer les dépendances

Depuis le dossier du projet :

npm install

2.3 – Lancer le serveur de dev
npm run dev


Bolt tourne sur :

http://localhost:5173


⚠️ Plusieurs erreurs venaient de dépendances manquantes ou du fait que npm n’était pas installé correctement.

✔️ 3. Setup OLLAMA
3.1 – Installer Ollama

Logiciel pour exécuter des modèles IA localement.

3.2 – Télécharger des modèles

Exemples :

ollama pull deepseek-coder:6.7b
ollama pull gemma:4b

3.3 – Vérifier les modèles
ollama list


Résultat attendu :

deepseek-coder:6.7b

gemma:4b

3.4 – Vérifier qu’Ollama tourne

Dans un navigateur :

http://127.0.0.1:11434

✔️ 4. Connexion Bolt → Ollama

Dans Bolt, créer .env.local à la racine et ajouter :

OLLAMA_BASE_URL=http://127.0.0.1:11434


Bolt détecte les modèles automatiquement, même si d’autres providers sont en erreur (OpenAI, Anthropic etc. → normal si pas de clé).

✔️ 5. Setup de CONTINUE (l’extension VS Code)
5.1 – Ouvrir la config

VS Code → Continue → Configs → Local Config

5.2 – Créer le fichier

Créer :

~/.continue/config.yaml

5.3 – Contenu correct (YAML propre)
name: Local Config
version: 1.0.0
schema: v1

models:
  - title: "DeepSeek Coder (Ollama)"
    provider: "ollama"
    model: "deepseek-coder:6.7b"
    apiBase: "http://127.0.0.1:11434"
    maxTokens: 2000


Beaucoup d’erreurs venaient de mauvaise indentation YAML ou de mauvais placements.

✔️ 6. Création du projet SITE WEB ULTRA-LUXE
6.1 – Structure propre du dossier
site1/
 ├── index.html
 ├── theme-config.json
 ├── css/
 │    └── styles.css
 ├── js/
 │    └── main.js
 └── img/
      └── hero.jpg   (ton image doit être ici)

6.2 – Problème rencontré :

Le site apparaissait tout moche → style Word 2003.
CAUSE :

le fichier CSS n’était pas trouvé

le dossier img n’existait pas → gros carré gris

6.3 – Solution

créer le dossier css/ → mettre styles.css

créer le dossier img/ → mettre hero.jpg

vérifier l’appel du CSS dans index.html :

<link rel="stylesheet" href="css/styles.css">


recharger avec Ctrl + F5

✔️ 7. Code pour le site – Version propre
7.1 – index.html

Contient : header, hero, sections, footer.

7.2 – styles.css

Ajouté :

header sticky

hero luxe avec overlay

boutons or, premium

palette : noir profond (#0b0b0b), beige, or (#d4af37)

mise en page luxe inspirée marques premium

7.3 – main.js

Pour l’instant minimal :

console.log("Chaise & Co loaded");

7.4 – theme-config.json

Palette & réglages modifiables.

✔️ 8. Après résolution → site affiché correctement

Une fois :

l’image hero.jpg en place

le bon styles.css mis

l’arborescence fixée

➡️ le site affiche enfin :

header aligné

hero avec image

overlay noir

boutons premium

footer propre

✔️ 9. Ce qu’on fera ensuite (quand tu veux)

refaire la page produit luxe

ajouter carrousels, animations, parallax

créer un lookbook

faire le système “sur mesure”

générer grid produit + fiches

ajouter un mini-panier

préparer version déployable Netlify / Vercel

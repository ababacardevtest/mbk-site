# Keer Maam Birabar – site web

Next.js 14 (App Router, TypeScript/TSX) + Tailwind CSS. Réservation par WhatsApp. Espace gérante sur `/admin`.

## Lancer en local
```bash
npm install
cp .env.example .env.local   # puis choisir ADMIN_PASSWORD
npm run dev                  # http://localhost:3000
```
En local, le contenu est enregistré dans `data/content.json` et les photos dans `data/uploads/`.

## Mettre en ligne (Vercel, recommandé)
1. Envoyer le projet sur GitHub, puis l'importer dans Vercel.
2. Variables d'environnement : `ADMIN_PASSWORD`.
3. Onglet *Storage* → créer un **Blob store** et le connecter au projet (ajoute `BLOB_READ_WRITE_TOKEN`).
   Sans cela, les modifications ne seraient pas conservées (disque en lecture seule sur Vercel).
4. Redéployer. La gérante modifie tout sur `https://votre-site/admin`.

## Photos
Aucune photo n'est fournie : le site affiche un visuel feuillage tant qu'aucune image n'est ajoutée.
Ajoutez les vraies photos depuis `/admin` (format 4:5 pour l'accueil, 16:10 pour les soins).

## PWA (installable)
Deux applications installables, avec leur propre icône et leur propre manifest :
- **Client** : `/` (manifest `/api/manifest/client`), bouton « Installer l'application » dans le pied de page.
- **Gérante** : `/admin` (manifest `/api/manifest/admin`), bouton d'installation en haut de l'espace gérante.

Le service worker (`public/sw.js`) est actif uniquement après `npm run build && npm start` ou en ligne (HTTPS). Il garde les pages et images en cache et affiche `/offline` sans connexion. Les appels `/api/*` ne sont jamais mis en cache.

Icônes : `public/icons/` (logo KMB ; l'icône gérante a une bande brune en bas pour la distinguer). Le logo du site est `public/logo.png`, modifiable depuis `/admin`.

## Code secret
La gérante change son code dans `/admin` (carte « Mon code secret »). Il est enregistré haché (scrypt), jamais en clair.
`ADMIN_PASSWORD` reste un code de secours (si elle oublie le sien) : il fonctionne toujours. Pour réinitialiser, connectez-vous avec ce code et définissez un nouveau code pour elle.

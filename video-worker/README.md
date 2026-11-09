# LCDE video worker

Ce service Cloud Run récupère la vidéo privée depuis Google Drive, la convertit en HLS avec FFmpeg et envoie les segments dans le bucket privé Google Cloud Storage.

Variables Cloud Run à configurer :

- `GCS_BUCKET=lcde-video-hls-39a346ac`
- `LCDE_TEST_DRIVE_FILE_ID=1EdJZYmgcjyGO5PS10vAnsgImw2FM8NdZ`
- `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` : valeurs du fichier OAuth Web téléchargé
- `GOOGLE_DRIVE_REFRESH_TOKEN` : jeton Drive configuré une seule fois côté serveur
- `VIDEO_WORKER_SECRET` : une longue valeur aléatoire
- `PUBLIC_WORKER_URL` : URL HTTPS du service Cloud Run

La variable `VIDEO_WORKER_URL` dans Vercel doit pointer vers la même URL Cloud Run, et `VIDEO_WORKER_SECRET` doit avoir la même valeur.

Le jeton Drive n'est jamais demandé à l'étudiant et ne doit jamais être envoyé au navigateur.

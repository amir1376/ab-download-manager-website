# Aide & FAQ

Trouvez des réponses aux questions fréquemment posées et des guides de dépannage pour AB Download Manager.

---

### Cette application prend-elle en charge le téléchargement de médias depuis des sites web ?
Oui ! AB Download Manager peut capturer des vidéos, de l'audio et des flux HLS non cryptés depuis des sites web. Assurez-vous d'avoir installé l'extension de navigateur pour que cette fonctionnalité fonctionne.

---

### Cette application prend-elle en charge le téléchargement depuis YouTube ?
Non. En raison des conditions légales et de licence, l'application ne prend pas en charge le téléchargement de flux cryptés, ce qui inclut les vidéos YouTube.

---

### Mon écran est noir ou scintille — que dois-je faire ?
Vous devrez peut-être changer l'API de rendu en rendu logiciel. Suivez les étapes ci-dessous :
1. Ajoutez cette ligne à vos variables d'environnement
   ```env
   SKIKO_RENDER_API=SOFTWARE
   ```
2. Redémarrez l'application.

Pour plus de détails, vous pouvez également consulter le [tutoriel officiel sur l'API de rendu sur GitHub](https://github.com/amir1376/ab-download-manager/wiki/Change-the-renderApi).

---

### L'extension ne peut pas se connecter à l'application — que dois-je faire ?
Si l'extension du navigateur ne parvient pas à communiquer avec l'application de bureau :
1. Assurez-vous que l'application de bureau AB Download Manager est en cours d'exécution.
2. Vérifiez que votre VPN, pare-feu ou proxy ne bloque pas l'accès au port local `15151`.
3. Essayez d'ouvrir [http://localhost:15151](http://localhost:15151) directement dans votre navigateur. Si cela fonctionne, vous devriez voir une réponse de connexion de l'application.

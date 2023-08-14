
# Présentation

Ce projet est un site de communication pour une résidence de 600 copropriétaires.
Le but principal est de permettre une communication entre le Conseil Syndical en place et les copropriétaires.

Pour cela, il y a deux rôles parmi les utilisateurs.
- Administrateur
- Utilisateurs

Les Administrateurs seront moi et un ou plusieurs membres du CS.
Les Utilisateurs seront les coproprietaires qui se seront inscrits.


Les Administrateurs peuvent.
- Ajouter un article
- Éditer un article
- Supprimer un article
- Ajouter des photos
- Ajoutez la Gazette
- Ajouter des comptes rendus de réunion


Les Utilisateurs peuvent consulter tous ces contenues.

## Ce site dispose de son forum

Décomposé en catégorie.

Les utilisateurs peuvent :
- Ajouter un post dans une catégorie
- Editer un post qu'ils ont ajouté
- Supprimer un post qu'ils ont ajouté
- Répondre à un poste d'un autre utilisateur

Les Administrateurs peuvent :
- Ajouter un post dans une catégorie
- Editer un post 
- Supprimer un post 
- Répondre a un poste 
- Supprimer une réponse

---

# Technologie use :

- NextJS
- TailwindCSS : Gere le Style
- NextAuth : Gere l'authentification
- html-to-react : Parse le HTML pour l'afficher correctement
- React-Toastify : Notification
- ReactQuill : Rich Text Editor
- bcryptjs : Permet de Hasher les MDP
- formidable : Perment de personaliser le body envoyer en requete



- API NodeJs : Pour upload des documents / images sur le serveur VPS
- Express : gere l'upload et le render des document de l'api
- Mutler : gere le parsing du body

BDD : MongoDbCloud
---
# Piste d'amélioration
- [ ] Page Profil 
- [ ] Modale pour les menus déroulants 
- [ ] Trier les Post par activité récente ?
- [ ] Gerer les tailles possible d'image
- [ ] Design de notification

--------
Etapes :
- [x] API + Formulaire ajout d'un article
- [x] API + Formulaire upload d'une image
- [x] API + Formulaire upload de documents Gazette
- [x] Facotriser API ReadFiles ( 1 API pour Gazette , CR , Photo)
- [x] Factoriser API Document Upload ( voir avoir une API pour Document / image )
- [x] Supprimer un Article
- [x] Systeme de log des Users
- [x] Gestion des droits sur les routes
- [x] Page admin !
- [x] Fonction edition d'article
- [x] Installer et parameter ReactQuill
- [x] Forum
- [x] Creation des Post et des reponse au post
- [x] Edition et suppression des post du Forum
- [x] Suppression des reponses du Forum
- [x] Gestion des droits du forum
- [x] Creation et deploiment d'une API nodeJS pour upload les documents
- [x] Gerer les notification avec toast
- [x] Gerer les notification avec toast
- [ ] Commenter le code


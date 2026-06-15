## Comment rendre l'application portable (personnaliser le répertoire de configuration)

Par défaut, l'application stocke ses fichiers de configuration dans :

`~/.abdm`

Vous avez deux moyens de modifier cela :

### Option 1 : Utiliser un dossier local `.abdm`

Créez un dossier nommé `.abdm` dans le répertoire d'installation de l'application.

Lorsque ce dossier existe, l'application l'utilisera automatiquement comme répertoire de configuration au lieu de l'emplacement par défaut.

### Option 2 : Utiliser un fichier `.portable`

Créez un fichier nommé `.portable` dans le répertoire d'installation.

Dans ce fichier, écrivez le chemin complet vers le dossier que vous souhaitez utiliser comme répertoire de configuration.

L'application lira ce fichier et utilisera le chemin spécifié pour stocker les données de configuration.

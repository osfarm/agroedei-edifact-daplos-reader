



# Guide utilisateur : DAPLOS

Fichier à plat

Version : 0.95

Fiche Parcellaire

Date de dernière mise à jour : Janvier 2024

*« Propriété exclusive d’AGRO EDI EUROPE. Toute utilisation est strictement réservée aux membres d’AGRO EDI EUROPE, dans le respect des Conditions Générales d'Utilisation accessibles sur le site de l’association – Reproduction interdite».*

**DAPLOS v0.95 : Fiche Parcellaire**

## **Gestion des versions**

| Version | Observations | Date de mise à jour |
| :---: | ----- | ----- |
| 0.8-2a | Document de travail | 09/2005 |
| 0.8-3 | Document de travail | 04/01/2006 |
| 0.9-0 | Document de travail | 23/01/2006 |
| 0.9-1 | Document de travail | 15/02/2006 |
| 0.9-2 | Version validée | 02/03/2006 |
| 0.9-3 | Correction p56-62 (n° d’occurrences) | 12/02/2007 |
| 0.9-4 | Ajout d’un code « Densité volumique » Gpe 15 QTY p128 | 16/01/2008 |
| 0.9-5 | Ajout de 2 champs : Stade de culture et cible de l’intervention Utilisation du référentiel d’Arvalis pour décrire le type de sol | MARS 2023 |
| 0.9-5 | Intégration et harmonisation du guide message DAPLOS fichier à plat avec le guide DAPLOS EDIFACT | FEVRIER 2024 |

1. **Description du fichier à plat DAPLOS**

### **Définition et principe**

La fiche parcellaire est un standard d’échange normalisé issu d’une norme internationale publié par l’UN
 CEFACT, DAPLOS (DAta PLOt Sheet).  
Au sein d’Agro EDI Europe, le standard Fiche Parcellaire existe sous trois formats issus de la norme internationale :
- Le format eDaplos : format en XML utilisable pour toutes les cultures
- Le format Daplos utilisable pour les grandes cultures uniquement :  
  - Fichier texte ou fichier à plat
  - Fichier EDIFACT (non utilisé)

A ce jour, le format Daplos fichier à plat (DAP) est le format majoritairement utilisé dans les échanges entre les outils de traçabilité parcellaire du marché.

Le fichier à plat échangé s’appuie sur une description du message normalisé EDIFACT et des règles de gestion associées explicitées dans ce guide utilisateur. Ces deux aspects ne doivent pas être dissociés lors de l’installation du message.

Les formats de fiche parcellaire permettent d’échanger des données techniques pour les productions végétales entre une exploitation agricole et un partenaire économique.

Ces données techniques peuvent être :
- Des données de traçabilité sur les interventions culturales réalisées par l’agriculteur et transmises vers un ou plusieurs partenaires(s) économique(s).  
- Des données prévisionnelles sur des interventions culturales prévues par l’agriculteurs et transmises vers un ou plusieurs partenaire(s) économique(s).
- Des données liées à des informations de conseil/préconisation transmise à l’agriculteur par son ou ses partenaire(s) économiques(s).

### **Documents associés**

Toutes les listes de codes harmonisés mentionnées dans ce document sont référencées et disponibles dans l’espace adhérent du site de l’association [www.agroedieurope.fr](http://www.agroedieurope.fr/).  

Ils sont également répertoriés dans des documents de travail et de suivi des référentiels (excel) disponibles également dans l’espace adhérent.  

Liste des documents de travail utilisés dans le message

- ***edaplos.referentiels***
- ***Listecultures\_AEE***
- **Stades de Cultures v095**

La liste des documents de référence est mentionnée via son nom d’usage dans ce guide. Il convient de se  
référer à la version du fichier correspondant en vigueur à date.

Le référentiel concernant les types de sol Arvalis est disponible en open data notamment via API AGRO.

2. **Règles de gestion générales**

Les règles de gestion générales s’appliquent à l’ensemble du fichier à plat échangé et à l’entièreté de son  
contenu. Elles sont issues initialement du guide utilisateur DAPLOS EDIFACT et ont évolués avec les usages.

➡️ 1 interchange contient un ensemble de documents envoyés par 1 émetteur vers 1 destinataire. Un même envoi peut comporter les fiches parcellaires de 1 à n exploitations.

➡️ 1 document peut contenir 1 à n fiches parcellaire appartenant à une même exploitation pour un seul destinataire.

➡️ 1 document peut comporter des fiches de cultures différentes, ainsi que de campagnes différentes (pour envoyer un historique par exemple).

➡️ Une même fiche parcellaire peut être transmise à plusieurs reprises, au fur et à mesure de son remplissage (par exemple au semis, après les traitements de printemps, après la récolte).

➡️ Chaque parcelle est identifiée par un code unique par exploitation de 4 caractères (voir règles de gestion au niveau du Flag correspondant).

➡️ Les mises à jour se feront à deux niveaux :

- Fiche parcellaire

- Evénement.

En résumé, l’émetteur renvoie tout au destinataire et **c’est l’applicatif du destinataire qui décide à deux niveaux (parcelle et événement) de créer systématiquement les nouveaux codes et d’écraser ou non les codes qui existent déjà.**

Exemple : Si oubli d’un intrant au niveau de l’événement on renvoie le même événement complété de l’intrant.

➡️ Si un document comporte des fiches parcellaires nouvelles et des fiches en mise à jour, l’ensemble  
sera qualifié en mise à jour.

➡️ Le choix des caractères utilisés dans les messages : de a à z, de A à Z, de 0 à 9 et espace uniquement ➡️ Les formats utilisés dans les messages :

- Format des quantités : 9 caractères, Cadré à droite, 6 décimales maximum, Caractère décimal explicite « . » (Point). S’il n’y a pas de partie décimale, le « . » est absent, la valeur de la quantité est complété avec des 0 à gauche.  
- Format des surfaces : 9 caractères, Cadré à droite, 4 décimales maximum, Caractère décimal explicite « . » (Point). Si il n’y a pas de partie décimale, le « . » est absent, la valeur de la surface est complétée avec des 0 à gauche.

| Exemples : | 2,2 | \= 0000002.2 ou 00002.200 |
| :---- | :---: | :---- |
|  | 200 | \= 000000200 |

- Format alphanumérique : Cadré à gauche

➡️ Préconisation pour l’identification du fichier à plat (utilisé pour un échange non EDI) :

- N° SIRET émetteur\_TimeStamp.dap

➡️ Version du message : il est recommandé d’envoyer dans un message, des fiches parcellaires d’une  même version et si possible de la dernière version définie.

➡️ Contrôle du message à l’export du logiciel et refus d’intégration du message à l’import si :
- Si donnée obligatoire manquante \= message incomplet
- Si données d’une liste non valide (Liste code AEE, INSEE, SIRET, PAC, AMM, Arvalis,…)

3. **Structure du fichier à plat échangé**

Le fichier à plat DAPLOS correspond à un échange entre un émetteur et un destinataire. Ce message peut être divisé en 2 parties :

➡️ L’entête

- Numéro de document

  - Identification des intervenants

  ➡️ Le Détail des 1 à n fiches parcellaires contenues dans l’échange

  - **Généralités sur la fiche parcellaire** (dates, espèce, variété, surfaces, contrats etc.)

  - **Historique de la parcelle** (précédents, amendements etc.)

  - **Analyse** (détail des analyses de sol ayant été réalisées sur la parcelle)

  - **Evènement** (i.e. tous les évènements du type observations, conseil, interventions etc.)

  Ce « détail » sera itéré autant de fois qu’il y aura de fiches parcellaires dans le document envoyé.

| Interchange | EI (1 itération par fichier) |
| ----- | ----- |
| **Entête de document** | **DE (1 itération par document)** |
| **Intervenants** | **DA (3 itérations par document)** |
| **Type agriculture pratiquée** | **DT (0 à 20 itérations par document)** |
| **Parcelle culturale** | **DP (1 à 9999 itérations par document)** |
| ***Parcelles cadastrales*** | ***PC (0 à 15 itérations par parcelle culturale)*** |
| *Coordonnées géographiques* | *CC (0 à 9999 itérations par surface cadastrale)* |
| ***Surfaces parcelle culturale*** | ***PS (0 à 4 itérations par parcelle)*** |
| *Coordonnées géographiques* | *SC (0 à 9999 itérations par surface culturale)* |
| ***Engagement*** | ***PE (0 à 99 itérations par parcelle)*** |
| ***Historique (Précédent)*** | ***PH (0 à 9 itérations par parcelle)*** |
| *Amendement et résidus* | *HA (0 à 4 itérations par précédent)* |
| ***Analyse de sol*** | ***PA (0 à 99 itérations par parcelle)*** |
| ***Evènement*** | ***PV (0 à 9999 itérations par parcelle)*** |
| *Coordonnées géographiques* | *VC (0 à n itérations par surface évènement)* |
| *Cible* | *VB (0 à 99 itérations par parcelle)* |
| ***Intrants*** | ***VI (0 à n itérations par évènement) (n+p \= 99*****)** |
| *Composition du produit* | IC (0 à 10 itérations par intrant produit) |
| *N° Lot fabriquant* | IL (0 à 999 itérations par intrant) |
| *Analyse d’effluent* | IA (0 à 99 itérations par intrant) |
| ***Récolte*** | **VR (0 à p itérations par évènement) (n+p \= 99\)** |
| *N° Lot récolte* | RL (0 à 999 itérations par intrant) |
| *Caractéristiques lot* | LC (0 à 10 itérations par intrant) |
| ***Historique indicateur décision*** | **VH (0 à 1 itération par évènement)** |

### **FLAG « EI » \- Enveloppe interchange – 1 itération obligatoire**

| Début | Fin | Format | Libellé | O/F | Remarques |
| :---: | :---: | :---: | ----- | ----- | ----- |
| 3 | 16 | an 14 | **Identification de l'émetteur** | O | Si exploitation : Code SIRET Autre : Code EAN |
| 17 | 19 | an 3 | **Type de codification émetteur (en code)** | O | **5** : Code SIRET **14** : Code EAN |
| 20 | 33 | an 14 | **Identification du destinataire** | O | Si exploitation : Code SIRET Autre : Code EAN |
| 34 | 36 | an 3 | **Type de codification destinataire (en code)** | O | **5** : Code SIRET **14** : Code EAN |
| 37 | 40 | n 4 | **Nombre de documents dans l’envoi** | F | En EDIFACT, sera calculé par le traducteur |

L’identification des intervenants au niveau du Flag EI est un héritage de la structure EDIFACT du message fiche parcellaire. Dans l’enveloppe d’interchange

EDIFACT, l’émetteur et le destinataire identifié à ce niveau sont les émetteurs techniques au sens télécommunication.  
Dans la version fichier à plat de DAPLOS, les usages recensés pour l’identification des intervenants dans le Flag EI sont :

➡️ L’émetteur peut être :
- L’exploitation agricole émettrice de la fiche parcellaire à l’origine des données  
- L’émetteur au sens technique chargé de transmettre les données (ex : éditeur de l’outil qui exporte les données) 

➡️ Le destinataire est l’entité qui intègre le fichier. Selon les cas, le destinataire peut être :
- Une exploitation,  
- Une entité utilisatrice (ex : coopérative, négoce)
- L’entité chargé de recevoir les données (ex : éditeur de l’outil qui intègre les données).

➡️ Compte tenu des usages multiples pour une même donnée, les partenaires doivent convenir des usages retenus en amont de la mise en place de l’échange.

L’identification unique de l’exploitation agricole se fait par le seul code SIRET. 
La validité du n°SIRET doit être contrôlée avant émission du message

### **FLAG « DE » \- Entête du document – 1 itération obligatoire par document**

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | ----- | :---- | ----- |
|  3 |  37 |  an 35 |  **Référence du document** |  F |  |
|  38 |  38 |  an 1 |  **Fonction (en code)** |  F | 7 : Duplicata 9 : Original (par défaut) |
|  39 |  46 |  n 8 |  **Date du document** |  O |  Format : SSAAMMJJ |
|  47 |  50 |  n 4 |  **Nombre de fiches parcellaires** |  F |  Indiquer le nombre de fiches parcellaires dans le document |
|  51 |  54 |  an 4 |  **N° de version du message** |  F |  0.95 (dernière version du fichier à plat) |

La référence du document est une donnée facultative qui regroupe n fiches parcellaires d’une même exploitation pour un même destinataire. Si l’émetteur envoie un duplicata, il devra indiquer la référence du document d’origine au niveau de la référence du document.  
La date du document correspond à la date de génération du fichier pour l’envoi

### **FLAG « DA » \- Adresses intervenants – 3 itérations obligatoires par document**

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | ----- | :---- | ----- |
|  3 |  5 |  an 3 |  **Qualifiant intervenant** |  O | **TF** : Exploitation **FR** : Emetteur **MR** : Destinataire |
| 6 | 22 | an 17 | **Identification de l’intervenant** | O | Si exploitation : Code SIRET Autre : Code GLN ou Code SIRET |
|  23 |  25 |  an 3 |  **Type d’identification (en code)** |  F | Obligatoire si identification renseignée **9** : EAN **107** : Code SIRET |
| 26 | 60 | an 35 | **Raison sociale (1)** | F | Nom de l’intervenant |
|  61 |  95 |  an 35 |  **Raison sociale (2)** |  F | Nom de l’intervenant *Ne doit pas être renseigné si la donnée « Raison sociale (1) » est non renseignée* |
| 96 | 130 | an 35 | **Adresse Rue (1)** | F | Adresse Rue de l’intervenant |
|  131 |  165 |  an 35 |  **Adresse Rue (2)** |  F | Adresse Rue de l’intervenant Ne doit pas être renseigné si la donnée « Adresse Rue (1) » est non renseigné |
|  166 |  200 |  an 35 |  **Ville** |  F | Ville de l’intervenant |
| 201 | 209 | an 9 | **Code postal** | F | Code postal de l’intervenant |
| 210 | 211 | an 2 | **Pays** | F | Code ISO du pays de l’exploitation (FR : France) |
|  212 |  231 |  an 20 | **1ère référence complémentaire exploitation** |  F | **Fortement conseillé** Identification de l’exploitation chez le destinataire (si qualifiant \= TF) |
| 232 | 251 | an 20 | **2ème référence complémentaire exploitation** | F | N° Pacage (si qualifiant \= TF) |
| 252 | 271 | an 20 | **3ème référence complémentaire exploitation** | F | **Code MSA** Identification exploitant (si qualifiant \= TF) |

➡️ Les informations minimums à indiquer dans le flag DA sont :

- L’identification de l’exploitation (TF) – Obligatoirement avec son numéro SIRET \=\> L’exploitation agricole émettrice de la fiche parcellaire à l’origine des données  
- L’identification de l’émetteur (FR) \=\> L’exploitation (idem TF) ou l’émetteur au sens technique chargé de transmettre les données (ex : éditeur

  de l’outil qui exporte les données)

➡️ L’identification du destinataire (MR) \=\> l’entité qui intègre le fichier. Selon les cas, le destinataire peut être :

- Une exploitation,

- Une entité utilisatrice (ex : coopérative, négoce)

- L’entité chargé de recevoir les données (ex : éditeur de l’outil qui intègre les données).

➡️ Les informations et l’identification des intervenants dans le flag DA peuvent être identiques à celles fournies dans le flag EI en fonction des usages.

### **FLAG « DT » \- Type d'agriculture pratiquée – de 0 à 20 itérations par document**

| Début | Fin | Format | Libellé | O/F | Remarques |
| :---: | :---: | :---: | ----- | :---- | ----- |
| 3 | 5 | an 3 | **Type d’agriculture pratiquée (en code)** | F | Voir liste de codes du référentiel Engagement Fichier excel de référence : ***edaplos.referentiels*** (onglet engagement) |
| 6 | 25 | an 20 | **N° de certificat** | F |  |
| 26 | 45 | an 20 | **Autre type d’agriculture** | F | Si le type n’est pas dans le référentiel Engagement |

### **FLAG « DP » \- Parcelle culturale – de 1 à 9999 itérations par document**

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | ----- | :---- | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | N° Séquentiel incrémenté de 1 à 9999 par document |
| 7 | 10 | an 4 | **Identification parcelle culturale** | O | Clé unique de la parcelle |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | SSAA |
| 15 | 22 | n 8 | **Date de début de la parcelle** | O | SSAAMMJJ \- Date de la 1ère intervention |
| 23 | 30 | n 8 | **Date de création de la fiche** | F | SSAAMMJJ |
| 31 | 38 | n 8 | **Date de dernière saisie sur la parcelle** | F | SSAAMMJJ |
| 39 | 46 | n 8 | **Date de fin de parcelle** | F | SSAAMMJJ |
| 47 | 49 | an 3 | **Espèce botanique attendue (en code)** | O | Voir liste de codes du référentiel Culture Fichier excel de référence ***: Listecultures\_AEE*** |
|  50 |  56 |  an 7 |  **Variété semée (1)** |  F | Code GNIS à utiliser par défaut si disponible Autres codifications possibles en l’absence de code GNIS (voir règle de gestion) |
|  57 |  63 |  an 7 |  **Variété semée (2)** |  F | Code GNIS à utiliser par défaut si disponible Autres codifications possibles en l’absence de code GNIS (voir règle de gestion) |
|  64 |  70 |  an 7 |  **Variété semée (3)** |  F | Code GNIS à utiliser par défaut si disponible Autres codifications possibles en l’absence de code GNIS (voir règle de gestion) |
|  71 |  77 |  an 7 |  **Variété semée (4)** |  F | Code GNIS à utiliser par défaut si disponible Autres codifications possibles en l’absence de code GNIS (voir règle de gestion) |
|  78 |  84 |  an 7 |  **Variété semée (5)** |  F | Code GNIS à utiliser par défaut si disponible Autres codifications possibles en l’absence de code GNIS (voir règle de gestion) |
| 85 | 87 | an 3 | **Qualifiant de l’espèce** | F | Voir liste de codes du référentiel Culture (Qualifiant) Fichier excel de référence ***: Listecultures\_AEE** (o*nglet Qualifiant*)* |
|  88 |  90 |  an 3 |  **Période de semis** |  F | Voir liste de codes du référentiel Période de semis Fichier excel de référence : ***Listecultures\_AEE*** (onglet période de semis) |
| 91 | 93 | an 3 | **Destination** | F | Voir liste de codes du référentiel Culture (Destination) Fichier excel de référence ***: Listecultures\_AEE*** (onglet destination) |
| 94 | 102 | n 9 | **Rendement objectif** | F |  |
|  103 |  105 |  an 3 |  **Unité de mesure de rendement** |  F | Obligatoire si Rendement objectif renseigné Voir liste de codes du référentiel Unité de mesure Fichier excel de référence ***: edaplos.referentiels** (onglet unité de mesure)* |
| 106 | 140 | an 35 | **Intitulé de la parcelle culturale** | O | Attribué par l’exploitation |
| 141 | 150 | an 10 | **N° îlot PAC** | F |  |
| 151 | 160 | an 10 | **N° parcelle pérenne** | F | Cette identification n’est plus utilisée. Préférer le renseignement du N°îlot PAC précédemment. |
| 161 | 166 | an 6 | **N° de commune** | F | Code INSEE |
| 167 | 169 | n 3 | **Profondeur du sol** | F | En centimètres |
| 170 | 172 | n 3 | **Pierrosité de surface** | F | En pourcentage (3 entiers) |
|  173 |  175 |  an 3 |  **Type de sol (en code)** |  F | Voir liste de codes du référentiel Caractéristiques techniques (qualifiants) Fichier excel de référence : ***edaplos.referentiels*** (onglet caract technique Code) |
| 176 | 210 | an 35 | **Autre type de sol** | F | Libellé en clair |
|  211 |  213 |  an 3 |  **Acidité du sol (en code)** |  F | Voir liste de codes du référentiel Caractéristiques techniques (qualifiants) Fichier excel de référence : ***edaplos.referentiels*** (onglet caract technique Code) |
|  214 |  216 |  an 3 |  **Profondeur qualitative d’apparition du sous- sol (en code)** |  F | Voir liste de codes du référentiel Caractéristiques techniques (qualifiants) Fichier excel de référence : ***edaplos.referentiels*** (onglet caract technique Code) |
|  217 |  219 |  an 3 |  **Type de sous-sol (en code)** |  F | Voir liste de codes du référentiel Caractéristiques techniques (qualifiants) Fichier excel de référence : ***edaplos.referentiels*** (onglet caract technique Code) |
| 220 | 222 | an..3 | **Culture intermédiaire (en code)** |  | Voir liste de codes du référentiel Culture Fichier excel de référence ***: Listecultures\_AEE*** |
| 223 | 223 | an 1 | **Sol hydromorphe** | F | O(Oui) ou non renseigné |
| 224 | 224 | an 1 | **Parcelle culturale drainée** | F | O(Oui) ou non renseigné |
| 225 | 225 | an 1 | **Parcelle culturale re-découpée** | F | O(Oui) ou non renseigné |
| 226 | 229 | an 4 | **Clé de la parcelle culturale initiale (en code)** | F | Obligatoire si parcelle re-découpée |
| 230 | 232 | an 3 | **Gestion des résidus (en code)** | F | Voir liste de codes du référentiel Gestion des résidus de culture Fichier excel de référence : ***edaplos.referentiels*** (onglet résidus) |

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | ----- | :---- | ----- |
|  233 |  241 |  n 9 |  **Quantité épandue** |  F | En tonne/ha. Elle correspond à la quantité de résidus de culture laissés dans la parcelle |
| 242 | 250 | an 9 | **Type de sol v0.95** | F | Référentiels sols Arvalis en open data |
| 251 | 259 | n 9 | **Dose N à apporter** | F |  |

## Règles de gestion
**Identification de la parcelle culturale :**

➡️ Toute parcelle échangée dans la fiche parcellaire est strictement culturale

➡️ L’intitulé de la parcelle culturale sera une chaine de 35 caractère maximum

➡️ Chaque parcelle culturale sera identifiée de façon unique, par la combinaison de plusieurs informations présentes à différents niveaux du fichier échangé :

- SIRET de l’exploitation \+ Année de récolte \+ clé unique d’identification de la parcelle culturale ➡️ Informations figées au premier envoi du fichier :
- Identifiant de l’exploitation
- Qualifiant type de codification de l’exploitation (code 5\)
- Année de récolte prévue
- Clé unique d’identification de la parcelle culturale

➡️ La clé unique d’identification de la parcelle culturale est définie par :
- Un format de quatre caractères alphanumériques.
- Unique pour une exploitation et une année attendue de récolte.
- Préconisation : le logiciel préremplit la donnée avec un numéro numérique chronologique commençant à 0001\. Cependant, l’agriculteur pourra choisir une autre clé pour une parcelle culturale et le logiciel vérifiera l’unicité. Il ne pourra y avoir que des chiffres et des lettres, sans autres caractères possibles.

**Pour information :**

Le choix de 4 caractères (et non 3 ou 2\) doit permettre de prendre en compte sous forme strictement numérique d’éventuelles extensions des fiches parcellaires informatisées aux cultures légumières.

Lors d’un apport à un OS, l’agriculteur pourra annoncer cette clé pour que l’OS puisse l’enregistrer et générer ainsi un lien entre les mouvements

physiques et les parcelles dans le système d’information de l’OS.

Les éditeurs informatiques veilleront à trouver des solutions informatiques qui restent compatibles avec ces règles de gestion ; en particulier pour le cas d’exploitations gérées sur deux outils ou dossiers différents.

Chaque fiche parcellaire pourra également comporter une clé unique identification propre au logiciel. Cette identification unique n’est pas gérée par l’agriculteur.

➡️ Il est recommandé d’indiquer systématiquement le numéro d’îlot PAC de rattachement de la parcelle culturale. Si absence d’information sur l’ilot PAC, il est recommandé de faire le rattachement à la parcelle pérenne. Le N° parcelle pérenne correspond à l’identification d’une entité de parcelles créées au-dessus de la parcelle culturale. Cette identification était utilisée avant que la notion d’ilot PAC existe et était attribuée par l’outil. Le n°parcelle pérenne n’est plus d’usage, préférer le renseignement du numéro d’ilôt PAC.

➡️ Le numéro îlot PAC est obligatoirement renseigné pour les cultures PAC.

➡️ Le code INSEE d’une commune est composé de 5 caractères dont le 2nd peut être un chiffre ou une lettre (A ou B). Sa validité doit être vérifiée avant émission.

**Gestion de la parcelle culturale :**

➡️ Une culture intermédiaire pourra être indiqué au niveau de la parcelle

➡️ Une culture intermédiaire est considérée comme une culture à part entière (avec son identification) si les produits sont exportés.

(Exemple : dans le cas d’une parcelle avec deux récoltes exportées dans l’année, on considère qu’il y a deux parcelles culturales à créer)

➡️ Pour une culture intermédiaire constitué d’un mélange de plusieurs espèces, il faut renseigner un code mélange. Il n’y a pas la possibilité

de préciser les espèces qui constituent le mélange.

➡️ Une parcelle culturale pourra porter jusqu’à 5 variétés identifiées par le code GNIS :

- Contrôle à l’export du nombre et type de caractère du code GNIS (3n \+ 4an)

- A l’export rejet possible de la ligne si le code est bien formé mais inconnu ou faux (hors problème nombre et type de caractère)

- Utilisation des codes GNIS espèces diverses appropriées (espèces ou associations variétales non connues).

- En l’absence de codes GNIS, la variété peut être identifiée à l’aide d’autres sources de codes convenue préalablement entre l’émetteur et le destinataire. Ex : En grande culture : il est d’usage d’utilisé le code d’identification étrangers de la variété ou de définir conjointement un code propriétaire. Pour les autres types de culture, la codification GEVES, la codification propre à un organisme d’espèce ou la codification propriétaire peuvent être utilisées.

➡️ La codification Type de Sol V0.95 (=référentiel sols Arvalis disponible en open data) est prioritaire sur l’ancienne codification Type de sol AEE (en code).

➡️ La quantité épandue correspond à la l’estimation de la quantité de résidus de culture laissées dans la parcelle.

**Découpage de la parcelle :**

➡️ Lors de tout découpage, si la fiche parcellaire a déjà été envoyée partiellement, l’ordinateur de gestion de l’agriculteur enverra à la fois un annule de la parcelle culturale initiale et deux créations (correspondant aux parcelles nouvellement créée par le découpage).

➡️ En cas de re-semis partiel, la partie ressemée devient une nouvelle parcelle. Cette nouvelle parcelle récupère les évènements du début de cycle du semis précédent. La partie restant avec le semis initial conserve les caractéristiques des évènements faits avant le découpage (on aura donc deux nouvelles fiches parcellaires créées avec le même historique).

➡️ Il est recommandé de limiter le nombre de découpage d’une parcelle initiale pour ne pas alourdir la gestion des fichiers.

➡️ Le motif principal de découpage de la parcelle est un semis différencié (variété, y compris origine de la semence, dont de la semence de ferme). Le découpage peut également avoir lieu à l’appréciation des utilisateurs selon le contexte (ex : fertilisation différente, notion de rendement différents, besoins administratifs, …).

➡️ Il n’est pas obligatoire de différencier les parcelles par rapport aux destinations mais rien ne l’interdit. Exemple : Cas du maïs fourrage et maïs grain où la notion de rendement est différente en fonction de la destination de la culture.

### **FLAG « PC » \- Parcelle cadastrale – de 0 à 15 itérations par parcelle culturale**

| Début | Fin | Format | Libellé | O/F | Remarques |
| :---: | :---: | :---: | ----- | :---- | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 30 | an 16 | **N° parcelle cadastrale** | O |  |
| 31 | 39 | n 9 | **Surface de la parcelle cadastrale** | F | En hectares |

La parcelle cadastrale est à renseigner en fonction du contexte (ex : vigne)

**Structure du numéro de parcelle cadastrale :**
- Département, format 999 (mettre 077 et non 77\)
- Commune, format 999
- Section, format alpha 2
- N° de la parcelle dans la section, format numérique 6
- Subdivision fiscale, format alpha 2

### **FLAG « CC » \- Coordonnée des points géographique d'une surface d'une parcelle cadastrale – de 0 à 9999 itérations par surface**

| Début | Fin | Format | Libellé | O/F | Remarques |
| :---: | :---: | :---: | ----- | :---- | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 30 | an 16 | **N° parcelle cadastrale** | O | Idem enregistrement “PC” |
| 31 | 33 | an 3 | **Qualifiant de la position géographique** | O | Voir règle de gestion sur les coordonnées géographique |
| 34 | 44 | an 11 | **Longitude** | O | 7 entiers « . » 3 décimales |
| 45 | 54 | an 10 | **Latitude** | O | 7 entiers « . » 2 décimales |
| 55 | 72 | n..18 | **Altitude** | F | 7 entiers « . » 3 décimales |

➡️ Pour qualifier la position géographique, utilisation des coordonnées suivantes :

- 3 : Coordonnées géographiques d’1 point en coordonnées LAMBERT 2 étendu
- 4 : Coordonnées géographiques d’1 point en coordonnées WGS84
- 5 : Coordonnées en Lambert 93 (système géographique officiel Français servant de référence)

➡️ Formats des coordonnées :
- Lambert2 ou Lambert 93 : 7.2 avec un séparateur décimal
- WGS84 (° ' '') : 7.3 et 7.2 en an pour les valeurs respectives de la longitude et de la latitude (ex : la longitude est en 999°99'99'' et 3 décimales pour les millièmes de secondes, soit un format de 9999999.999)

### **FLAG « PS » \- Surface parcelle culturale – de 0 à 4 itérations par parcelle culturale**

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | ----- | :---- | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
|  15 |  17 |  an 3 |  **Type de surface (en code)** |  O | Voir liste de codes du référentiel Type de surfaces Fichier excel de référence : ***edaplos.referentiels*** (onglet surfaces Types) |
| 18 | 26 | n 9 | **Surface** | O | En hectares (4 décimales maximum) |

### **FLAG « SC » \- Coordonnées des points géographiques d'une surface d'une parcelle culturale – de 0 à 9999 itérations par surface**

| Début | Fin | Format | Libellé | O/F | Remarques |
| :---: | :---: | :---: | ----- | :---- | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 17 | an 3 | **Qualifiant de la position géographique** | O | Voir règle de gestion sur les coordonnées géographique |
| 18 | 28 | an 11 | **Longitude** | O | 7 entiers « . » 3 décimales |
| 29 | 38 | an 10 | **Latitude** | O | 7 entiers « . » 2 décimales |
| 39 | 56 | n..18 | **Altitude** | F | 7 entiers « . » 3 décimales |

➡️ Pour qualifier la position géographique, utilisation des coordonnées suivantes :

- 3 : Coordonnées géographiques d’1 point en coordonnées LAMBERT 2 étendu
- 4 : Coordonnées géographiques d’1 point en coordonnées WGS84
- 5 : Coordonnées en Lambert 93 (système géographique officiel Français servant de référence)

➡️ Formats des coordonnées :
- Lambert2 ou Lambert 93 : 7.2 avec un séparateur décimal
- WGS84 (° ' '') : 7.3 et 7.2 en an pour les valeurs respectives de la longitude et de la latitude (ex : la longitude est en 999°99'99'' et 3 décimales pour les millièmes de secondes, soit un format de 9999999.999)

### **FLAG « PE » \- Engagement – de 0 à 99 itérations par parcelle culturale**

| Début | Fin |  | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | :---- | ----- | :---- | ----- |
| 3 | 6 | n 4 |  | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 |  | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 |  | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 17 | an 3 |  | **Code engagement (en code)** | F | Voir liste de codes du référentiel Engagement Fichier excel de référence : ***edaplos.referentiels*** (onglet engagement) |
| 18 | 52 | an 35 |  | **Libellé autre contrat** | F | **Obligatoire** si code engagement non renseigné |
| 53 | 87 | an 35 |  | **N° de contrat** | F |  |
| 88 | 95 | n 8 |  | **Date du contrat** | F | SSAAMMJJ |
| 96 | 109 | an 14 |  | **Identification du contractant** | F | Code EAN ou Code SIRET |
|  110 |  112 |  an 3 |  |  **Type d’identification (en code)** |  F | **Obligatoire si** identification renseignée **9** : EAN **107** : N° de SIRET |
| 113 | 147 | an 35 |  | **Raison sociale (1)** | F | **Obligatoire si** identification du contractant non renseignée Nom du contractant (1) |
|  148 |  182 |  an 35 |  |  **Raison sociale (2)** |  F | Nom du contractant (2) *Ne doit pas être renseigné si la donnée « Nom du contractant (1) » est non renseignée* |
| 183 | 217 | an 35 |  | **Adresse Rue (1)** | F | Adresse Rue du contractant (1) |
| 218 | 252 | an 35 |  | **Adresse Rue (2)** | F | Adresse Rue du contractant (2) *Ne doit pas être renseigné si Adresse Rue contractant (1) non renseignée* |
| 253 | 287 | an 35 |  | **Ville** | F | Ville du contractant |
| 288 | 296 | an 9 |  | **Code postal** | F | Code postal du contractant |
| 297 | 298 | an 2 |  | **Pays** | F | Code ISO du pays du contractant (FR : France) |

➡️ Si un engagement est cité au niveau de l’exploitation (FLAG DT) et concerne également la parcelle, il doit obligatoirement être reprécisé au niveau de la parcelle.

➡️ N° de contrat à la parcelle :

- Dans le cas de certains types de contrats (CAD, HVE) , l’identification du contractant n’est pas évidente. Il est alors recommandé d’indiquer la **raison sociale générique** « Administration ».

### **FLAG « PH » \- Historique / Précédent de la parcelle culturale – de 0 à 9 itérations par parcelle culturale**

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | ----- | :---- | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 16 | an 2 | **N° d’ordre du précédent** | O | En nombre d’années par rapport à la récolte (chiffre négatif de \-1 à \-9) |
| 17 | 20 | an 4 | **Clé de la parcelle du précédent** | F |  |
| 21 | 23 | an 3 | **Espèce botanique** | O | Voir liste de codes du référentiel Culture Fichier excel de référence ***: Listecultures\_AEE*** |
|  24 |  30 |  an 7 |  **Variété semée (1)** |  F | Code GNIS à utiliser par défaut si disponible Autres codifications possibles en l’absence de code GNIS (voir règle de gestion) |
|  31 |  37 |  an 7 |  **Variété semée (2)** |  F | Code GNIS à utiliser par défaut si disponible Autres codifications possibles en l’absence de code GNIS (voir règle de gestion) |
|  38 |  44 |  an 7 |  **Variété semée (3)** |  F | Code GNIS à utiliser par défaut si disponible Autres codifications possibles en l’absence de code GNIS (voir règle de gestion) |
|  45 |  51 |  an 7 |  **Variété semée (4)** |  F | Code GNIS à utiliser par défaut si disponible Autres codifications possibles en l’absence de code GNIS (voir règle de gestion) |
|  52 |  58 |  an 7 |  **Variété semée (5)** |  F | Code GNIS à utiliser par défaut si disponible Autres codifications possibles en l’absence de code GNIS (voir règle de gestion) |
|  59 |  61 |  an 3 |  **Qualifiant d’espèce** |  F | Voir liste de codes du référentiel Culture (Qualifiant) Fichier excel de référence ***: Listecultures\_AEE (onglet qualifiant)*** |
|  62 |  64 |  an 3 |  **Période de semis** |  F | Voir liste de codes du référentiel Période de semis Fichier excel de référence : ***Listecultures\_AEE*** (**onglet période de semis)** |
| 65 | 67 | an 3 | **Destination** | F | Voir liste de codes du référentiel Culture (Destination) Fichier excel de référence ***: Listecultures\_AEE (onglet destination)*** |
| 68 | 70 | an 3 | **Gestion des résidus** | F | Voir liste de codes du référentiel Gestion des résidus de culture Fichier excel de référence : ***edaplos.referentiels*** **(onglet résidus )** |
|  71 |  79 |  n 9 |  **Quantité épandue** |  F | En tonne/ha Elle correspond à la quantité de résidus de culture laissés dans la parcelle |

➡️ Lorsqu’une parcelle a deux précédents, le précédent principal sera unique et choisi comme le dominant des précédents.

Ex : Une parcelle de 10ha de blé cultivé en année n. En année n-1, cette même parcelle était cultivée avec 8ha de betterave et 2ha de colza, le précédent n-1 a indiqué pour cette parcelle est la betterave.

➡️ Une parcelle culturale pourra avoir jusqu’à 9 précédents principaux, c’est à dire 10 années dans le cadre d’une production annuelle (et non pas 9 petites parcelles l’année d’avant \!)

➡️ Le numéro d’ordre du précédent correspond au nombre d’années antérieures par rapport à l’année de la campagne. Exemple : précédent N°1 \=  précédent de l’année n-1 \= **\-1**

➡️ Pour avoir plus de détails sur l’historique de la parcelle, il est recommandé d’envoyer la fiche parcellaire (n-1) avec la fiche parcellaire de l’année (n)

➡️ La quantité épandue correspond à la l’estimation de la quantité de résidus de culture laissés dans la parcelle.

### **FLAG « HA » \- Amendement et résidus – de 0 à 3 itérations par précédent**

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | ----- | :---- | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 17 | an 3 | **Type d’amendement** | O | Voir liste de codes du référentiel Amendements du sol (Type) ***edaplos.referentiels*** (onglet Amendement du sol) |
| 18 | 52 | an 35 | **Complément information sur type amendement** | F |  |
| 53 | 60 | n 8 | **Date de l’amendement** | F | SSAAMMJJ |
| 61 | 69 | n 9 | **Quantité épandue** | F |  |
|  70 |  72 |  an 3 |  **Unité de mesure de la quantité épandue** |  F | **Obligatoire** si quantité renseignée Voir liste de codes du référentiel Unité de mesure Fichier excel de référence ***: edaplos.referentiels** (onglet unité de mesure)* |
| 73 | 107 | an 35 | **Raison sociale (1)** | F | Origine de l’amendement (1) |
|  108 |  142 |  an 35 |  **Raison sociale (2)** |  F | Origine de l’amendement (2) *Ne doit pas être renseigné si la donnée « Raison sociale (1) » est non renseignée* |
| 143 | 177 | an 35 | **Adresse Rue (1)** | F | Adresse Rue origine de l’amendement (1) |
| 178 | 212 | an 35 | **Adresse Rue (2)** | F | Adresse Rue origine de l’amendement (2) *Ne doit pas être renseigné si « Adresse Rue (1) » est non renseigné* |
| 213 | 247 | an 35 | **Ville** | F | Ville origine de l’amendement |
| 248 | 256 | an 9 | **Code postal** | F | Code postal origine de l’amendement |
| 257 | 258 | an 2 | **Pays** | F | Code ISO du pays origine de l’amendement (FR : France) |

### **FLAG « PA » \- Analyse – de 0 à 99 itérations par parcelle**

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | ----- | :---- | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 49 | an 35 | **N° de bordereau d’analyse de sol** | O |  |
| 50 | 58 | an 9 | **Identification du laboratoire d’analyse** | F | Code SIREN |
| 59 | 93 | an 35 | **Raison sociale (1)** | F | Laboratoire |
|  94 |  128 |  an 35 |  **Raison sociale (2)** |  F | Laboratoire *Ne doit pas être renseigné si la donnée « Raison sociale (1) » est non renseignée* |
| 129 | 163 | an 35 | **Adresse Rue (1)** | F | Adresse Rue laboratoire (1) |
|  164 |  198 |  an 35 |  **Adresse Rue (2)** |  F | Adresse Rue laboratoire (2) *Ne doit pas être renseigné si « Adresse Rue (1) » est non renseigné* |
| 199 | 233 | an 35 | **Ville** | F | Ville du laboratoire |
| 234 | 242 | an 9 | **Code postal** | F | Code postal du laboratoire |
| 243 | 244 | an 2 | **Pays** | F | Code ISO pays du laboratoire (FR : France) |
| 245 | 252 | n 8 | **Date d’analyse** | F | SSAAMMJJ |
| 253 | 260 | n 8 | **Date de prélèvement** | F | SSAAMMJJ |

### **FLAG « PV » \- Evènement – de 0 à 9999 itérations par parcelle**

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | ----- | :---- | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 46 | an..32 | **Référence de l’événement** | O | Identification unique de l’événement (code GUID) |
| 47 | 47 | an 1 | **Action sur l’évènement** | F | 2 : Si suppression ou non renseigné |
|  48 |  50 |  an 3 |  **Type d’évènement (en code)** |  O | Voir liste de codes du référentiel Intervention culturale (Type) Fichier excel de référence *: **edaplos.referentiels*** (onglet Intervention Type) |
|  51 |  53 |  an 3 |  **Prévu ou Réalisé (en code)** |  F | Voir liste de codes du référentiel Intervention culturale (Qualifiant) Fichier excel de référence *: **edaplos.referentiels*** (onglet Intervention Qualifiant) |
| 54 | 88 | an 35 | **Intitulé de l’évènement** | F |  |
| 89 | 100 | n 12 | **Date et Heure à laquelle le traitement commence** | F | SSAAMMJJHHmm Si l’heure ne peut être spécifiée : Indiquer 0000 |
| 101 | 112 | n 12 | **Date et Heure à laquelle le traitement prend fin** |  | SSAAMMJJHHmm Si l’heure ne peut être spécifiée : Indiquer 0000 |
| 113 | 118 | n 6 | **Durée du traitement** | F | En jour, heure, minute Ex : 010430 – 1 jour 4 heures et 30 minutes |
| 119 | 126 | n 8 | **Date de préconisation** | F | SSAAMMJJ |
|  127 |  129 |  an 3 |  **Stade de la culture (en code)** |  F | Codification obsolète Renseigner la codification des stades en utilisant la codification BBCH au niveau des caractères 485-494 🡪 **Codes Stades de Cultures v095** |
| 130 | 164 | an 35 | **Précision sur le stade de culture** | F |  |
| 165 | 167 | an 3 | **Type de travail (en code)** | F | Voir liste de codes du référentiel Type de travail Fichier excel de référence : ***edaplos.referentiels*** (onglet Type de travail) |
| 168 | 202 | an 35 | **Complément infos sur le type de travail** | F |  |
|  203 |  205 |  an 3 |  **Motivation** |  F | Voir liste de codes du référentiel Intervention culturale (Justification) / Culture (Justification) Fichier excel de référence *: **edaplos.referentiels*** (onglet Motivation) |
| 206 | 240 | an 35 | **Complément info sur motivation** | F |  |
| 241 | 243 | an 3 | **Type d’opérateur (en code)** | F | ZHM : Opérateur interne ZHN : Opérateur externe |
| 244 | 261 | an 20 | **N° licence opérateur** | F |  |
| 262 | 298 | an 35 | **Nom de l’opérateur** | F |  |
|  299 |  301 |  an 3 |  **Conditions météo** |  F | Voir liste de codes du référentiel Conditions de l’intervention Fichier excel de référence : ***edaplos.referentiels*** (onglet Conditions de l’intervention) |
|  302 |  304 |  an 3 |  **Traitements spéciaux** |  F | **ZKF** : Traitement localisé **ZKG** : Traitement en plein **ZKH** : Désodorisation |
| 305 | 305 | an 1 | **Signe de la température** |  | \+ ou \- \* |
| 306 | 308 | n 3 | **Température extérieure** | F | En degrés Celsius |
| 309 | 311 | n 3 | **Pourcentage d’hygrométrie** | F | En Pourcentage |
| 312 | 320 | n 9 | **Quantité de bouillie visée par hectare** | F |  |
| 321 | 323 | an 3 | **Unité de mesure de la quantité de bouillie visée par hectare** | F | Voir liste de codes du référentiel Unité de mesure Fichier excel de référence : ***edaplos.referentiels*** (onglet Unité de mesure) |
| 324 | 332 | n 9 | **Quantité de bouillie effective par hectare** | F |  |
| 333 | 335 | an 3 | **Unité de mesure de la quantité de bouillie effective par hectare** | F | Voir liste de codes du référentiel Unité de mesure Fichier excel de référence : ***edaplos.referentiels*** (Unité de mesure) |
| 336 | 344 | n 9 | **Surface couverte par l’évènement** | F | En hectares |
| 345 | 414 | an 70 | **Commentaires** | F |  |
| 415 | 484 | an 70 | **Commentaires** | F |  |
| 485 | 494 | an10 | **Codes Stades de Cultures v095** | F | Voir liste de codes du référentiel Stades de la culture (BBCH) Fichier excel de référence : ***BBCH\_stades*** |

**Règles sur l’identification des évènements :**

➡️ Un évènement est identifié par code GUID en 32 an (hexadécimale – 0 à 9 – A à F) géré par l’ordinateur.

A l’export, contrôle du nombre et type de caractères du GUID.

A l’import, si le GUID est faux (nombre et type de caractères), rejet possible de l’événement sauf gestion de l’historique événement sur 30 ans.

➡️ L’identifiant unique correspond à la concaténation du numéro d’identification et du code parcelle. Il est unique pour une même parcelle culturale. ➡️ Lorsque l’ordinateur de gestion gère un évènement multi-parcelles, il procédera à un découpage par parcelle culturale avant l’envoi du fichier.

**Règles sur le découpage des évènements :**

➡️ Lorsqu’un évènement est découpé dans le temps (à cause de la météo par exemple), il s’agira du choix de l’agriculteur (délibéré ou imposé par un contrat de production) de déclarer un ou deux évènements. Si l’agriculteur ne découpe pas l’évènement, il n’y aura pas d’identifiant des périodes intermédiaires.

➡️ Lorsqu’il y a deux engins agricoles en même temps sur la même parcelle, l’agriculteur décide s’il s’agit d’un ou de deux évènements.

**Autres règles de gestion des évènements :**

➡️ Si une même intervention est réalisée dans plusieurs parcelles, on considère, au niveau de l’échange, qu’il y a autant d’évènements que de parcelles culturales concernées, sans indication de lien entre ces évènements.

➡️ Une observation pourra être enregistrée en tant qu’évènement (par exemple « tour de plaine »)

➡️ L’indicateur de décision pourra être mentionné de trois façons non exclusives :

- sous forme simplifiée avec le code de la motivation

- sous une forme plus détaillée dans un événement à part entière. Dans ce cas, l’événement qui en résulte (traitement après tour de plaine par exemple) comportera les liens aux évènements de type « indicateur de décision » qui seraient à l’origine de la décision.

- Sous forme d’un libellé

  ➡️ La codification prioritaire pour renseigner le stade de culture est la codification BBCH à renseigner au niveau du code Stades de cultures v0.95 (caractères 485-494) par rapport à la codification Stade de culture (en code) (caractères 127-129**).**

### **FLAG « VC » \- Coordonnées géographique – de 0 à 9999 itérations**

| Début | Fin | Format | Libellé | O/F | Remarques |
| :---: | :---: | :---: | ----- | :---- | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 46 | an 32 | **Référence de l’événement** | O | Idem enregistrement “PV” |
| 47 | 49 | an 3 | **Qualifiant de la position géographique** | O | Voir règle de gestion sur les coordonnées géographique |
| 50 | 60 | an 11 | **Longitude** | O | 7 entiers « . » 3 décimales |
| 61 | 70 | an 10 | **Latitude** | O | 7 entiers « . » 2 décimales |
| 71 | 88 | n..18 | **Altitude** | F | 7 entiers « . » 3 décimales |

➡️ Pour qualifier la position géographique, utilisation des coordonnées suivantes :
- 3 : Coordonnées géographiques d’1 point en coordonnées LAMBERT 2 étendu
- 4 : Coordonnées géographiques d’1 point en coordonnées WGS84
- 5 : Coordonnées en Lambert 93 (système géographique officiel Français servant de référence)

➡️ Formats des coordonnées :
- Lambert2 ou Lambert 93 : 7.2 avec un séparateur décimal
- WGS84 (° ' '') : 7.3 et 7.2 en an pour les valeurs respectives de la longitude et de la latitude (ex : la longitude est en 999°99'99'' et 3 décimales pour les millièmes de secondes, soit un format de 9999999.999)

**FLAG « VB » \- Cible évènement – de 0 à 99 itérations**

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | ----- | :---- | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 46 | an 32 | **Référence de l’événement** | O | Idem enregistrement “PV” |
|  47 |  49 |  an 3 |  **Cible de l’intervention v0.94** |  F | Codification obsolète Renseigner la cible de l’intervention au niveau du caractère 50-61 **Cible de l’intervention v0.95** |
|  50 |  61 |  an12 |  **Cible de l’intervention v0.95** |  F | Voir liste de codes du référentiel Nuisibles des cultures – Cibles (maladie/ravageurs) Fichier excel de référence : ***ListeCiblesActivités*** |

La codification de la cible de l’intervention v0.95 (caractères 50 à 61\) est prioritaire sur l’ancienne codification de la cible de l’intervention v0.94 (caractère 47 à 49).

### **FLAG « VI » \- Intrant – de 0 à n itérations par évènement**

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | ----- | :---- | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 46 | an 32 | **Référence de l’événement** | O | Idem enregistrement “PV” |
| 47 | 49 | an 3 | **Type d’intrant** | O | Voir liste de codes du référentiel Intrant (type) Fichier excel de référence : ***edaplos.referentiels** (onglet Intrant Type)* |
| 50 | 119 | an 70 | **Libellé intrant** | F |  |
| 120 | 132 | an 13 | **Code EAN du produit** | F | Pas d’usage connu dans les échanges |
|  133 |  167 |  an 35 |  **Code AMM du produit** |  F | **Obligatoire** uniquement si la donnée Type d’intrant correspond à un produit phytosanitaire ou un adjuvant concerné par numéro d’AMM (voir tableau de correspondance en **annexe 1**). |
| 168 | 174 | an 7 | **Code GNIS** | F | **Obligatoire** si la donnée Type d’intrant \= ZJF (semence) ou ZJT (plants) (voir tableau de correspondance en **annexe 1**) |
|  175 |  177 |  an 3 |  **Code Apport Organique** |  F | **Obligatoire** si la donnée Type d’intrant correspond à un apport organique (voir tableau de correspondance en annexe 1). Dans ce cas utiliser la liste des codes du référentiel Intrant (qualifiant) spécifiés en **Annexe 2** Fichier excel de référence *: **edaplos.referentiels** (onglet Intrants Qualifiant)* |
| 178 | 180 | an 3 | **Code eau** | F | **Obligatoire** si Type d’intrant \= ZJE (irrigation). Indiquer le code **EAU** |
| 181 | 183 | an 3 | **Code adjuvant** | F | Obligatoire si Type d’intrant \= ZJA (Divers (huile)). Indiquer le code **ADJ** |
|  184 |  186 |  an 3 |  **Code calco-magnésien (en code)** |  F | **Obligatoire** si Type d’intrant \= ZKE (Amendement Calco-magnésien) Dans ce cas utiliser la liste des codes du référentiel Intrants (Qualifiant) spécifiés en **Annexe 3** Fichier excel de référence *: **edaplos.referentiels** (onglet Intrants Qualifiant)* |
|  187 |  189 |  an 3 |  **Qualifiant (1) de l’effluent (en code)** |  F | Voir liste de codes du référentiel Intrants (Qualifiant) spécifiés en **Annexe 4** Fichier excel de référence *: **edaplos.referentiels** (onglet Intrants Qualifiant)* |
|  190 |  192 |  an 3 |  **Qualifiant (2) de l’effluent (en code)** |  F | Voir liste de codes du référentiel Intrants (Qualifiant) spécifiés en **Annexe 4** Fichier excel de référence *: **edaplos.referentiels** (onglet Intrants Qualifiant)* |
|  193 |  195 |  an 3 |  **Qualifiant (3) de l’effluent (en code)** |  F | Voir liste de codes du référentiel Intrants (Qualifiant) spécifiés en **Annexe 4** Fichier excel de référence *: **edaplos.referentiels** (onglet Intrants Qualifiant)* |
|  196 |  198 |  an 3 |  **Qualifiant (4) de l’effluent (en code)** |  F | Voir liste de codes du référentiel Intrants (Qualifiant) spécifiés en **Annexe 4** Fichier excel de référence *: **edaplos.referentiels** (onglet Intrants Qualifiant)* |
|  199 |  201 |  an 3 |  **Qualifiant (5) de l’effluent (en code)** |  F | Voir liste de codes du référentiel Intrants (Qualifiant) spécifiés en **Annexe 4** Fichier excel de référence *: **edaplos.referentiels** (onglet Intrants Qualifiant)* |
|  202 |  204 |  an 3 |  **Qualifiant semence (1) (en code)** |  F | Voir liste de codes du référentiel Intrants (Qualifiant) spécifiés en **Annexe 5** Fichier excel de référence *: **edaplos.referentiels** (onglet Intrants Qualifiant)* |
|  205 |  207 |  an 3 |  **Qualifiant semence (2) (en code)** |  F | Voir liste de codes du référentiel Intrants (Qualifiant) spécifiés en **Annexe 5** Fichier excel de référence *: **edaplos.referentiels** (onglet Intrants Qualifiant)* |
|  208 |  210 |  an 3 |  **Qualifiant semence (3) (en code)** |  F | Voir liste de codes du référentiel Intrants (Qualifiant) spécifiés en **Annexe 5** Fichier excel de référence *: **edaplos.referentiels** (onglet Intrants Qualifiant)* |
| 211 | 219 | n 9 | **Quantité totale effective intrant** | O |  |
|  220 |  222 |  an 3 |  **Unité de mesure (en code)** |  O | Voir liste de codes du référentiel Unité de mesure Fichier excel de référence : ***edaplos.referentiels** (onglet unité de mesure)* |
| 223 | 231 | n 9 | **Quantité effective par hectare** | F |  |
|  232 |  234 |  an 3 |  **Unité de mesure (en code)** |  F | Obligatoire si « Quantité effective par hectare » est renseignée Voir liste de codes du référentiel Unité de mesure Fichier excel de référence : ***edaplos.referentiels** (onglet unité de mesure)* |
| 235 | 243 | n 9 | **Dose hectare visée** | F |  |
|  244 |  246 |  an 3 |  **Unité de mesure (en code)** |  F | Obligatoire si «Dose hectare visée» est renseignée. Voir liste de codes du référentiel Unité de mesure Fichier excel de référence : ***edaplos.referentiels** (onglet unité de mesure)* |
| 247 | 252 | n 6 | **Nombre de passages préconisés** | F | 2 décimales maxi |
| 253 | 287 | an 35 | **Raison sociale (1)** | F | Origine de l’effluent (1) |
|  288 |  322 |  an 35 |  **Raison sociale (2)** |  F | Origine de l’effluent (2) *Ne doit pas être renseigné si la donnée « Raison sociale (1) » est non renseignée* |
| 323 | 357 | an 35 | **Adresse Rue (1)** | F | Adresse Rue origine de l’effluent (1) |
| 358 | 392 | an 35 | **Adresse Rue (2)** | F | Adresse Rue origine de l’effluent (2) *Ne doit pas être renseigné si « Adresse Rue (1) » est non renseigné* |
| 393 | 427 | an 35 | **Ville** | F | Ville origine de l’effluent |
| 428 | 436 | an 9 | **Code postal** | F | Code postal origine de l’effluent |
| 437 | 438 | an 2 | **Pays** | F | Code ISO du pays origine de l’effluent (FR : France) |
| 439 | 447 | n 9 | **Densité volumique de l’intrant** | F | En kg/L (essentiellement pour les engrais liquide) |

➡️ Une semence traitée verra autant d’itérations que de constituants :

- Une itération pour la semence, avec le numéro de lot (Flag IL) et quantités.
- 1 à n itérations supplémentaire pour chaque produit de traitement.
- Les quantités ou doses peuvent être égales à zéro (concerne les traitements).

Ex : 1 semence de blé traité avec 2 traitements de semence : 1 itération pour qualifier la semence, 1 itération pour le 1er traitement de semence et 1 itération pour le 2ème traitement de semence.

➡️ Déclaration d’un intrant :

- Pour un produit phytosanitaire ou un adjuvant avec AMM (voir tableau de correspondance en Annexe 1), le code AMM doit obligatoirement être indiqué. Il est renseigné sous la forme de 7 caractères numériques.

- Pour une semence ou un plant (voir tableau de correspondance en Annexe 1\) :
  * Si la variété est codée par le GNIS : le code GNIS est obligatoire. il est renseigne sous la forme de 7 caractères alphanumériques (3 chiffres \+ 4 lettres ou chiffres).
  * Si la variété n’est pas référencée au GNIS, le libellé de l’intrant (caractères 50 à 119\) doit être renseigné.

- Pour un effluent d’élevage (voir tableau de correspondance en Annexe 1), le code apport organique est obligatoire, voir liste en annexe 2\.

Il est possible de qualifier plus précisément l’effluent au niveau de 5 segments « qualifiant de l’effluent » en utilisant les codes disponibles en annexe 4\.

- Pour l’irrigation, le code « **EAU** » (code AEE) doit être renseigné au niveau du code EAU (caractères 178 à 180\)

- Pour les adjuvants :
  * Le code AMM s’il existe est obligatoire (cas du code ZQG (Adjuvant))
  * Pour les adjuvants n’ayant pas de code AMM (cas du code ZJA (Divers (huiles)), le code « **ADJ** » sera renseigné au niveau des caractères 181-183.

- Pour les amendements calco-magnésiens (code ZKE au niveau du type d’intrant), le code calco-magnésien (AEE) est obligatoire (Annexe 3\) au niveau des caractères 184-186, la composition est facultative mais permet de fournir plus d’informations.

- Pour un engrais minéral ou organo-minéral, on indique sa composition au niveau du FLAG IC.

➡️ Semis :

- La quantité de semence est à renseigner en nombre de grains, plants (code NAR \= unité de la quantité de semence) ou kilogramme (Code KGM)

- La semence peut être qualifiée au niveau de 3 segments « Qualifiant semence » en utilisant les codes disponibles en annexe 5\.

➡️ Les quantités pourront être exprimées avec 3 décimales au maximum sauf dans le cas du « nombre de passage préconisé » où la quantité comportera au maximum 2 décimales

Exemple : Un passage 1 rang sur 2 sera exprimé : 0.5 Un passage 1 rang sur 3 sera exprimé : 0.33

### **FLAG « IC » \- Composition du produit en cas de fertilisation minérale – de 0 à 10 itérations par intrant**

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | :---- | :---- | :---- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 46 | an 32 | **Référence de l’événement** | O | Idem enregistrement “PV” |
|  47 |  49 |  an 3 |  **Code du composant** |  O | Voir liste de codes du référentiel Composition chimique Fichier excel de référence : ***edaplos.referentiels** (onglet composition chimique)* |
|  50 |  58 |  n 9 |  **Teneur** |  O | En unité d’éléments fertilisants par unité de fertilisants Rapportée à l’unité de mesure de la quantité totale effective d’intrant du flag VI position 220 à 22 Cas particulier Solution azoté (Voir exemple règle de gestion). |

➡️ ***Composition des engrais***

Le renseignement de la composition est obligatoire pour les engrais minéraux et organo-minéraux. Il est facultatif pour les engrais organiques et les amendements calco-magnésiens.

*Remarque :*  
Si une teneur n’est pas renseignée, ne rien mettre.  
Si une teneur est égale à zéro (préciser le code du composant et indiquez 0 dans la Teneur)

*Cas particulier :* Expression de la composition d'une solution azotée 39\.  
Une solution azotée aura comme composition 39 unités de N total pour 100l tansdis qu’elle aura 30 unités de N total pour 100kg, en sachant que sa densité est de 1.3.

Selon le code de l'unité de mesure de la quantité totale effective (code position 220 à 222 dans le flag VI), la valeur de la teneur sera la suivante :

- Si code LTR 🡪 0.39 unités d'azote total / l 🡪 Indiquez la valeur 0.39

- Si code KGM 🡪 0.3 unités d'azote total / Kg 🡪 Indiquez la valeur 0.3

Par ailleurs le champ Densité volumétrique de l'intrant du flag VI position 439 à 447 verra comme valeur renseignée 1.3.

Cette valeur permettra aux SI en import de pouvoir réaliser une conversion de composition selon comment ils ont renseigné la composition du produit équivalent.

### **FLAG « IL » \- Lot fabriquant – de 0 à 999 itérations par intrant**

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | :---- | :---- | :---- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 46 | an 32 | **Référence de l’événement** | O | Idem enregistrement “PV” |
| 47 | 81 | an35 | **Code produit** | F | Idem enregistrement “VI” |
| 82 | 116 | an 35 | **N° de lot du fabriquant de l’intrant** | F |  |
| 117 | 125 | n 9 | **Quantité par lot** | F |  |
|  126 |  128 |  an 3 |  **Unité de mesure** |  F | Obligatoire si Quantité par lot est renseignée Voir liste de codes du référentiel Unité de mesure Fichier excel de référence : ***edaplos.referentiels** (onglet unité de mesure)* |
| 129 | 137 | n9 | **PMG (Poids de Mille Grains)** | F |  |
|  138 |  140 |  an3 |  **Unité de mesure** |  F | Obligatoire si PMG renseigné Voir liste de codes du référentiel Unité de mesure Fichier excel de référence : ***edaplos.referentiels** (onglet unité de mesure)* |

➡️ Indication du PMG (Poids de Mille Grains) pour les semences

### **FLAG « IA » \- Analyse d'effluent – de 0 à 99 itérations par intrant**

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | ----- | :---- | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 46 | an 32 | **Référence de l’événement** | O | Idem enregistrement “PV” |
| 47 | 81 | an 35 | **N° de bordereau d’analyse** | O |  |
| 82 | 90 | an 9 | **Identification du laboratoire d’analyse** | F | Code SIREN |
| 91 | 125 | an 35 | **Raison sociale (1)** | F | Nom du Laboratoire |
|  126 |  160 |  an 35 |  **Raison sociale (2)** |  F | Laboratoire *Ne doit pas être renseigné si la donnée « Raison sociale (1) » est non renseignée* |
| 161 | 195 | an 35 | **Adresse Rue (1)** | F | Adresse Rue laboratoire (1) |
|  196 |  230 |  an 35 |  **Adresse Rue (2)** |  F | Adresse Rue laboratoire (2) *Ne doit pas être renseigné si « Adresse Rue (1) » est non renseigné* |
| 231 | 265 | an 35 | **Ville** | F | Ville du laboratoire |
| 266 | 274 | an 9 | **Code postal** | F | Code postal du laboratoire e |
| 275 | 276 | an 2 | **Pays** | F | Code ISO pays du laboratoire (FR : France) |
| 277 | 284 | n 8 | **Date d’analyse** | F | SSAAMMJJ |
| 285 | 292 | n 8 | **Date de prélèvement** | F | SSAAMMJJ |

### **FLAG « VR » \- Récolte – de 0 à n itérations par évènement**

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | ----- | :---- | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | **F** | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | **O** | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | **O** | Idem enregistrement “DP” |
| 15 | 46 | an 32 | **Référence de l’événement** | O | Idem enregistrement “PV” |
|  47 |  49 |  an 3 |  **Produit principal ou co-produit** |  **O** | Voir liste de codes du référentiel Produit récolté (Type) Fichier excel de référence : ***edaplos.referentiels** (onglet produit récolté type)* |
|  50 |  52 |  an 3 |  **Code produit récolté (en code)** |  **F** | Voir liste de codes du référentiel Cultures (utilisation du **code espèce botanique**) Fichier excel de référence ***: Listecultures\_AEE*** |
| 53 | 87 | an 35 | **Libellé du produit** | **F** | Obligatoire si code produit est non renseigné |
|  88 |  90 |  an 3 |  **Destination produit ou co-produit (en code)** |  **F** | Voir liste de codes du référentiel Produit récolté (destination) Fichier excel de référence ***: edaplos.referentiels** (onglet produit récolté destination)* |
| 91 | 99 | n 9 | **Quantité récoltée** | **F** |  |
|  100 |  102 |  an 3 |  **Unité de mesure** |  **F** | Obligatoire si quantité récoltée renseignée Voir liste de codes du référentiel Unité de mesure Fichier excel de référence : ***edaplos.referentiels** (onglet unité de mesure)* |
| 103 | 111 | n 9 | **Rendement calculé** | **F** |  |
|  112 |  114 |  an 3 |  **Unité de mesure** |  **F** | Obligatoire si Rendement calculé renseigné Voir liste de codes du référentiel Unité de mesure Fichier excel de référence : ***edaplos.referentiels** (onglet unité de mesure)* |
| 115 | 123 | n 9 | **Rendement estimé** | **F** |  |
|  124 |  126 |  an 3 |  **Unité de mesure** |  **F** | Obligatoire si Rendement estimé renseigné. Voir liste de codes du référentiel Unité de mesure Fichier excel de référence : ***edaplos.referentiels** (onglet unité de mesure)* |

### **FLAG « RL » \- Lot Récolte – de 0 à 999 itérations par récolte**

| Début | Fin | Format | Libellé | O/F | Remarques |
| :---: | :---: | :---: | ----- | :---- | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 46 | an 32 | **Référence de l’événement** | O | Idem enregistrement “PV” |
| 47 | 81 | an 35 | **N° de lot OS (Organisme Stockeur)** | F | Par exemple : numéro de bon de livraison |
| 82 | 116 | an 35 | **N° de lot Agriculteur** | F | Si stockage en ferme |
| 117 | 125 | n 9 | **Quantité du lot** | F | En Tonnes |

### **FLAG « LC » \- Caractérisation du produit récolté pour le lot – de 0 à 10 itérations par évènement**

| Début | Fin | Format | Libellé | O/F | Remarques |
| :---: | :---: | :---: | :---: | :---: | ----- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 46 | an 32 | **Référence de l’événement** | O | Idem enregistrement “PV” |
| 47 | 49 | an 3 | **Type Caractéristique (en code)** | O | Voir liste de codes du référentiel Caractéristiques techniques (code) spécifiés en **annexe 6\.** Fichier Excel de référence **: *edaplos.referentiels*** (onglet caractéristique technique code) |
| 50 | 58 | n 9 | **Valeur de la caractéristique** | O |  |
| 59 | 61 | an 3 | **Unité de mesure** | O | Voir liste de codes du référentiel Unités de mesure **Fichier excel de référence : *edaplos.referentiels*** (onglet unité de mesure) |

### **FLAG « VH » \- Historique Indicateur de décision – de 0 à 1 itération par évènement**

| Début | Fin | Format | Libellé | O/F | Remarques |
| ----- | ----- | ----- | :---- | :---- | :---- |
| 3 | 6 | n 4 | **N° d’ordre de la parcelle** | F | Idem enregistrement “DP” |
| 7 | 10 | an 4 | **Référence parcelle culturale** | O | Idem enregistrement “DP” |
| 11 | 14 | n 4 | **Année prévue de récolte** | O | Idem enregistrement “DP” |
| 15 | 46 | an 32 | **Référence de l’événement** | O | Idem enregistrement “PV” |
|  47 |  49 |  an 3 |  **Type de lien (en code)** |  O | Voir liste de codes du référentiel Type de lien (code) Fichier Excel de référence **: *edaplos.referentiels*** (onglet Type de lien (code)) |
| 50 | 81 | an32 | **Référence de l’événement considéré** | F |  |
| 82 | 85 | an 4 | **N° de la parcelle antérieur** | F | Contenant l’indicateur de décision antérieur Obligatoire si même exploitation |
| 86 | 89 | an 4 | **Année de récolte** | F | SSAA (de l’événement antérieur) Obligatoire si même exploitation |
| 90 | 106 | an 17 | **Identification exploitation** | F | Code SIRET ou Code adhérent |
|  107 |  109 |  an 3 |  **Type d’identification** |  F | Obligatoire si identification renseignée 107 : N° de SIRET ZZZ : Défini mutuellement |
| 110 | 144 | an 35 | **Raison sociale (1)** | F | Obligatoire si identification non renseignée Nom de l’exploitation (1) |
|  145 |  179 |  an 35 |  **Raison sociale (2)** |  F | Nom de l’exploitation (2) *Ne doit pas être renseigné si la donnée « Raison sociale (1) » est non renseignée* |
| 180 | 214 | an 35 | **Adresse Rue (1)** | F | Adresse Rue de l’exploitation (1) |
|  215 |  249 |  an 35 |  **Adresse Rue (2)** |  F | Adresse Rue de l’exploitation (2) Ne doit pas être renseigné si « Adresse Rue (1) » est non renseigné |
|  250 |  284 |  an 35 |  **Ville** |  F |  Ville de l’exploitation |
|  285 |  293 |  an 9 |  **Code postal** |  F |  Code postal de l’exploitation |
|  294 |  295 |  an 2 |  **Pays** |  F | Code ISO du pays de l’exploitation (FR : France) |
|  296 |  365 |  an 70 |  **Informations parcelle non EDI (1)** |  F | A renseigner dans le cas de l’usage du code ZL4 au niveau du type de lien |
|  366 |  435 |  an 70 |  **Informations parcelle non EDI (2)** |  F | A renseigner dans le cas de l’usage du code ZL4 au niveau du type de lien |

### **ANNEXE 1 : Codification à renseigner en fonction du type d'intrant sélectionné**

| Codes AEE \- Type d'intrant (FLAG VI \- caractères 47- 49\) |  Libellé Type d'intrant | Code AMM obligatoire (caractères 133-167) | Code GNIS obligatoire (caractères 168-174) | Code apport organique obligatoire (caractères 175-177) | Code EAU obligatoire (caractères 178-180) | Code adjuvant obligatoire (caractères 181-183) | Code calco- magnésien obligatoire (caractères 184-186) |
| :---: | :---- | ----- | ----- | ----- | ----- | ----- | :---- |
| **ZIU** | Herbicide | X |  |  |  |  |  |
| **ZIV** | Fongicide | X |  |  |  |  |  |
| **ZIW** | Insecticide | X |  |  |  |  |  |
| **ZIX** | Molluscicide / hélicide | X |  |  |  |  |  |
| **ZIY** | Nématicide | X |  |  |  |  |  |
| **ZIZ** | Régulateur | X |  |  |  |  |  |
| **ZJA** | Divers (huiles) |  |  |  |  | ADJ |  |
| **ZJB** | Effluents d'élevage |  |  | Voir code en Annexe 2 |  |  |  |
| **ZJC** | Fertilisation minérale |  |  |  |  |  |  |
| **ZJD** | Fertirrigation |  |  | Voir code en Annexe 2 |  |  |  |
| **ZJE** | Irrigation |  |  |  | EAU |  |  |
| **ZJF** | Semence |  | X |  |  |  |  |
| **ZJG** | Traitement de semence | X |  |  |  |  |  |
| **ZJJ** | Acaricides | X |  |  |  |  |  |
| **ZJK** | Bactéricides | X |  |  |  |  |  |
| **ZJL** | Moyens biologiques | X |  |  |  |  |  |
| **ZJN** | Rodenticides | X |  |  |  |  |  |
| **ZJO** | Taupicides | X |  |  |  |  |  |
| **ZJP** | Corvicides | X |  |  |  |  |  |
| **ZJQ** | Corvifuges | X |  |  |  |  |  |
| **ZJR** | Répulsifs oiseaux-gibiers | X |  |  |  |  |  |
| **ZJS** | Substance de croissance | X |  |  |  |  |  |

| Codes AEE \- Type d'intrant (FLAG VI \- caractères 47- 49\) |  Libellé Type d'intrant | Code AMM obligatoire (caractères 133-167) | Code GNIS obligatoire (caractères 168-174) | Code apport organique obligatoire (caractères 175-177) | Code EAU obligatoire (caractères 178-180) | Code adjuvant obligatoire (caractères 181-183) | Code calco- magnésien obligatoire (caractères 184-186) |
| :---: | :---- | ----- | ----- | ----- | :---- | ----- | :---- |
| **ZJT** | Plants |  | X |  |  |  |  |
| **ZKA** | Sous-produits et déchets issus de filières alimentaires |  |  | Voir code en Annexe 2 |  |  |  |
| **ZKB** | Sous-produits et déchets issus de filières non alimentaires |  |  | Voir code en Annexe 2 |  |  |  |
| **ZKC** | Boues résiduaires de station d'épuration et de compost urbain |  |  | Voir code en Annexe 2 |  |  |  |
| **U64** | Boues résiduaires de station d'épuration et de compost d'industrie |  |  | Voir code en Annexe 2 |  |  |  |
| **ZKD** | Fertilisation minérale type Bulk |  |  |  |  |  |  |
| **ZQG** | Adjuvants | X |  |  |  |  |  |
| **ZSU** | Fertilisation organo-minérale |  |  | Voir code en Annexe 2 |  |  |  |
| **ZMT** | Inhibiteurs de germination | X |  |  |  |  |  |
| **ZKE** | Amendements calco-magnésiens |  |  |  |  |  | Voir code en Annexe 1 |
| **U60** | Eléments fertilisants préconisés |  |  |  |  |  |  |
| **U61** | BIOCIDE | X |  |  |  |  |  |
| **U62** | Stimulateur des défenses naturelles | X |  |  |  |  |  |

### **ANNEXE 2 : Liste Codes pour la donnée "apport organique", si type d’intrant correspond à fertilisation organique**

| Codes AEE | Libellés |
| :---: | ----- |
| **SCA** | **Fumier de bovins** |
| **SCB** | **Lisiers de bovins** |
| **SCC** | **Purin de bovins** |
| **SCD** | **Fumier de porcins** |
| **SCE** | **Lisier de porcins** |
| **SCF** | **Fumier d'ovins** |
| **SCG** | **Lisier d'ovins** |
| **SCH** | **Fumier de caprins** |
| **SCI** | **Lisier de caprins** |
| **SCJ** | **Fumier de chevaux** |
| **SCK** | **Fumier de dindes** |
| **SCL** | **Fientes de dinde** |
| **SCM** | **Lisier de dindes** |
| **SCN** | **Lisier de canards** |
| **SCO** | **Fumier de canards** |
| **SCP** | **Lisier de pintades** |
| **SCQ** | **Fientes de pintades** |
| **SCR** | **Fumier de pintades** |
| **SCS** | **Fientes de poules pondeuses** |
| **SCT** | **Fumier de poules pondeuses** |
| **SCZ** | **Lisier de poules pondeuses** |
| **SCU** | **Fumier de poulets de chair** |
| **SCV** | **Fientes fraîches de poulets de chair** |
| **SCW** | **Lisier de poulets de chair** |
| **SCY** | **Lisier de lapins** |
| **SDA** | **Vinasses de betteraves** |
| **SDB** | **Ecumes de sucreries** |
| **SDC** | **Fumier de champignons** |
| **SDD** | **Lombricompost** |
| **SDE** | **Tourbe** |
| **SDF** | **Refus de tamisage fumier de porc** |
| **SDG** | **Soluble de pomme de terre** |
| **SDH** | **Marc de raisin** |
| **SDI** | **Compost de déchet vert** |
| **SDJ** | **Autres sous produits et déchets issus des filières alimentaires** |
| **SDK** | **Carbonate de Calcium** |
| **SDL** | **Boue d'épuration** |
| **SDQ** | **Effluents viticoles** |
| **SDR** | **Compost urbain** |
| **SDS** | **Autres boues résiduaires de station d'épuration et de compost urbain** |
| **SDT** | **Terre de récupération** |
| **SDU** | **Eaux de lavage** |
| **SDV** | **Eaux de lavage produits terreux** |
| **SDW** | **Eaux de lavage produits non terreux** |
| **SDX** | **Autres sous-produits et déchets de filières non alimentaires** |
| **SDY** | **Boues de papeterie** |
| **ZOK** | **Lisier de veau** |

### **ANNEXE 3 : Liste codes pour la donnée Calco-magnésien Si type intrant \= ZKE (Amendement calco-magnésien)**

| Codes AEE | Libellés |
| :---: | ----- |
| **U01** | **Craie** |
| **U02** | **Maërl** |
| **U03** | **Marne** |
| **U04** | **Dolomie** |
| **SDK** | **Carbonate de Calcium** |
| **U05** | **Carbonate de magnésium** |
| **U06** | **Chaux vive** |
| **U07** | **Chaux éteinte** |
| **U08** | **Chaux calcique** |
| **U09** | **Chaux magnésienne** |
| **U10** | **Chaux calco-magnésienne** |
| **U11** | **Amendement calcique mixte** |
| **U12** | **Amendement magnésien mixte** |
| **SDB** | **Ecumes de sucrerie** |
| **U14** | **Amendement basique sidérurgique** |
| **U15** | **Craie broyée** |
| **U16** | **Craie phosphatée** |
| **U17** | **Coquilles d’œufs** |
| **U18** | **Autre amendement calco-magnésien** |

### **ANNEXE 4 : Liste codes pour les segments Qualifiant de l'effluent**

| Codes AEE | Libellés |
| :---: | ----- |
| **SJA** | **pur** |
| **SJB** | **dilué** |
| **SJC** | **très dilué (non couvert)** |
| **SJD** | **très pailleux** |
| **SJE** | **composté sec** |
| **SJF** | **composté humide** |
| **SJG** | **pas de compost** |
| **SJH** | **engraissement** |
| **SJI** | **litière accumulée** |
| **SJJ** | **litière raclée** |
| **SJK** | **mous de logette** |
| **SJL** | **étable entravée** |
| **SJM** | **pente paillée** |
| **SJN** | **alimentation classique** |
| **SJO** | **alimentation biphase** |
| **SJP** | **paille** |
| **SJQ** | **sciure** |
| **SJR** | **copeaux** |
| **SJS** | **% Matière sèche** |
| **SJT** | **label (oui/non)** |
| **SJU** | **chaulée (oui/non)** |
| **SJV** | **origine urbaine** |
| **SKA** | **origine papeterie** |
| **SKB** | **origine laiterie** |
| **SKC** | **abattoir** |
| **SKD** | **brut** |
| **SKE** | **centrifugé** |
| **SKF** | **humides** |
| **SKG** | **préséchées** |
| **SKH** | **séchées** |
| **SKI** | **avant stockage** |
| **SKJ** | **après stockage conditions humides** |
| **SKK** | **après stockage conditions sèches** |
| **SKL** | **frais** |
| **SKM** | **mûr** |
| **SKN** | **Solide** |
| **SKO** | **liquide** |
| **SKP** | **Compact** |
| **U51** | **Digestat brut** |
| **U52** | **Digestat liquide** |
| **U53** | **Digestat solide** |

### **ANNEXE 5 : Liste codes pour les segments Qualifiant de la semence**

| Codes AEE | Libellés |
| :---: | ----- |
| **ZQB** | **Non OGM** |
| **ZQC** | **OGM** |
| **ZQA** | **Semences certifiées** |
| **ZQD** | **Semences de ferme** |
| **ZQE** | **Génération G0** |
| **ZQF** | **Génération G1** |
| **ZQG** | **Génération G2** |
| **ZQH** | **Génération G3** |
| **ZQI** | **Génération G4** |
| **ZQJ** | **Génération R1** |
| **ZQK** | **Génération R2** |
| **ZQL** | **Génération R3** |
| **U50** | **Semences non certifiées** |

### **ANNEXE 6 : Liste des code Caractéristiques technique**

| Codes AEE | Libellés |
| :---: | :---- |
| **ZJ2** | **Calibre** |
| **ZJ3** | **PMG (Poids de Mille Grains)** |
| **ZJ4** | **Humidité** |
| **ZJ5** | **PS (Poids Spécifique)** |
| **ZJ6** | **Taux d'impuretés** |
| **ZJ7** | **Taux de Protéines** |
| **ZJ8** | **Calibrage** |
| **ZJ9** | **Taux de MS** |
| **ZK1** | **Taux de nitrates** |

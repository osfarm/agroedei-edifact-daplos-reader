# Agroedei Edifact Daplos Reader

Un package NPM qui lit des fichiers Daplos (.dap) et les convertit en JSON.

Spécification : https://agroedieurope.fr/wp-content/uploads/daplos2024-fp-v09-5.pdf

## Installation

```bash
npm install
```

## Utilisation

### Script de test

Convertir un fichier DAP en JSON :

```bash
node test-convert.js -i <fichier-entree.dap> -o <fichier-sortie.json>
```

Exemple :

```bash
node test-convert.js -i "test/testdata/Gaec du Lunerotte.dap" -o "out/result.json"
```

### Utilisation programmatique

```javascript
import { parseDapDocument, simplifyDapDocumentForExport, parseDaplosFile } from './parse.js';
import fs from 'fs';

// Méthode 1 : À partir d'un Buffer
const buffer = fs.readFileSync('fichier.dap');
const jsonData = parseDaplosFile(buffer);
console.log(jsonData);

// Méthode 2 : À partir d'une chaîne décodée
const decoder = new TextDecoder('windows-1252');
const content = decoder.decode(buffer);
const doc = parseDapDocument(content);
const jsonData = simplifyDapDocumentForExport(doc);
console.log(jsonData);
```

## Format des fichiers DAP

Les fichiers DAP (Daplos) sont des fichiers texte à largeur fixe avec encodage Windows-1252 et fins de ligne CRLF.   
Chaque ligne commence par une clé de 2 caractères, suivie de champs de largeur fixe concaténés sans séparateurs.

La définition des lignes se trouve dans `dict/daplos_2.yml`.

## Structure du projet

- `parse.js` : Module principal de parsing
- `test-convert.js` : Script de test pour la conversion
- `dict/` : Fichiers de référence (cultures, unités, spécifications)
- `test/testdata/` : Fichiers d'exemple
- `out/` : Dossier de sortie pour les fichiers JSON générés


# Agroedei Edifact Daplos Reader

Un package NPM qui lit des fichiers Daplos (.dap) et les convertit en JSON.

## Transformations
- Coordonnées GPS converties en Wgs84
- Dates converties en JSON
- Tous les codes reconnus sont complétés avec les libellés en français correspondants

## Resources and specifications
- https://agroedieurope.fr/les-actions/un-cefact/

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

### Utilisation avec TypeScript

Le module inclut des définitions de types TypeScript pour une utilisation type-safe :

```typescript
import { parseDaplosFile, AEE_CODES } from '@osfarm/agroedei-edifact-daplos-reader';
import type { SimplifiedDapDocument, Crop, Intervention } from '@osfarm/agroedei-edifact-daplos-reader';
import fs from 'fs';

// Parser un fichier DAP
const buffer = fs.readFileSync('fichier.dap');
const data: SimplifiedDapDocument = parseDaplosFile(buffer);

// Accès type-safe aux cultures
data.crops.forEach((crop: Crop) => {
  console.log(`Culture: ${crop.crop_name_fr}`);
  console.log(`Surface: ${crop.area_ha} ha`);
  
  // Accès aux interventions
  crop.interventions?.forEach((intervention: Intervention) => {
    console.log(`  ${intervention.date}: ${intervention.nature_label}`);
  });
});

// Accès aux codes AEE
const inputNatures = AEE_CODES.input_nature;
console.log(inputNatures['ZIU']); // "Herbicide"
```

Types disponibles :
- `SimplifiedDapDocument` : Structure complète du document parsé
- `Crop` : Informations sur une culture/parcelle
- `Intervention` : Opération agricole effectuée
- `Input` : Intrant utilisé dans une intervention
- `FieldPoint` : Point GPS d'une parcelle
- `Coordinate` : Coordonnées [longitude, latitude] en WGS84



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


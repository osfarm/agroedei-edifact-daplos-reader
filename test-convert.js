#!/usr/bin/env node

import { parseDapDocument, simplifyDapDocumentForExport } from './parse.js';
import fs from 'fs';
import path from 'path';

/**
 * Script de test pour convertir un fichier DAP en JSON
 * 
 * Usage: node test-convert.js -i <input-file> -o <output-file>
 */

// Parse command line arguments
const args = process.argv.slice(2);
let inputFile = null;
let outputFile = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '-i' && i + 1 < args.length) {
    inputFile = args[i + 1];
    i++;
  } else if (args[i] === '-o' && i + 1 < args.length) {
    outputFile = args[i + 1];
    i++;
  }
}

if (!inputFile || !outputFile) {
  console.error('Usage: node test-convert.js -i <input-file> -o <output-file>');
  console.error('');
  console.error('Example:');
  console.error('  node test-convert.js -i "test/testdata/Gaec du Lunerotte.dap" -o out/result.json');
  process.exit(1);
}

try {
  // Read the DAP file
  console.log(`Reading DAP file: ${inputFile}`);
  const buffer = fs.readFileSync(inputFile);
  
  // Decode Windows-1252 encoding
  const decoder = new TextDecoder('windows-1252');
  const content = decoder.decode(buffer);
  
  // Parse the DAP document
  console.log('Parsing DAP document...');
  const doc = parseDapDocument(content);
  
  // Simplify for export
  console.log('Converting to JSON...');
  const jsonData = simplifyDapDocumentForExport(doc);
  
  // Ensure output directory exists
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write JSON file
  console.log(`Writing JSON to: ${outputFile}`);
  fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2), 'utf8');
  
  console.log('✓ Conversion completed successfully!');
  
} catch (error) {
  console.error('Error during conversion:', error.message);
  process.exit(1);
}

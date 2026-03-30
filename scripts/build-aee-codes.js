#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

/**
 * Build script: Convert AEE codes from YAML to JavaScript
 * 
 * This script reads dict/aee_codes.yml and generates dict/aee_codes.js
 * with all the code mappings ready to be imported.
 */

const yamlPath = path.join(process.cwd(), 'dict/aee_codes.yml');
const jsPath = path.join(process.cwd(), 'dict/aee_codes.js');

try {
  console.log('Reading AEE codes from YAML...');
  const yamlContent = fs.readFileSync(yamlPath, 'utf8');
  const aeeCodes = yaml.load(yamlContent);

  console.log('Generating JavaScript module...');
  
  // Generate JS file with all code mappings in a single object
  const jsContent = `// Auto-generated from dict/aee_codes.yml
// DO NOT EDIT - Run 'npm run build:codes' to regenerate

/**
 * AEE (Agro EDI Europe) code mappings
 * Source: spec/daplos2024-fp-v09-5.md
 * Version: 0.95
 */

/**
 * Unified AEE codes dictionary
 * Contains all code categories with their code→label mappings
 */
export const AEE_CODES = ${JSON.stringify(aeeCodes, null, 2)};

/**
 * Find label for a code by searching all categories
 * @param {string} code - The AEE code (e.g., 'ZIV', 'SCA')
 * @returns {string|undefined} The label or undefined if not found
 */
export function findLabel(code) {
  for (const category of Object.values(AEE_CODES)) {
    if (category[code]) {
      return category[code];
    }
  }
  return undefined;
}

/**
 * Get label for a specific category
 * @param {string} category - Category name (e.g., 'input_nature', 'organic_input')
 * @param {string} code - The AEE code (e.g., 'ZIV', 'SCA')
 * @returns {string|undefined} The label or undefined if not found
 */
export function getLabel(category, code) {
  return AEE_CODES[category]?.[code];
}

/**
 * Get all codes for a category
 * @param {string} category - Category name
 * @returns {Object} Object mapping codes to labels
 */
export function getCodes(category) {
  return AEE_CODES[category] || {};
}

export default AEE_CODES;
`;

  fs.writeFileSync(jsPath, jsContent, 'utf8');
  
  console.log(`✓ Successfully generated ${jsPath}`);
  console.log(`  Categories: ${Object.keys(aeeCodes).length}`);
  console.log(`  Total codes: ${Object.values(aeeCodes).reduce((sum, obj) => sum + Object.keys(obj).length, 0)}`);
  
} catch (error) {
  console.error('Error building AEE codes:', error.message);
  process.exit(1);
}

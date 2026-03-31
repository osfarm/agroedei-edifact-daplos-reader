/**
 * Example of using @osfarm/agroedei-edifact-daplos-reader in TypeScript
 */

import { parseDaplosFile, AEE_CODES } from '@osfarm/agroedei-edifact-daplos-reader';
import type { SimplifiedDapDocument, Crop } from '@osfarm/agroedei-edifact-daplos-reader';
import fs from 'fs';

async function parseDapFile(filePath: string): Promise<SimplifiedDapDocument> {
  // Read the DAP file as a buffer
  const buffer = fs.readFileSync(filePath);
  
  // Parse the file
  const result = parseDaplosFile(buffer);
  
  return result;
}

// Example usage
async function main() {
  try {
    const data = await parseDapFile('./test/testdata/Export_1765962015.dap');
    
    console.log(`Nombre de cultures: ${data.crops.length}`);
    
    // Iterate over crops with full type safety
    data.crops.forEach((crop: Crop) => {
      console.log(`- Culture: ${crop.crop_name_fr} (${crop.crop_code})`);
      console.log(`  Surface: ${crop.area_ha} ha`);
      
      if (crop.interventions && crop.interventions.length > 0) {
        console.log(`  Interventions: ${crop.interventions.length}`);
        crop.interventions.forEach(intervention => {
          console.log(`    - ${intervention.date}: ${intervention.nature_label}`);
        });
      }
    });
    
    // Access AEE codes
    console.log('\nNatures d\'intrants disponibles:');
    Object.entries(AEE_CODES.input_nature || {}).forEach(([code, label]) => {
      console.log(`  ${code}: ${label}`);
    });
    
  } catch (error) {
    console.error('Erreur lors du parsing:', error);
  }
}

main();

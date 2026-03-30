import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import proj4 from 'proj4';
import { AEE_CODES } from './dict/aee_codes.js';

// Définitions des systèmes de projection
// Lambert 2 étendu (EPSG:27572)
proj4.defs('EPSG:27572', '+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs');

// Lambert 93 (EPSG:2154)
proj4.defs('EPSG:2154', '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

// WGS84 (EPSG:4326) - déjà défini dans proj4 par défaut

/**
 * Convert coordinates to WGS84 based on SRS code
 * @param {string} srsCode - SRS code from DAPLOS spec (3=Lambert2, 4=WGS84, 5=Lambert93)
 * @param {number} x - X coordinate (longitude in source system)
 * @param {number} y - Y coordinate (latitude in source system)
 * @returns {Array<number>} - [longitude, latitude] in WGS84
 */
function convertToWgs84(srsCode, x, y) {
  // Code 4: Déjà en WGS84, pas de conversion
  if (srsCode === '4') {
    return [x, y];
  }

  let sourceProj;
  if (srsCode === '3') {
    // Lambert 2 étendu
    sourceProj = 'EPSG:27572';
  } else if (srsCode === '5') {
    // Lambert 93
    sourceProj = 'EPSG:2154';
  } else {
    // SRS inconnu, retourner les coordonnées telles quelles
    return [x, y];
  }

  // Conversion vers WGS84 (EPSG:4326)
  const [lon, lat] = proj4(sourceProj, 'EPSG:4326', [x, y]);
  return [lon, lat];
}

// Build a lookup map: agroedi_code → agroedi_name_fr from the CSV reference file
const CROP_NAME_BY_CODE = {};
try {
  const csvPath = path.join(process.cwd(), 'dict/agroedi - crops.csv');
  const lines = fs.readFileSync(csvPath, 'utf8').trim().split('\n').slice(1); // skip header
  for (const line of lines) {
    const i1 = line.indexOf(',');
    const i2 = line.indexOf(',', i1 + 1);
    const code = line.substring(0, i1).trim();
    const name = line.substring(i1 + 1, i2).trim();
    if (code) CROP_NAME_BY_CODE[code] = name;
  }
} catch {
  // Non-fatal: will fall back to raw field values
}

// Build a lookup map: unit_code → unit_label from the TSV reference file
const UNIT_LABEL_BY_CODE = {};
try {
  const tsvPath = path.join(process.cwd(), 'dict/units.tsv');
  const lines = fs.readFileSync(tsvPath, 'utf8').trim().split('\n').slice(1); // skip header
  for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length >= 2) {
      const code = parts[0].trim();
      const label = parts[1].trim();
      if (code) UNIT_LABEL_BY_CODE[code] = label;
    }
  }
} catch {
  // Non-fatal: will fall back to raw codes
}

/**
 * Daplos DAP file parser
 *
 * DAP files are fixed-width text files (Windows-1252 encoding, CRLF line endings).
 * Each line starts with a 2-char key, followed by fixed-width fields concatenated without separators.
 * Field sizes come from daplos_2.yml.
 */

// Line definition structure (from daplos_2.yml)
// LineDef: { key, parent?, name, occurrence?, cells: Array<{name, len}> }

const LINE_DEFS = {
  EI: {
    key: 'EI',
    name: 'interchange',
    occurrence: 1,
    can_have_children: true,
    cells: [
      { name: 'sender_siret', len: 14 },
      { name: 'sender_code', len: 3 },
      { name: 'receiver_siret', len: 14 },
      { name: 'receiver_code', len: 3 },
      { name: 'document_count', len: 4 },
    ],
  },
  DE: {
    key: 'DE',
    parent: 'EI',
    name: 'header',
    occurrence: 1,
    cells: [
      { name: 'reference', len: 35 },
      { name: 'function', len: 1 },
      { name: 'printed_on', len: 8, type: 'date' },
      { name: 'crop_count', len: 4 },
      { name: 'version', len: 4 },
    ],
  },
  DA: {
    key: 'DA',
    parent: 'EI',
    name: 'entity',
    occurrence: 3,
    cells: [
      { name: 'entity_nature', len: 3 },
      { name: 'siret', len: 17 },
      { name: 'identification_nature', len: 3 },
      { name: 'entity_name', len: 35 },
      { name: 'entity_name_complement', len: 35 },
      { name: 'entity_address', len: 35 },
      { name: 'entity_address_complement', len: 35 },
      { name: 'entity_town', len: 35 },
      { name: 'entity_postal_code', len: 9 },
      { name: 'entity_country', len: 2 },
      { name: 'entity_informations_1', len: 20 },
      { name: 'entity_informations_2', len: 20 },
      { name: 'entity_informations_3', len: 20 },
    ],
  },
  DT: {
    key: 'DT',
    parent: 'EI',
    name: 'agricultural_usage',
    cells: [
      { name: 'activity_nature', len: 3 },
      { name: 'certificat_number', len: 20 },
      { name: 'other_activity_nature', len: 20 },
    ],
  },
  DP: {
    key: 'DP',
    parent: 'EI',
    name: 'crop',
    can_have_children: true,
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'crop_started_on', len: 8, type: 'date' },
      { name: 'crop_sheet_created_on', len: 8, type: 'date' },
      { name: 'crop_sheet_updated_on', len: 8, type: 'date' },
      { name: 'crop_stopped_on', len: 8, type: 'date' },
      { name: 'crop_specie_edicode', len: 3 },
      { name: 'first_variety', len: 7 },
      { name: 'second_variety', len: 7 },
      { name: 'third_variety', len: 7 },
      { name: 'fourth_variety', len: 7 },
      { name: 'fifth_variety', len: 7 },
      { name: 'crop_specie_number', len: 3 },
      { name: 'crop_sowing_period_edicode', len: 3 },
      { name: 'crop_final_usage_edicode', len: 3 },
      { name: 'provisionnal_yield', len: 9 },
      { name: 'provisionnal_yield_unity', len: 3 },
      { name: 'crop_name_details', len: 35 },
      { name: 'cap_islet_number', len: 10 },
      { name: 'perrenial_crop_number', len: 10 },
      { name: 'town_insee_code', len: 3 },
      { name: 'soil_depth', len: 3 },
      { name: 'soil_rock_ratio', len: 3 },
      { name: 'soil_nature_edicode', len: 3 },
      { name: 'other_soil_nature', len: 35 },
      { name: 'soil_acidity', len: 3 },
      { name: 'subsoil_level', len: 3 },
      { name: 'subsoil_nature', len: 3 },
      { name: 'intermediate_crop', len: 3 },
      { name: 'hydromorphic_soil', len: 1 },
      { name: 'drain_soil', len: 1 },
      { name: 'cutting_land_parcel', len: 1 },
      { name: 'initial_land_parcel_work_number', len: 4 },
      { name: 'residue_management', len: 3 },
      { name: 'residue_input', len: 9 },
    ],
  },
  PC: {
    key: 'PC',
    parent: 'DP',
    name: 'cadastral_area',
    can_have_children: true,
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'cadastral_land_parcel_number', len: 16 },
      { name: 'cadastral_area_in_hectare', len: 9 },
    ],
  },
  CC: {
    key: 'CC',
    parent: 'PC',
    name: 'cadastral_spatial_coordinate',
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'cadastral_land_parcel_number', len: 16 },
      { name: 'srs', len: 3 },
      { name: 'longitude', len: 11 },  // Position 34-44: Longitude (E en Lambert 93)
      { name: 'latitude', len: 10 },   // Position 45-54: Latitude (N en Lambert 93)
      { name: 'elevation', len: 18 },
    ],
  },
  PS: {
    key: 'PS',
    parent: 'DP',
    name: 'crop_area',
    can_have_children: true,
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'area_nature_edicode', len: 3 },
      { name: 'area_nature_value_in_hectare', len: 9 },
    ],
  },
  SC: {
    key: 'SC',
    parent: 'PS',
    name: 'crop_spatial_coordinate',
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'srs', len: 3 },
      { name: 'longitude', len: 11 },  // Position 18-28: Longitude (E en Lambert 93)
      { name: 'latitude', len: 10 },   // Position 29-38: Latitude (N en Lambert 93)
      { name: 'elevation', len: 18 },
    ],
  },
  PE: {
    key: 'PE',
    parent: 'DP',
    name: 'contract',
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'code', len: 3 },
      { name: 'contract_description', len: 35 },
      { name: 'other_contract_description', len: 35 },
      { name: 'contract_started_on', len: 8, type: 'date' },
    ],
  },
  PH: {
    key: 'PH',
    parent: 'DP',
    name: 'crop_history',
    can_have_children: true,
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'previous_order', len: 2 },
      { name: 'previous_land_parcel_work_number', len: 4 },
      { name: 'crop_specie_edicode', len: 3 },
      { name: 'first_variety', len: 7 },
      { name: 'second_variety', len: 7 },
      { name: 'third_variety', len: 7 },
      { name: 'fourth_variety', len: 7 },
      { name: 'fifth_variety', len: 7 },
      { name: 'crop_specie_number', len: 3 },
      { name: 'crop_sowing_period_edicode', len: 3 },
      { name: 'crop_final_usage_edicode', len: 3 },
      { name: 'residue_management', len: 3 },
      { name: 'residue_input', len: 9 },
    ],
  },
  HA: {
    key: 'HA',
    parent: 'PH',
    name: 'enrichment',
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'enrichment_nature', len: 3 },
      { name: 'enrichment_nature_details', len: 35 },
      { name: 'enrichment_started_on', len: 8, type: 'date' },
      { name: 'enrichment_quantity', len: 9 },
      { name: 'enrichment_quantity_unit', len: 3 },
      { name: 'enrichment_supplier_name', len: 35 },
      { name: 'enrichment_supplier_name_details', len: 35 },
      { name: 'enrichment_supplier_address', len: 35 },
      { name: 'enrichment_supplier_address_details', len: 35 },
      { name: 'enrichment_supplier_town', len: 35 },
      { name: 'enrichment_supplier_postal_code', len: 9 },
      { name: 'enrichment_supplier_country', len: 2 },
    ],
  },
  PA: {
    key: 'PA',
    parent: 'DP',
    name: 'soil_analysis',
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'analysis_ticket_number', len: 35 },
      { name: 'analysis_labratory_siren', len: 9 },
      { name: 'analysis_labratory_name', len: 35 },
      { name: 'analysis_labratory_name_details', len: 35 },
      { name: 'analysis_labratory_address', len: 35 },
      { name: 'analysis_labratory_address_details', len: 35 },
      { name: 'analysis_labratory_town', len: 35 },
      { name: 'analysis_labratory_postal_code', len: 9 },
      { name: 'analysis_labratory_country', len: 2 },
      { name: 'analysis_analysed_on', len: 8, type: 'date' },
      { name: 'analysis_sampled_on', len: 8, type: 'date' },
    ],
  },
  PV: {
    key: 'PV',
    parent: 'DP',
    name: 'intervention',
    can_have_children: true,
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'intervention_guid', len: 32 },
      { name: 'intervention_event', len: 1 },
      { name: 'intervention_category_edicode', len: 3 },
      { name: 'intervention_state_edicode', len: 3 },
      { name: 'intervention_name', len: 35 },
      { name: 'intervention_started_at', len: 12, type: 'datetime' },
      { name: 'intervention_stopped_at', len: 12, type: 'datetime' },
      { name: 'intervention_duration', len: 6 },
      { name: 'intervention_prescription_delivered_on', len: 8, type: 'date' },
      { name: 'crop_state', len: 3 },
      { name: 'crop_state_precision', len: 35 },
      { name: 'intervention_nature_edicode', len: 3 },
      { name: 'intervention_nature_precision', len: 35 },
      { name: 'intervention_motivation', len: 3 },
      { name: 'intervention_motivation_details', len: 35 },
      { name: 'intervention_worker_nature', len: 3 },
      { name: 'worker_licence_number', len: 20 },
      { name: 'worker_name', len: 35 },
      { name: 'wheater_conditions', len: 3 },
      { name: 'special_tasks', len: 3 },
      { name: 'temperature_signe', len: 1 },
      { name: 'external_temperature', len: 3 },
      { name: 'hygrometrie_percentage', len: 3 },
      { name: 'total_volume', len: 9 },
      { name: 'per_area_unit_edicode', len: 3 },
      { name: 'working_area_in_hectare', len: 9 },
      { name: 'first_comment', len: 70 },
      { name: 'second_comment', len: 70 },
    ],
  },
  VC: {
    key: 'VC',
    parent: 'PV',
    name: 'intervention_spatial_coordinate',
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'intervention_guid', len: 32 },
      { name: 'srs', len: 3 },
      { name: 'longitude', len: 11 },
      { name: 'latitude', len: 10 },
      { name: 'elevation', len: 18 },
    ],
  },
  VB: {
    key: 'VB',
    parent: 'PV',
    name: 'intervention_target',
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'intervention_guid', len: 32 },
      { name: 'intervention_target', len: 3 },
    ],
  },
  VI: {
    key: 'VI',
    parent: 'PV',
    name: 'input',
    can_have_children: true,
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'intervention_guid', len: 32 },
      { name: 'input_nature_edicode', len: 3 },
      { name: 'input_name', len: 70 },
      { name: 'input_ean_code', len: 13 },
      { name: 'input_phytosanitary_number', len: 35 },
      { name: 'input_gnis_code', len: 7 },
      { name: 'input_organic_code', len: 3 },
      { name: 'input_water_code', len: 3 },
      { name: 'input_additive_code', len: 3 },
      { name: 'input_mineral_code', len: 3 },
      { name: 'residue_information_1', len: 3 },
      { name: 'residue_information_2', len: 3 },
      { name: 'residue_information_3', len: 3 },
      { name: 'residue_information_4', len: 3 },
      { name: 'residue_information_5', len: 3 },
      { name: 'seed_information_1', len: 3 },
      { name: 'seed_information_2', len: 3 },
      { name: 'seed_information_3', len: 3 },
      { name: 'input_quantity', len: 9 },
      { name: 'input_unity_edicode', len: 3 },
      { name: 'input_quantity_per_hectare', len: 9 },
      { name: 'per_area_unity_edicode', len: 3 },
      { name: 'provisionnal_input_quantity_per_hectare', len: 9 },
      { name: 'provisionnal_per_area_unity_edicode', len: 3 },
      { name: 'provisionnal_round_number', len: 6 },
      { name: 'residue_supplier_name', len: 35 },
      { name: 'residue_supplier_name_details', len: 35 },
      { name: 'residue_supplier_address', len: 35 },
      { name: 'residue_supplier_address_details', len: 35 },
      { name: 'residue_supplier_town', len: 35 },
      { name: 'residue_supplier_postal_code', len: 9 },
      { name: 'residue_supplier_country', len: 2 },
      { name: 'input_volume_density_in_kilogram_per_liter', len: 9 },
    ],
  },
  IC: {
    key: 'IC',
    parent: 'VI',
    name: 'input_component',
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'intervention_guid', len: 32 },
      { name: 'indicator_nature_edicode', len: 3 },
      { name: 'indicator_quantity', len: 9 },
    ],
  },
  IL: {
    key: 'IL',
    parent: 'VI',
    name: 'input_tracking',
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'intervention_guid', len: 32 },
      { name: 'input_phytosanitary_number', len: 35 },
      { name: 'input_tracking_number', len: 35 },
      { name: 'input_quantity_per_tracking', len: 9 },
      { name: 'input_quantity_unity_per_tracking', len: 3 },
      { name: 'thousand_grains_mass', len: 9 },
      { name: 'thousand_grains_mass_unity', len: 3 },
    ],
  },
  IA: {
    key: 'IA',
    parent: 'VI',
    name: 'residue_analysis',
    cells: [],
  },
  VR: {
    key: 'VR',
    parent: 'PV',
    name: 'output',
    can_have_children: true,
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'intervention_guid', len: 32 },
      { name: 'output_nature_edicode', len: 3 },
      { name: 'output_specie_edicode', len: 3 },
      { name: 'output_name', len: 35 },
      { name: 'output_use_edicode', len: 3 },
      { name: 'output_quantity', len: 9 },
      { name: 'output_unity_edicode', len: 3 },
      { name: 'output_yield', len: 9 },
      { name: 'output_yield_unity_edicode', len: 3 },
      { name: 'output_provisionnal_yield', len: 9 },
      { name: 'output_provisionnal_yield_unity_edicode', len: 3 },
    ],
  },
  RL: {
    key: 'RL',
    parent: 'VR',
    name: 'output_tracking',
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'intervention_guid', len: 32 },
      { name: 'silo_tracking_number', len: 35 },
      { name: 'farm_tracking_number', len: 35 },
      { name: 'tracking_quantity_in_ton', len: 9 },
    ],
  },
  LC: {
    key: 'LC',
    parent: 'VR',
    name: 'output_component',
    cells: [
      { name: 'land_parcel_order_number', len: 4 },
      { name: 'land_parcel_work_number', len: 4 },
      { name: 'harvest_year', len: 4 },
      { name: 'intervention_guid', len: 32 },
      { name: 'indicator_nature_edicode', len: 3 },
      { name: 'indicator_value', len: 9 },
      { name: 'indicator_value_unity_edicode', len: 3 },
    ],
  },
  VH: {
    key: 'VH',
    parent: 'PV',
    name: 'decision_indicator',
    cells: [],
  },
};

// DapLine: { key, name, raw, fields: Record<string, string>, children? }

/**
 * Parse an 8-char Daplos date (YYYYMMDD) into a Date object.
 * Returns null if empty or invalid.
 */
function parseDapDate8(value) {
  if (!value || value.length < 8) return null;
  const year = parseInt(value.substring(0, 4), 10);
  const month = parseInt(value.substring(4, 6), 10);
  const day = parseInt(value.substring(6, 8), 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  return new Date(Date.UTC(year, month - 1, day));
}

/**
 * Parse a 12-char Daplos datetime (YYYYMMDDHHmm) into a Date object.
 * Returns null if empty or invalid.
 */
function parseDapDate12(value) {
  if (!value || value.length < 12) return null;
  const year = parseInt(value.substring(0, 4), 10);
  const month = parseInt(value.substring(4, 6), 10);
  const day = parseInt(value.substring(6, 8), 10);
  const hour = parseInt(value.substring(8, 10), 10);
  const min = parseInt(value.substring(10, 12), 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  return new Date(Date.UTC(year, month - 1, day, hour || 0, min || 0));
}

/**
 * Parse a single DAP line into its key and fields.
 */
function parseLine(line) {
  const key = line.substring(0, 2);
  const def = LINE_DEFS[key];

  if (!def) return null;

  const fields = {};
  let offset = 2;
  for (const cell of def.cells) {
    const rawValue = line.substring(offset, offset + cell.len).trim();
    
    // Convert dates to ISO format if type is specified
    if (cell.type === 'date' && rawValue) {
      const date = parseDapDate8(rawValue);
      fields[cell.name] = date ? date.toISOString().split('T')[0] : rawValue;
    } else if (cell.type === 'datetime' && rawValue) {
      const date = parseDapDate12(rawValue);
      fields[cell.name] = date ? date.toISOString() : rawValue;
    } else {
      fields[cell.name] = rawValue;
    }
    
    offset += cell.len;
  }

  // A line can have children if explicitly marked in its definition
  const canHaveChildren = def.can_have_children || false;

  return {
    key,
    name: def.name,
    raw: line,
    fields,
    children: canHaveChildren ? [] : undefined,
  };
}

// DapDocument: { root, crops (getter), interventions (getter) }

/**
 * Parse raw DAP file content (already decoded as UTF-8 / Latin-1 string)
 * into a structured document using the hierarchical line definitions.
 */
export function parseDapDocument(content) {
  // Normalize line endings (CRLF → LF) and split
  const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  let root = null;
  const nodeStack = []; // Stack of parent nodes

  for (const rawLine of lines) {
    if (rawLine.length < 2) continue;

    const parsed = parseLine(rawLine);
    if (!parsed) continue;

    const parsedDef = LINE_DEFS[parsed.key];
    
    // If this line has a parent, find it in the stack and attach to it
    if (parsedDef.parent) {
      // Walk up the stack to find the parent node
      while (nodeStack.length > 0) {
        const candidate = nodeStack[nodeStack.length - 1];
        
        if (candidate.key === parsedDef.parent) {
          // Found the parent, attach this line to it
          candidate.children.push(parsed);
          break;
        }
        
        // Not the right parent → pop stack (move to sibling or uncle level)
        nodeStack.pop();
      }
    } else {
      // No parent → this is the root node (EI)
      root = parsed;
    }

    // If this line can have children, push it onto the stack
    if (parsed.children !== undefined) {
      nodeStack.push(parsed);
    }
  }

  // Build the document accessor
  const doc = {
    root,
    get crops() {
      return root?.children?.filter(c => c.key === 'DP') ?? [];
    },
    get interventions() {
      const pvs = [];
      for (const dp of this.crops) {
        pvs.push(...(dp.children?.filter(c => c.key === 'PV') ?? []));
      }
      return pvs;
    },
  };

  console.log(`Parsed DAP document: ${doc.crops.length} crop(s), ${doc.interventions.length} intervention(s)`);

  return doc;
}

/**
 * Add AEE code labels to fields
 * Automatically enriches any field ending with _edicode by searching across all AEE code categories
 */
function enrichWithAeeLabels(fields) {
  const enriched = { ...fields };
  
  for (const [fieldName, value] of Object.entries(fields)) {
    if (!value) continue;
    
    // Determine if this field should be enriched and what the label field name should be
    let shouldEnrich = false;
    let labelField;
    
    // Check for specific patterns first (more specific to less specific)
    if (fieldName.endsWith('_unity_edicode')) {
      // Fields like input_unity_edicode, per_area_unity_edicode
      shouldEnrich = true;
      labelField = fieldName.replace('_edicode', '_label');
    } else if (fieldName.endsWith('_unit_edicode')) {
      // Fields like per_area_unit_edicode
      shouldEnrich = true;
      labelField = fieldName.replace('_edicode', '_label');
    } else if (fieldName.endsWith('_edicode')) {
      // All other _edicode fields
      shouldEnrich = true;
      labelField = fieldName.replace('_edicode', '_edilabel');
    } else if (fieldName.startsWith('residue_information_')) {
      shouldEnrich = true;
      labelField = fieldName.replace('residue_information_', 'residue_information_label_');
    } else if (fieldName.startsWith('seed_information_')) {
      shouldEnrich = true;
      labelField = fieldName.replace('seed_information_', 'seed_information_label_');
    } else if (fieldName.endsWith('_code')) {
      // Handle fields like input_organic_code, input_mineral_code, etc.
      shouldEnrich = true;
      labelField = fieldName.replace('_code', '_label');
    }
    
    // If we should enrich, search for the code across all AEE categories
    if (shouldEnrich) {
      // Search across all categories for this code
      for (const category of Object.values(AEE_CODES)) {
        const label = category[value];
        if (label) {
          enriched[labelField] = label;
          break; // Found the label, stop searching
        }
      }
    }
  }
  
  // Special handling for combined crop codes (crop_specie_edicode + crop_final_usage_edicode)
  if (fields.crop_specie_edicode && fields.crop_final_usage_edicode) {
    const combinedCode = fields.crop_specie_edicode + fields.crop_final_usage_edicode;
    // Try to find the combined label first
    const combinedLabel = AEE_CODES.crop_combined?.[combinedCode];
    if (combinedLabel) {
      enriched.crop_combined_edilabel = combinedLabel;
      enriched.crop_combined_edicode = combinedCode;
    }
  }
  
  return enriched;
}

/**
 * Simple pluralization helper
 */
function pluralize(word) {
  if (word.endsWith('s')) return word;
  if (word.endsWith('y')) {
    // Check if it's preceded by a consonant (e.g., "entity" → "entities")
    const beforeY = word[word.length - 2];
    if (beforeY && !'aeiou'.includes(beforeY.toLowerCase())) {
      return word.slice(0, -1) + 'ies';
    }
  }
  return word + 's';
}

/**
 * Simplify a DapLine for JSON export by:
 * - Removing key, name, raw
 * - Moving fields.* to root
 * - Removing empty fields (empty strings, null, undefined)
 * - Grouping children by their name and naming arrays after child name (pluralized)
 * - Special handling: all spatial coordinates → [longitude, latitude] array
 */
function simplifyDapLineForExport(line) {
  // Special case: all spatial coordinates → simplified [longitude, latitude] array in WGS84
  if (line.name === 'crop_spatial_coordinate' || 
      line.name === 'cadastral_spatial_coordinate' || 
      line.name === 'intervention_spatial_coordinate') {
    
    const longitude = parseFloat(line.fields.longitude || 0);
    const latitude = parseFloat(line.fields.latitude || 0);
    const srsCode = line.fields.srs;

    // Convert to WGS84 based on SRS code
    // 3 = Lambert 2 étendu, 4 = WGS84, 5 = Lambert 93
    const [lon, lat] = convertToWgs84(srsCode, longitude, latitude);
    
    // Round to 8 decimal places to avoid floating-point precision errors
    const lonRounded = Math.round(lon * 100000000) / 100000000;
    const latRounded = Math.round(lat * 100000000) / 100000000;
    
    return [lonRounded, latRounded];
  }

  const result = {};

  // Copy only non-empty fields and enrich with AEE labels
  const fieldsToExport = {};
  for (const [key, value] of Object.entries(line.fields)) {
    if (value !== '' && value !== null && value !== undefined) {
      fieldsToExport[key] = value;
    }
  }
  
  // Enrich fields with AEE code labels
  const enrichedFields = enrichWithAeeLabels(fieldsToExport);
  Object.assign(result, enrichedFields);

  if (line.children && line.children.length > 0) {
    // Group children by their name
    const childrenByName = new Map();

    for (const child of line.children) {
      const childName = child.name;
      if (!childrenByName.has(childName)) {
        childrenByName.set(childName, []);
      }
      childrenByName.get(childName).push(simplifyDapLineForExport(child));
    }

    // Add each group as an array with pluralized name
    for (const [childName, childArray] of childrenByName) {
      const arrayName = pluralize(childName);
      result[arrayName] = childArray;
    }
  }

  return result;
}

/**
 * Simplify DapDocument for JSON export
 */
export function simplifyDapDocumentForExport(doc) {
  return doc.root ? simplifyDapLineForExport(doc.root) : null;
}

/**
 * High-level entry point: parse a DAP file buffer and return JSON data.
 *
 * The file is expected to be Windows-1252 encoded (typical for Daplos exports).
 * Node.js Buffer.toString() won't decode accents correctly, so we use TextDecoder.
 *
 * @param buffer - raw file bytes (Buffer or ArrayBuffer)
 */
export function parseDaplosFile(buffer) {
  // Decode Windows-1252 (latin1 is a safe approximation for single-byte chars)
  const decoder = new TextDecoder('windows-1252');
  const content = decoder.decode(buffer);

  const doc = parseDapDocument(content);

  if (doc.crops.length === 0) {
    throw new Error('Aucune culture (DP) trouvée dans le fichier DAP.');
  }

  return simplifyDapDocumentForExport(doc);
}

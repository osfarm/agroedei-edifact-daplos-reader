/**
 * Type definitions for @osfarm/agroedei-edifact-daplos-reader
 * Daplos (.dap) file parser for converting to JSON
 */

/**
 * Represents a coordinate pair [longitude, latitude] in WGS84
 */
export type Coordinate = [number, number];

/**
 * Represents a point in a field with coordinates and optional area
 */
export interface FieldPoint {
  /** Point coordinates [longitude, latitude] in WGS84 */
  coordinates: Coordinate;
  /** Area in hectares (optional) */
  area_ha?: number;
}

/**
 * Represents a crop/culture with its parcel and field information
 */
export interface Crop {
  /** Unique identifier for the crop */
  id: string;
  /** Crop code (AgroEDI code) */
  crop_code?: string;
  /** Crop name in French */
  crop_name_fr?: string;
  /** Total area in hectares */
  area_ha?: number;
  /** Array of field points defining the parcel geometry */
  field_points?: FieldPoint[];
  /** Parcel identifier */
  parcel_id?: string;
  /** Field label/name */
  field_label?: string;
  /** Intervention operations performed on this crop */
  interventions?: Intervention[];
  [key: string]: any;
}

/**
 * Represents an intervention/operation on a crop
 */
export interface Intervention {
  /** Unique identifier for the intervention */
  id: string;
  /** Intervention date (ISO 8601 format) */
  date?: string;
  /** Nature of the intervention (AEE code) */
  nature_code?: string;
  /** Nature label */
  nature_label?: string;
  /** Inputs/products used in this intervention */
  inputs?: Input[];
  [key: string]: any;
}

/**
 * Represents an input/product used in an intervention
 */
export interface Input {
  /** Unique identifier for the input */
  id: string;
  /** Input nature code (AEE code) */
  nature_code?: string;
  /** Input nature label */
  nature_label?: string;
  /** Product name */
  product_name?: string;
  /** Quantity used */
  quantity?: number;
  /** Unit code */
  unit_code?: string;
  /** Unit label */
  unit_label?: string;
  [key: string]: any;
}

/**
 * Represents the parsed document structure
 */
export interface DapDocument {
  /** Root interchange element */
  root: any;
  /** Array of crops found in the document */
  crops: Crop[];
  /** Find a crop by its ID */
  findCrop(id: string): Crop | undefined;
  /** Get all crops */
  getCrops(): Crop[];
}

/**
 * Simplified export structure for a DAP document
 */
export interface SimplifiedDapDocument {
  /** Unique identifier for the interchange */
  id: string;
  /** Sender SIRET number */
  sender_siret?: string;
  /** Receiver SIRET number */
  receiver_siret?: string;
  /** Creation date */
  creation_date?: string;
  /** Array of crops with their data */
  crops: Crop[];
  [key: string]: any;
}

/**
 * Parse DAP document content (already decoded as string)
 * 
 * @param content - The DAP file content as a string (Windows-1252 decoded)
 * @returns A structured document object with crops and metadata
 */
export function parseDapDocument(content: string): DapDocument;

/**
 * Simplify a parsed DAP document for export to JSON
 * 
 * @param doc - The parsed DAP document
 * @returns A simplified structure suitable for JSON export
 */
export function simplifyDapDocumentForExport(doc: DapDocument): SimplifiedDapDocument | null;

/**
 * High-level entry point: parse a DAP file buffer and return JSON data
 * 
 * The file is expected to be Windows-1252 encoded (typical for Daplos exports).
 * 
 * @param buffer - Raw file bytes (Buffer or ArrayBuffer)
 * @returns A simplified JSON structure with all crops and interventions
 */
export function parseDaplosFile(buffer: Buffer | ArrayBuffer): SimplifiedDapDocument;

/**
 * AEE (Agro EDI Europe) code mappings
 * Contains all code categories with their code→label mappings
 */
export const AEE_CODES: {
  [category: string]: {
    [code: string]: string;
  };
};

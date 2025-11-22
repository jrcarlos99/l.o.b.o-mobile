export type PendingOccurrence = {
  id: string;
  type: string;
  datetime: string;
  vehicle: string;
  team: string;
  description: string;
  address?: string;
  gps?: { lat: number; lon: number; accuracy?: number; timestamp: string };
  images?: { uri: string; timestamp: string }[];
  signature?: string; // base64 dataURL
  createdAt: string;
  synced?: boolean;
};

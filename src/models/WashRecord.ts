export enum WashStatus {
  Pending = 0,
  Completed = 1,
  Failed = 2,
}

export interface WashRecord {
  id: number;
  carId: number;
  carPlateNumber?: string;
  washDate: string;
  interiorCleaned: boolean;
  exteriorCleaned: boolean;
  notes?: string;
  status: WashStatus ;
}

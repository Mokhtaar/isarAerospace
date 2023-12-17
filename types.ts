export interface SpectrumStatus {
  altitude: number;
  isActionRequired: boolean;
  isAscending: boolean;
  statusMessage: string;
  temperature: number;
  velocity: number;
}

export interface SpectrumLiveStatus {
  Altitude: number;
  IsActionRequired: boolean;
  IsAscending: boolean;
  StatusMessage: string;
  Temperature: number;
  Velocity: number;
}

export type SpectrumProps = SpectrumStatus | SpectrumLiveStatus;

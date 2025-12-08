// src/types.ts

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  distance: string;
  specialties: string[];
  openHours: string;
  image: string;
  latitude: number;
  longitude: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  image: string;
  availableSlots: string[];
}
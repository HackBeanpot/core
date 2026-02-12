// types
export interface CabinLead {
  name: string;
  src: string;
  url: string;
  cabinPoints: string[];
}

export interface Cabin {
  name: string;
  points: number;
  description: string;
  cabinLeads: CabinLead[];
  cabinLeadTitle: string;
}

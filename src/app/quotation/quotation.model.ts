export class QuotationLoad {
  description: string;
}

export class Origin {
  location_type: string;
  location: string;
  ready_date: any;
  handle_warehouse: boolean;
  handle_port_charges: boolean;
  handle_customs: boolean;
}

export class Destination {
  location_type: string;
  location: string;
  handle_warehouse: boolean;
  handle_port_charges: boolean;
  handle_customs: boolean;
}

export class Refrigeration {
  temperature: string;
  unit: string;
}

export class GoodValue {
  amount: any;
  currency: string;
}

export class AdditionalDetail {
  is_hazardous: boolean;
  need_refrigeration: boolean;
  need_insurance: boolean;
}

export class GuestDetail {
  name: string;
  email: string;
  organisation: string;
  contact_number: string;
  register_guest: boolean;
}

export class Quotation {
  origin: Origin = new Origin();
  calculate_load_by: string;
  customer: any;
  destination: any;
  fcls: Array<any> = [];
  lcls: Array<any> = [];
  details: Array<any> = [];
  ftls: Array<any> = [];
  ltls: Array<any> = [];
  shipment_type: string = 'sea_shipment_lcl';
  additional_details: AdditionalDetail = new AdditionalDetail();
  refrigeration: Refrigeration = new Refrigeration();
  good_value: GoodValue = new GoodValue();
  guest_detail: GuestDetail = new GuestDetail();
}

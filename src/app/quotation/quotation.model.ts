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
  remark;
}

export class GuestDetail {
  name: string;
  email: string;
  organisation: string;
  contact_number: string;
  register_guest: boolean;
}

export class QuoteLoad {
  package_type: any = {};
  container_type: any = {};

  cbm: any;
  length: any;
  width: any;
  height: any;
  weight: any;
  weight_unit: any = 'kg';
  length_unit: any = 'cm';
}

export class Quotation {
  origin: Origin = new Origin();
  is_simplified = true;
  calculate_load_by = 'lwh';
  customer: any;
  destination: any;
  fcls: Array<QuoteLoad> = [];
  lcls: Array<QuoteLoad> = [];
  details: Array<QuoteLoad> = [];
  ftls: Array<QuoteLoad> = [];
  ltls: Array<QuoteLoad> = [];
  shipment_type: string;
  additional_details: AdditionalDetail = new AdditionalDetail();
  refrigeration: Refrigeration = new Refrigeration();
  good_value: GoodValue = new GoodValue();
  guest_detail: GuestDetail = new GuestDetail();
}

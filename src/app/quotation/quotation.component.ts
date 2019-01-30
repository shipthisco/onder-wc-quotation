import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {QuotationService} from '../services/quotation.service';
import {Destination, Origin, Quotation, QuotationLoad} from './quotation.model';
import {WebComponentService} from '../services/web-component.service';
import {UserMetaService} from '../services/user.meta.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'quotation-component',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss', './mini.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class QuotationComponent implements OnInit {


  @Input() organisation_id;
  @Input() api_endpoint;
  @ViewChild('modalTrigger') modalTrigger: ElementRef;
  calculate_load_by_items = [
    {viewValue: 'CBM -Cubic Meter ', value: 'cbm'},
    {viewValue: 'LWH - Length Width Height', value: 'lwh'},
  ];

  refrigeration_unit_items = [
    {viewValue: 'Degree Celsius', value: 'degree_celsius'},
    {viewValue: 'Fahrenheit', value: 'fahrenheit'}
  ];
  load_types = [
    {viewValue: 'Full Container Load (FCL)', value: 'sea_shipment_fcl'},
    {viewValue: 'Less than Container Load (LCL)', value: 'sea_shipment_lcl'},
    {viewValue: 'Air Shipment', value: 'air_shipment'},
    {viewValue: 'Less than Truck Load (LTL)', value: 'land_shipment_ltl'},
    {viewValue: 'Full Truck Load (FTL)', value: 'land_shipment_ftl'}];

  load_model_mapper = {
    'sea_shipment_lcl': 'lcls',
    'sea_shipment_fcl': 'fcls',
    'land_shipment_ltl': 'ltls',
    'land_shipment_ftl': 'ftls',
    'air_shipment': 'details'
  };

  location_types = [
    {viewValue: 'Residential', value: 'residential'},
    {viewValue: 'Business (Need lift gate)', value: 'business_need_lift_date'},
    {viewValue: 'Port/Airport', value: 'port_airpoort'},
    {viewValue: 'Factory/Warehouse', value: 'factory_warehouse'}
  ];

  active_step = 1;
  quotation: Quotation = new Quotation();
  is_guest_user;
  // user before login contact detail email
  temp_user: any = {};
  // already have account with this organisation or not
  has_account;
  is_prod = environment.production;

  constructor(
    public quotationService: QuotationService,
    public webComponentService: WebComponentService,
    public userMetaService: UserMetaService
  ) {

  }

  ngOnInit() {
    if (!this.organisation_id) {
      alert('You need to provide organisation id in order to properly get this component working');
    } else {
      this.webComponentService.setComponentRequiredDetails(this.organisation_id, this.api_endpoint);
    }

    if (!this.quotation.origin) {
      this.quotation.origin = new Origin();
    }
    if (!this.quotation.destination) {
      this.quotation.destination = new Destination();
    }
  }

  onSubmit() {

    this.quotationService.sendQuotationRequest({})
      .then((result_data) => {
        console.log(result_data);
      });
  }

  addLoad() {
    if (!this.quotation[this.load_model_mapper[this.quotation.shipment_type]]) {
      this.quotation[this.load_model_mapper[this.quotation.shipment_type]] = [];
    }
    this.quotation[this.load_model_mapper[this.quotation.shipment_type]].push(new QuotationLoad());
  }

  loadTypeChanged(event) {
    this.quotation['shipment_type'] = event;
    for (const load_model of Object.keys(this.load_model_mapper)) {
      if (event === load_model) {
        this.quotation[this.load_model_mapper[load_model]] = [];
      } else {
        delete this.quotation[this.load_model_mapper[load_model]];
      }
    }
    console.log(this.quotation);
  }

  changeStep(next_step_number: number) {
    this.active_step = next_step_number;
  }

  getQuote() {
    if (!this.userMetaService.logged_in) {
      this.modalTrigger.nativeElement.click();
    }
  }


  loginAndSend() {
    this.userMetaService.login(this.temp_user.email, this.temp_user.password)
      .then((user: any) => {
        console.log('user');
        console.log(user);
      });
  }

  guestSend() {
    this.quotation['is_guest'] = true;
    this.quotationService.sendQuotationRequest(this.quotation)
      .then((data: any) => {
        alert('Your quote request has been sent Successfully ! We will get back to you soon');
      });
  }
}

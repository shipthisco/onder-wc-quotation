import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {QuotationService} from '../services/quotation.service';
import {Destination, Origin, Quotation, QuotationLoad, QuoteLoad} from './quotation.model';
import {WebComponentService} from '../services/web-component.service';
import {UserMetaService} from '../services/user.meta.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'quotation-component',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss', '../../assets/bulma.sass'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class QuotationComponent implements OnInit {


  @Input() organisation_id;
  @Input() api_endpoint;
  @Input() organisation_title;
  @ViewChild('modalTrigger') modalTrigger: ElementRef;
  alert = {show_alert: false, message: '', alert_type: ''};
  refrigeration_unit_items = [
    {viewValue: 'Degree Celsius', value: 'degree_celsius'},
    {viewValue: 'Fahrenheit', value: 'fahrenheit'}
  ];

  currencies = [
    {viewValue: 'INR', value: 'inr'},
    {viewValue: 'USD', value: 'usd'},
    {viewValue: 'SAR', value: 'sar'}

  ];
  load_types = [
    {viewValue: 'Full Container Load (FCL)', value: 'fcl'},
    {viewValue: 'Less than Container Load (LCL)', value: 'lcl'},
    {viewValue: 'Air Shipment', value: 'air'},
    {viewValue: 'Less than Truck Load (LTL)', value: 'ltl'},
    {viewValue: 'Full Truck Load (FTL)', value: 'ftl'}];

  load_model_mapper = {
    'lcl': 'lcls',
    'fcl': 'fcls',
    'ltl': 'ltls',
    'ftl': 'ftls',
    'air': 'details'
  };

  quotation: Quotation = new Quotation();
  // user before login contact detail email
  temp_user: any = {};
  // already have account with this organisation or not
  has_account;
  is_prod = environment.production;
  modal_activated = false;

  constructor(
    public quotationService: QuotationService,
    public webComponentService: WebComponentService,
    public userMetaService: UserMetaService
  ) {
  }

  ngOnInit() {
    if (!this.organisation_id) {
      this.showAlert('You need to provide organisation id in order to properly get this component working', 'error');
    } else {
      this.userMetaService.setOrganisationDetail(this.organisation_id, this.api_endpoint);
    }

    if (!this.quotation.origin) {
      this.quotation.origin = new Origin();
    }
    if (!this.quotation.destination) {
      this.quotation.destination = new Destination();
    }
  }

  addLoad() {
    if (!this.quotation[this.load_model_mapper[this.quotation.shipment_type]]) {
      this.quotation[this.load_model_mapper[this.quotation.shipment_type]] = [];
    }
    this.quotation[this.load_model_mapper[this.quotation.shipment_type]].push(new QuoteLoad());
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
  }

  getQuote() {
    if (!this.userMetaService.logged_in) {
      this.modal_activated = true;
    }
  }


  loginAndSend() {
    this.userMetaService.login(this.temp_user.email, this.temp_user.password)
      .then((user: any) => {
        if (user) {
          this.quotation['customer_name'] = this.userMetaService.getCustomerReference();
          this.sendQuotation();
        } else {
          this.showAlert('Incorrect email/password', 'error', false);
        }
      })
      .catch(() => {
        this.showAlert('Please fill all the required contact details', 'error', false);
      });
  }

  guestSend() {
    if (this.quotation.guest_detail && this.quotation.guest_detail.name && this.quotation.guest_detail.email && this.quotation.guest_detail.contact_number) {
      this.sendQuotation();
    } else {
      this.showAlert('Please fill all the required contact details', 'error', false);
    }
  }

  sendQuotation() {
    this.quotationService.sendQuotationRequest(this.quotation)
      .then((data: any) => {
        this.quotation = new Quotation();
        this.showAlert('Your Quote Request has been sent successfully! We will get back to you soon');
      })
      .catch((error: any) => {
        console.log(error);
        if (error && error[0]) {
          this.showAlert(error[0].field_description + ' Missing Field', 'error');
        } else {
          this.showAlert('Sorry ! We are having trouble sending quotation right now.', 'error');
        }
      });
  }

  showAlert(message: string, alert_type = 'success', close_modal = true) {
    if (close_modal) {
      this.modal_activated = false;
    }
    this.alert = {
      show_alert: true,
      message: message,
      alert_type: alert_type
    };
    setTimeout(() => {
      this.alert.show_alert = false;
    }, 5000);
  }
}

import {Component, Input} from '@angular/core';


@Component({
  selector: 'quotation-location',
  templateUrl: './quotation-location.component.html',
  styleUrls: ['./quotation-location.component.scss']
})
export class QuotationLocationComponent {
  @Input() quotation;
  constructor() {
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'quotation-load',
  templateUrl: './quotation-load.component.html',
  styleUrls: ['./quotation-load.component.scss']
})
export class QuotationLoadComponent {
  @Input() loads: Array<any>;
  @Input() shipment_type;
  @Output() loadsChange: EventEmitter<any> = new EventEmitter();

  container_types = [
    {viewValue: '20OT', value: '20ot'},
    {viewValue: '20GP', value: '20gp'}
  ];
  package_types = [
    {viewValue: 'BOXES', value: 'boxes'},
    {viewValue: 'COLLI', value: 'colli'},
    {viewValue: 'CRATE', value: 'crate'},
    {viewValue: 'ROLLS', value: 'rolls'},
    {viewValue: 'REELS', value: 'reels'}
  ];

  constructor() {
  }

  loadsChanged() {
    this.loadsChange.emit(this.loads);
  }

  removeLoad(index: number) {
    this.loads.splice(index, 1);
    this.loadsChanged();
  }
}

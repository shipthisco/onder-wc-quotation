import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CONTAINER_TYPES, PACKAGE_TYPES} from '../../services/auto.complete.service';

@Component({
  selector: 'quotation-load',
  templateUrl: './quotation-load.component.html',
  styleUrls: ['./quotation-load.component.scss']
})
export class QuotationLoadComponent {
  @Input() loads: Array<any>;
  @Input() quotation;
  @Output() loadsChange: EventEmitter<any> = new EventEmitter();

  container_types = CONTAINER_TYPES;
  package_types = PACKAGE_TYPES;

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

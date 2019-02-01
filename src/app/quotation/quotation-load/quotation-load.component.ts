import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CONTAINER_TYPES, PACKAGE_TYPES} from '../../services/auto.complete.service';
import {QuoteLoad} from '../quotation.model';

@Component({
  selector: 'quotation-load',
  templateUrl: './quotation-load.component.html',
  styleUrls: ['./quotation-load.component.scss']
})
export class QuotationLoadComponent {
  @Input() loads: Array<QuoteLoad>;
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

  selectContainerType(index, container_type) {
    this.loads[index].container_type = container_type;
    console.log(this.loads);
    this.loadsChanged();
  }

  selectPackageType(index, package_type) {
    console.log('selection change');
    this.loads[index].package_type = package_type;
    console.log(package_type);
    this.loadsChanged();
  }
}

import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {QuotationComponent} from './quotation/quotation.component';
import {createCustomElement} from '@angular/elements';
import {QuotationService} from './services/quotation.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {QuotationLoadComponent} from './quotation/quotation-load/quotation-load.component';
import {WebComponentService} from './services/web-component.service';
import {UserMetaService} from './services/user.meta.service';
import {QuotationLocationComponent} from './quotation/quotation-location/quotation-location.component';
import {LocationService} from './services/location.service';
import {LocationSearchComponent} from './shared/location-search/location-search.component';

@NgModule({
  declarations: [
    QuotationComponent,
    QuotationLoadComponent,
    QuotationLocationComponent,
    LocationSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [QuotationService, UserMetaService, WebComponentService, LocationService],
  entryComponents: [QuotationComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const el = createCustomElement(QuotationComponent, {injector: this.injector});
    customElements.define('quotation-element', el);
  }
}

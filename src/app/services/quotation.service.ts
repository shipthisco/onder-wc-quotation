import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserMetaService} from './user.meta.service';


@Injectable()
export class QuotationService {
  constructor(private http: HttpClient, private userMetaService: UserMetaService) {
  }

  sendQuotationRequest(quotation_data) {
    localStorage.setItem('quotation_request', JSON.stringify(quotation_data));
    return new Promise(resolve => {
      this.http.post(
        this.userMetaService.organisation_api_endpoint + 'api/v1/public/incollection/quotation',
        quotation_data
      ).subscribe((response_data: any) => {
          if (response_data.success) {
            resolve(response_data.data);
          } else {
            resolve(false);
          }
        },
        error => {
          resolve(true);
        });
    });
  }

}

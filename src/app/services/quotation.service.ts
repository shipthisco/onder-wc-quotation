import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserMetaService} from './user.meta.service';


@Injectable()
export class QuotationService {
  constructor(private http: HttpClient, private userMetaService: UserMetaService) {
  }

  sendQuotationRequest(quotation_data) {
    localStorage.setItem('quotation_request', JSON.stringify(quotation_data));
    return new Promise((resolve, reject) => {
      this.http.post(
        this.userMetaService.organisation_api_endpoint + 'api/v1/public/incollection/third_party_quotation',
        {'reqbody': quotation_data},
        {headers: new HttpHeaders().set('organisation', this.userMetaService.organisation_id)}
      ).subscribe((response_data: any) => {
          if (response_data.success) {
            resolve(response_data.data);
          } else {
            reject(response_data.error_message);
          }
        },
        error => {
          reject(false);
        });
    });
  }

}

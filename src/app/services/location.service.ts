import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserMetaService} from './user.meta.service';

@Injectable()
export class LocationService {
  constructor(public http: HttpClient, public userMetaService: UserMetaService) {
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      this.http.get('/api/v1/thirdparty/search-place-autocomplete')
        .subscribe((response_data: any) => {
          if (response_data.success) {
            resolve(response_data.data.items);
          } else {
            reject();
          }
        });
    });
  }

  getResults(query: any, query_level: any) {
    return new Promise(resolve => {
      this.http
        .get(
          this.userMetaService.organisation_api_endpoint +
          'api/v1/thirdparty/search-place-autocomplete?query-level=' +
          query_level +
          '&query=' +
          query
        )
        .subscribe(
          (data: any) => {
            if (data.success) {
              resolve(data.data);
            } else {
              resolve(false);
            }
          },
          error => {
            resolve(false);
          }
        );
    });
  }

  getPlace(place_id: any) {
    return new Promise(resolve => {
      this.http
        .get(
          this.userMetaService.organisation_api_endpoint +
          'api/v1/thirdparty/search-place?query=' +
          place_id
        )
        .subscribe(
          (data: any) => {
            if (data.success) {
              resolve(data.data);
            } else {
              resolve(false);
            }
          },
          error => {
            resolve(false);
          }
        );
    });
  }
}

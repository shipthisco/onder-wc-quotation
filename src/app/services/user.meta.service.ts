import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserMetaService {
  HAS_LOGGED_IN = 'hasLoggedIn';
  data: any;
  organisation_id;
  auth_token = '';
  logged_in = false;
  base_api_path = 'api/v1/customer/auth/';
  organisation_api_endpoint;

  constructor(
    public http: HttpClient) {
  }

  setOrganisationDetail(organisation_id, api_endpoint) {
    this.organisation_id = organisation_id;
    this.organisation_api_endpoint = api_endpoint;
  }

  login(email: string, password: string) {
    // don't have the data yet
    return new Promise(resolve => {
      this.http
        .post(
          this.organisation_api_endpoint + this.base_api_path + 'login',
          {
            email: email.toLowerCase(),
            password: password
          },
          {
            headers: new HttpHeaders()
              .append('organisation', this.organisation_id)
              .append('usertype', 'customer')
          }
        )
        .subscribe((res: any) => {
          if (res.success) {
            this.data = this.processData(res.data.user);
            this.onLoginSuccess(res.data);
            resolve(this.data);
          } else {
            this.onLoginFailure();
            resolve(false);
          }
        });
    });
  }

  onLoginSuccess(data) {
  }

  onLoginFailure() {
  }

  processData(data) {
    this.logged_in = true;
    this.auth_token = data.auth_token;
    localStorage.setItem(this.HAS_LOGGED_IN, 'true');
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('authToken', data.auth_token);
    return data;
  }
}

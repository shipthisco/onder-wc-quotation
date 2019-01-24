import {Injectable} from '@angular/core';
import {UserMetaService} from './user.meta.service';

@Injectable()
export class WebComponentService {
  constructor(public userMetaService: UserMetaService) {
  }

  setComponentRequiredDetails(organisation_id, api_endpoint) {
    this.userMetaService.setOrganisationDetail(organisation_id, api_endpoint);
  }

}

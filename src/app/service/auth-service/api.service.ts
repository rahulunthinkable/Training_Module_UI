import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic-http.service';
import { url } from '../../utils/urls';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private genericHttpService: GenericHttpService) {}

  login(payload: any) {
    return this.genericHttpService.httpPost(url.LOGIN_URL, payload);
  }

  signup(payload: any) {
    return this.genericHttpService.httpPost(url.SIGNUP_URL,payload);
  }
}

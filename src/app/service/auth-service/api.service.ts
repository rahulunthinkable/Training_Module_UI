import { Inject, Injectable } from "@angular/core";
import { GenericHttpService } from "../generic-http.service";
import { url } from "../../utils/urls";
import { LocalStorageToken } from "src/app/localstorage.token";
import { HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(
    private genericHttpService: GenericHttpService,
    @Inject(LocalStorageToken) private localStorage: Storage
  ) {}

  userId = this.localStorage.getItem("_id");

  login(payload: any) {
    return this.genericHttpService.httpPost(url.LOGIN_URL, payload);
  }

  signup(payload: any) {
    return this.genericHttpService.httpPost(url.SIGNUP_URL, payload);
  }

  forget(payload: any) {
    return this.genericHttpService.httpPost(url.FORGET_URL, payload);
  }

  change_password(payload: any) {
    let changeUrl = url.CHANGE_URL + "/" + this.userId;
    return this.genericHttpService.httpPatch(changeUrl, payload);
  }

  getUserList(params: any) {
    let queryParams= new HttpParams();
    queryParams =  queryParams.append("limit",params.limit);
    queryParams =  queryParams.append("skip",params.skip);
    if(params.userType){
      queryParams =  queryParams.append("userType",params.userType);
    }
    if(params.createdAt){
      queryParams =  queryParams.append("createdAt",params.createdAt);
    }
    if(params.searchFilter){
      queryParams =  queryParams.append("keyword",params.searchFilter);
    }
    return this.genericHttpService.httpGet(url.USER_LIST_URL, queryParams);
  }
}

import { Inject, Injectable } from "@angular/core";
import { GenericHttpService } from "../generic-http.service";
import { url } from "../../utils/urls";
import { LocalStorageToken } from "src/app/localstorage.token";
import { HttpParams } from "@angular/common/http";
import { Storage_variables } from "src/app/utils/local-storage-variable";
import { courseUrl } from "../../utils/urls";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(
    private genericHttpService: GenericHttpService,
    @Inject(LocalStorageToken) private localStorage: Storage
  ) {}

  login(payload: any) {
    return this.genericHttpService.httpPost(url.LOGIN_URL, payload);
  }

  signup(payload: any) {
    return this.genericHttpService.httpPost(url.SIGNUP_URL, payload);
  }

  forget(payload: any) {
    return this.genericHttpService.httpPost(url.FORGET_URL, payload);
  }

  change_password(payload: any, userId: any) {
    let changeUrl = url.CHANGE_URL + "/" + userId;
    return this.genericHttpService.httpPatch(changeUrl, payload);
  }

  getUserList(params: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("limit", params.limit);
    queryParams = queryParams.append("skip", params.skip);
    if (params.userType) {
      queryParams = queryParams.append("userType", params.userType);
    }
    if (params.createdAt) {
      queryParams = queryParams.append("createdAt", params.createdAt);
    }
    if (params.searchFilter) {
      queryParams = queryParams.append("keyword", params.searchFilter);
    }
    return this.genericHttpService.httpGet(url.USER_LIST_URL, queryParams);
  }

  getCourseInfo(queryParams: any) {
    return this.genericHttpService.httpGet(
      `${courseUrl.COURSE_URL}/${queryParams}`
    );
  }

  updateUser(payload: any, userId: any) {
    let updateUserUrl = url.USER_LIST_URL + "/" + userId;
    return this.genericHttpService.httpPatch(updateUserUrl, payload);
  }

  addSection(playload: any) {
    return this.genericHttpService.httpPost(courseUrl.SECTION_URL, playload);
  }

  updateSection(playload: any, id:any) {
    return this.genericHttpService.httpPatch(`${courseUrl.SECTION_URL}/${id}`,playload);
  }
  getAllSections(id:any) {
    let courseId = {
      courseId: id,
    }
    return this.genericHttpService.httpGet(courseUrl.SECTION_URL, courseId);
  }
}

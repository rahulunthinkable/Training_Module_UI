import { Inject, Injectable, OnInit } from "@angular/core";
import { LocalStorageToken } from "src/app/localstorage.token";
import { JwtTokenService } from "../jwt-token-service/jwt-token.service";
import { UserDetails } from "src/app/shared/components/user-profile/view-profile/user.model";
import { GenericHttpService } from "../generic-http.service";
import { InternalRoutes } from "src/app/utils/internal-routes";
import { url } from "../../utils/urls";

@Injectable({
  providedIn: "root",
})
export class UserDetailService {
  public userDetails: any;
  private token: any;

  constructor(
    @Inject(LocalStorageToken) private localstorage: Storage,
    private jwtTokenService: JwtTokenService,
    private genericHttpService: GenericHttpService
  ) {}

  getUserDetails(): UserDetails {
    this.token = this.localstorage.getItem("token");
    this.userDetails = this.jwtTokenService.decodeToken(this.token);
    return this.userDetails;
  }

  getUserDetailApi(id: any) {
    let userUrl = url.USER_LIST_URL + "/" + id;
    return this.genericHttpService.httpGet(userUrl);
  }
}

import { Inject, Injectable, OnInit } from "@angular/core";
import { LocalStorageToken } from "src/app/localstorage.token";
import { JwtTokenService } from "../jwt-token-service/jwt-token.service";
import { UserDetails } from "src/app/shared/components/user-profile/view-profile/user.model";

@Injectable({
  providedIn: "root",
})
export class UserDetailService {
  public userDetails: any;
  private token: any;

  constructor(
    @Inject(LocalStorageToken) private localstorage: Storage,
    private jwtTokenService: JwtTokenService
  ) {}

  getUserDetails(): UserDetails {
    this.token = this.localstorage.getItem("token");
    this.userDetails = this.jwtTokenService.decodeToken(this.token);
    return this.userDetails;
  }
}

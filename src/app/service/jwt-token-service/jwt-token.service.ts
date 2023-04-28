import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class JwtTokenService {
  constructor() {}

  decodeToken(token: any) {
    return jwt_decode(token);
  }
}

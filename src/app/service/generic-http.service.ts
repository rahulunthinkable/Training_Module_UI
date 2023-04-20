import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../enviroment/enviroment";
@Injectable({
  providedIn: "root",
})
export class GenericHttpService {
  BACKEND_API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpPost(url: string, payload: any) {
    return this.http.post<any>(`${this.BACKEND_API_URL}/${url}`, payload);
  }

  httpPatch(url: string, payload: any) {
    return this.http.patch<any>(`${this.BACKEND_API_URL}/${url}`, payload);
  }
}

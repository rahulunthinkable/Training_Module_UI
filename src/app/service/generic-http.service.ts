import { HttpClient, HttpParams } from "@angular/common/http";
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

  httpGet(url:string, params:any) {
    let queryParams= new HttpParams();
    queryParams =  queryParams.append("limit",params.limit);
    queryParams =  queryParams.append("skip",params.skip);
    return this.http.get<any>(`${this.BACKEND_API_URL}/${url}`,{params: queryParams});
  }
}

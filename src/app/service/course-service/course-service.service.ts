import { Injectable } from "@angular/core";
import { GenericHttpService } from "../generic-http.service";
import { courseUrl, url } from "src/app/utils/urls";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  constructor(private genericHttpService: GenericHttpService) {}

  getAllCourse(params: any) {
    let queryParams = new HttpParams();
    queryParams = params;
    return this.genericHttpService.httpGet(courseUrl.COURSE_URL, queryParams);
  }
  getAllCategories() {
    return this.genericHttpService.httpGet(courseUrl.CATEGORY_URL);
  }
}

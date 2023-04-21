import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic-http.service';
import { courseUrl, url } from 'src/app/utils/urls';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private genericHttpService:GenericHttpService) { }

  getAllCourse(){
    return this.genericHttpService.httpGet(courseUrl.COURSE_URL)
  }
  getAllCategories(){
    return this.genericHttpService.httpGet(courseUrl.CATEGORY_URL)
  }
}

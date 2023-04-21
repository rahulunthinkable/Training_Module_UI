import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic-http.service';
import { courseUrl, url } from 'src/app/utils/urls';
import {Observable, forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private genericHttpService:GenericHttpService) { }

  public requestFromMulultibleResource(): Observable<any[]>{
    let request1= this.genericHttpService.httpGet(courseUrl.COURSE_URL)
    let request2 =this.genericHttpService.httpGet(courseUrl.CATEGORY_URL)

    return forkJoin([request1,request2])
  }

}

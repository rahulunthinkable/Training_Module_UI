import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../auth-service/api.service';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class SingleCourseService {

  sectionValid = new BehaviorSubject('');

  intoductionSection = {
    title : 'Introduction',
    sectionType: 'article',
    courseId :'',
    url: '',
    file: '',
    article: 'Welcome to my Course',
    description: '',
    orderBy: 0,
    image: '',
    filename: '',
  };


  constructor(
    private apiService: ApiService,
    private spinnerService: SpinnerService,
  ) { }

  sectionVal(state:any) {
    this.sectionValid.next(state);
  }

  addIntoductionSection(courseId:any) {
    
    this.spinnerService.loadSpinner();
    this.intoductionSection.courseId = courseId;
    console.log(courseId);
    this.apiService.addSection(this.intoductionSection).subscribe( {
      next: (resp) => {
        this.spinnerService.closeSpinner();
      }
    })
  }
}

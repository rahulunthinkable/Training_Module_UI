import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/auth-service/api.service';
import { SingleCourseService } from 'src/app/service/single-course/single-course.service';
import { SnackService } from 'src/app/service/snack-bar/snack.service';
import { SpinnerService } from 'src/app/service/spinner/spinner.service';
import { SnackClasses } from 'src/app/utils/snack-bar-classes';
import { ErrorMessages } from 'src/app/utils/error-messages';

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.scss']
})
export class SingleCourseComponent {

  courseInfo : any = {};
  sectionTitle = "Introduction";
  sectionStatus :any;


  constructor(
    private singleCourseService: SingleCourseService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private spinnerService: SpinnerService,
    private snackService: SnackService,
  ) { }

  basicInfoOfCourse = {
    title : 'Introduction',
    sectionType: '',
    courseId :'',
    url: '',
    file: '',
    article: 'Welcome to my Course',
    description: '',
    orderBy: 0,
    image: '',
  };

  Sections : any = [this.basicInfoOfCourse];
  CurrentNumberOfSections: any = 1;
  
  ngOnInit() {
    let id : any;
    this.activatedRoute.params.subscribe( (data) => {
      id = data;
      id = id.courseName;
    });
    this.basicInfoOfCourse.courseId = id;
    this.spinnerService.loadSpinner();
    this.apiService.getCourseInfo(id).subscribe( (data) => {
      this.courseInfo = data;
      this.spinnerService.closeSpinner();
    });
    this.singleCourseService.sectionValid.subscribe( (data) => {
      this.sectionStatus = data;
    });
    this.spinnerService.loadSpinner();
    this.apiService.getAllSections(id).subscribe( {
      next: (resp) => {
        this.spinnerService.closeSpinner();
        if(resp.length) {
          this.Sections = resp;
          console.log(this.Sections);

          this.CurrentNumberOfSections = this.Sections.length;
          this.orderTheSections();
        }
      }, error: (err) => {
        this.spinnerService.closeSpinner();
        this.snackService.openSnackBar(err.message,1000,SnackClasses.ERROR)
        console.log(err);
      }
    });
  }

  compare(a :any, b: any) {
    return a.orderBy > b.orderBy;
  }

  orderTheSections() {
    this.Sections.sort(this.compare);
  }

  addSection() {
    if(!this.sectionStatus || this.Sections.length == 1) {
      this.Sections.push(this.Sections.length);
    } else {
      this.snackService.openSnackBar(ErrorMessages.DATA_IS_NOT_SAVED,1000,SnackClasses.ERROR);
    }
  }

  removeSec(event:any) {
    if(this.Sections.length > 1 && event != 0) {
      this.Sections.splice(event,1);
    }
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-basic-info',
  templateUrl: './course-basic-info.component.html',
  styleUrls: ['./course-basic-info.component.scss']
})
export class CourseBasicInfoComponent {
  @Input() courseInfo:any = '';
}

import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent implements OnChanges {
  @Input("data") courseData: any;
  constructor(private router:Router) {}

  ngOnChanges(change:any): void {    
  }

  navigateToCourseDetailPage(id:string) {
     this.router.navigate([`/home/admin/course/${id}`]);
  }
}

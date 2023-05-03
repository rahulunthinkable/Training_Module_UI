import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.component.html",
  styleUrls: ["./course-detail.component.scss"],
})
export class CourseDetailComponent implements OnInit {
  courseId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe().subscribe((res) => {
      this.courseId = res["id"];
    });
    this.getCourseDetail(this.courseId);
  }

  getCourseDetail(courseId: string) {}
}

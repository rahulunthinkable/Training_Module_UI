import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/service/course-service/course-service.service";
import { SpinnerService } from "src/app/service/spinner/spinner.service";
import { courseFilter } from "./course-filter/course-filter";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"],
})
export class CourseComponent implements OnInit {
  courseData: any;
  categories: any;
  filterOptions: any = courseFilter;
  constructor(
    private courseApiService: CourseService,
    private categoryApiService: CourseService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.spinnerService.loadSpinner();
    this.courseApiService
      .requestFromMulultibleResource()
      .subscribe((responseList: any[]) => {
        this.courseData = responseList[0];
        this.courseData = this.courseData.map((course: any) => {
          course.image = `data:image/png;base64,${course.image}`;
          return course;
        });

        this.categories = responseList[1];
        this.filterOptions[0].options = this.categories.map((category: any) => {
          category["viewValue"] = category.categoryName;
          return category;
        });
        this.spinnerService.closeSpinner();
      });
  }

  selectedFilters(event: Event) {
  }
}

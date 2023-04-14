import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"],
})
export class CourseComponent implements OnInit {
  courseData: any;
  constructor() {}

  ngOnInit(): void {
    this.courseData = [
      {
        heading: "What is Html",
        paragraph:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quaerat sed suscipit. Vero fugit repellat quas ipsum maxime, sit dolorum aperiam ex rem est qui labore ut accusamus doloremque blanditiis!",
      },
      {
        heading: "What is Css",
        paragraph:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quaerat sed suscipit. Vero fugit repellat quas ipsum maxime, sit dolorum aperiam ex rem est qui labore ut accusamus doloremque blanditiis!",
      },
      {
        heading: "What is JavaScript",
        paragraph:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quaerat sed suscipit. Vero fugit repellat quas ipsum maxime, sit dolorum aperiam ex rem est qui labore ut accusamus doloremque blanditiis!",
      },
      {
        heading: "What is Angular JS",
        paragraph:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quaerat sed suscipit. Vero fugit repellat quas ipsum maxime, sit dolorum aperiam ex rem est qui labore ut accusamus doloremque blanditiis!",
      },
      {
        heading: "What is Angular",
        paragraph:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quaerat sed suscipit. Vero fugit repellat quas ipsum maxime, sit dolorum aperiam ex rem est qui labore ut accusamus doloremque blanditiis!",
      },
      {
        heading: "What is React Js",
        paragraph:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quaerat sed suscipit. Vero fugit repellat quas ipsum maxime, sit dolorum aperiam ex rem est qui labore ut accusamus doloremque blanditiis!",
      },
      {
        heading: "What is Reacti Native",
        paragraph:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quaerat sed suscipit. Vero fugit repellat quas ipsum maxime, sit dolorum aperiam ex rem est qui labore ut accusamus doloremque blanditiis!",
      },
      {
        heading: "What is Express Js",
        paragraph:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quaerat sed suscipit. Vero fugit repellat quas ipsum maxime, sit dolorum aperiam ex rem est qui labore ut accusamus doloremque blanditiis!",
      },
      {
        heading: "What is Next Js",
        paragraph:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quaerat sed suscipit. Vero fugit repellat quas ipsum maxime, sit dolorum aperiam ex rem est qui labore ut accusamus doloremque blanditiis!",
      },
      {
        heading: "What is Nest Js",
        paragraph:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quaerat sed suscipit. Vero fugit repellat quas ipsum maxime, sit dolorum aperiam ex rem est qui labore ut accusamus doloremque blanditiis!",
      },
      {
        heading: "What is Mongo DB",
        paragraph:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quaerat sed suscipit. Vero fugit repellat quas ipsum maxime, sit dolorum aperiam ex rem est qui labore ut accusamus doloremque blanditiis!",
      },
      {
        heading: "What is My SQL",
        paragraph:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quaerat sed suscipit. Vero fugit repellat quas ipsum maxime, sit dolorum aperiam ex rem est qui labore ut accusamus doloremque blanditiis!",
      },
    ];
  }
}

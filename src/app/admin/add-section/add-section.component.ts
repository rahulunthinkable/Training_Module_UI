import { HttpClient } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ApiService } from "src/app/service/auth-service/api.service";
import { SingleCourseService } from "src/app/service/single-course/single-course.service";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { SpinnerService } from "src/app/service/spinner/spinner.service";
import { ErrorMessages } from "src/app/utils/error-messages";
import { SnackClasses } from "src/app/utils/snack-bar-classes";
import { SuccessMessages } from "src/app/utils/success-messages";

@Component({
  selector: "app-add-section",
  templateUrl: "./add-section.component.html",
  styleUrls: ["./add-section.component.scss"],
})
export class AddSectionComponent {
  contentSelected = false;
  articleSelected = false;
  videoSelected = false;
  fileSelected = false;
  editable = true;
  fileName = "Select the File you want to upload";
  videoName = "Select the Video you want to upload";
  public Editor = ClassicEditor;
  filereader: any = "";
  courseId: any = "";
  sectionSaved = false;
  sectionUpdate = false;

  @ViewChild("uploadedFile") uploadedFile!: ElementRef;
  @Output() removeSection = new EventEmitter();
  @Input() sectionTitle: any = "";
  @Input() sectionNumber: any = 0;
  @Input() sectionContentType: any = "";
  @Input() videoUrl: any = "";
  @Input() fileData: any = "";
  @Input() articleData: any = "";
  @Input() sectionId: any = "";
  @Input() sectionFileName: any = "";

  sectionForm: FormGroup = this.fb.group({
    title: [this.sectionTitle, [Validators.required]],
    sectionType: ["", [Validators.required]],
    courseId: ["", [Validators.required]],
    url: [""],
    file: [""],
    article: [""],
    description: [""],
    orderBy: [this.sectionNumber, [Validators.required]],
    image: [""],
    filename: [""],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private apiService: ApiService,
    private snackService: SnackService,
    private singleCourseService: SingleCourseService,
    private activatedRoute: ActivatedRoute,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.sectionForm.controls["title"].setValue(this.sectionTitle);
    this.sectionForm.controls["orderBy"].setValue(this.sectionNumber);
    if (this.sectionTitle) {
      this.singleCourseService.sectionVal(false);
    } else {
      this.singleCourseService.sectionVal(true);
    }
    this.editable = this.sectionTitle ? false : true;
    this.activatedRoute.params.subscribe((data) => {
      this.courseId = data;
      this.courseId = this.courseId.courseName;
      this.sectionForm.controls["courseId"].setValue(this.courseId);
    });
    this.sectionForm.controls["sectionType"].setValue(this.sectionContentType);
    this.sectionForm.controls["url"].setValue(this.videoUrl);
    this.sectionForm.controls["article"].setValue(this.articleData);
    if (this.sectionFileName) {
      this.sectionForm.controls["filename"].setValue(this.sectionFileName);
      this.fileName = this.sectionFileName;
    }
    if (this.sectionContentType) {
      this.sectionSaved = true;
    }
  }

  titleEntered() {
    this.singleCourseService.sectionVal(false);
  }

  fileUpload(event: any) {
    this.fileName = this.uploadedFile.nativeElement.value.substring(12);
    this.sectionForm.get("filename")?.setValue(this.fileName);
    this.filereader = new FileReader();
    this.filereader.onload = this.handleFileLoad;
    this.filereader.readAsText(event.target.files[0]);
    this.sectionForm.controls["url"].setValue("");
    this.sectionForm.controls["article"].setValue("");
  }

  videoUploading() {
    this.sectionForm.controls["article"].setValue("");
    this.sectionForm.controls["file"].setValue("");
  }

  handleFileLoad(event: any) {}

  removeSec() {
    this.removeSection.emit(this.sectionNumber);
  }

  saveArticle() {
    if (this.sectionForm.valid) {
      this.sectionForm.controls["file"].setValue(this.filereader.result);
      if (
        this.fileName == "Select the File you want to upload" &&
        (this.sectionForm.controls["url"].value == "" ||
          this.sectionForm.controls["url"].value == undefined) &&
        (this.sectionForm.controls["file"].value == "" ||
          this.sectionForm.controls["file"].value == undefined) &&
        (this.sectionForm.controls["article"].value == "" ||
          this.sectionForm.controls["article"].value == undefined)
      ) {
        this.snackService.openSnackBar(
          ErrorMessages.NO_DATA,
          1000,
          SnackClasses.HALF_ERROR
        );
      } else {
        console.log("queen");

        this.spinnerService.loadSpinner();
        if (this.sectionForm.get("sectionType")?.value != "file") {
          this.fileName = "";
          this.sectionForm.get("filename")?.setValue("");
        }
        if (this.sectionUpdate) {
          this.apiService
            .updateSection(this.sectionForm.value, this.sectionId)
            .subscribe((data) => {
              this.snackService.openSnackBar(
                SuccessMessages.SECTION_UPDATED_SUCCESSFULLY,
                1000,
                SnackClasses.SUCCESS
              );
              this.spinnerService.closeSpinner();
            });
          this.sectionSaved = true;
        } else {
          this.apiService.addSection(this.sectionForm.value).subscribe({
            next: (resp) => {
              this.spinnerService.closeSpinner();
              this.snackService.openSnackBar(
                SuccessMessages.SECTION_ADDED_SUCCESSFULLY,
                1000,
                SnackClasses.SUCCESS
              );
              this.titleEntered();
              this.sectionSaved = !this.sectionSaved;
              console.log(resp);
            },
            error: (err) => {
              this.spinnerService.closeSpinner();
              this.snackService.openSnackBar(
                ErrorMessages.SOMETHING_WENT_WRONG,
                1000,
                SnackClasses.ERROR
              );
            },
          });
        }
      }
    } else {
      this.snackService.openSnackBar(
        ErrorMessages.NO_DATA,
        1000,
        SnackClasses.HALF_ERROR
      );
    }
  }

  cancelArticle() {
    this.articleSelected = !this.articleSelected;
  }

  cancelVideo() {
    if (this.sectionForm.get("url")?.value == "") {
      this.videoSelected = !this.videoSelected;
    }
    this.sectionForm.controls["url"].setValue("");
    this.videoName = "Select the Video you want to upload";
  }

  cancelFile() {
    if (this.sectionForm.get("article")?.value == "") {
      this.fileSelected = !this.fileSelected;
    } else {
      this.sectionForm.controls["article"].setValue("");
      this.fileName = "Select the File you want to upload";
      this.sectionForm.get("filename")?.setValue("");
      this.filereader = "";
    }
  }

  typeSelected(type: any, typeField?: any) {
    this.sectionForm.controls["sectionType"].setValue(type);
    if (typeField == "articleSelected") {
      this.articleSelected = !this.articleSelected;
      this.sectionForm.controls["url"].setValue("");
      this.sectionForm.controls["file"].setValue("");
    } else if (typeField == "videoSelected") {
      this.videoSelected = !this.videoSelected;
    } else {
      this.fileSelected = !this.fileSelected;
    }
  }

  editSection() {
    this.sectionSaved = !this.sectionSaved;
    this.sectionUpdate = true;
    this.contentSelected = true;
    if (this.sectionForm.get("sectionType")?.value == "article") {
      this.articleSelected = true;
    } else if (this.sectionForm.get("sectionType")?.value == "file") {
      this.fileSelected = true;
    } else {
      this.videoSelected = true;
    }
  }

  sectionClosed() {
    console.log("king");

    if (this.sectionForm.valid) {
      this.sectionForm.controls["file"].setValue(this.filereader.result);
      if (
        (this.sectionForm.controls["url"].value == "" ||
          this.sectionForm.controls["url"].value == undefined) &&
        (this.sectionForm.controls["file"].value == "" ||
          this.sectionForm.controls["file"].value == undefined) &&
        (this.sectionForm.controls["article"].value == "" ||
          this.sectionForm.controls["article"].value == undefined)
      ) {
        if (this.fileName != "Select the File you want to upload") {
          this.sectionSaved = !this.sectionSaved;
        } else {
          this.snackService.openSnackBar(
            ErrorMessages.NO_DATA,
            1000,
            SnackClasses.HALF_ERROR
          );
        }
      } else {
        this.sectionSaved = !this.sectionSaved;
      }
    }
  }
}

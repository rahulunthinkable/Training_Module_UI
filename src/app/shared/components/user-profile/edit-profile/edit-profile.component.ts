import { Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { LocalStorageToken } from "src/app/localstorage.token";
import { UserDetailService } from "src/app/service/User-detail-service/user-detail.service";
import { ApiService } from "src/app/service/auth-service/api.service";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { SpinnerService } from "src/app/service/spinner/spinner.service";
import { InternalRoutes } from "src/app/utils/internal-routes";
import { SnackClasses } from "src/app/utils/snack-bar-classes";
import { SuccessMessages } from "src/app/utils/success-messages";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent {
  editProfieForm: any;
  userDetails: any;
  editForm = new FormData();
  image: any = "../../../../../assets/Images/user.png";
  selected = "english";
  userTypes = [
    {
      _id: "trainer",
      viewValue: "Trainer",
    },
    {
      _id: "trainee",
      viewValue: "Trainee",
    },
    {
      _id: "Admin",
      viewValue: "Admin",
    },
  ];
  constructor(
    @Inject(LocalStorageToken) private localstorage: Storage,
    private formBuilder: FormBuilder,
    private getUserDetails: UserDetailService,
    private apiService:ApiService,
    private snackBarService:SnackService,
    private loaderService:SpinnerService,
    private router:Router,
    private translateService:TranslateService
  ) {}

  ngOnInit() {
    this.userDetails = this.getUserDetails.getUserDetails();
    if(this.userDetails?.userImage){
      this.image=this.userDetails.userImage
    }
    this.editProfieForm = this.formBuilder.group({
      userName: [this.userDetails.name, Validators.required],
      userEmail: [
        { value: this.userDetails.email, disabled: true },
        [Validators.required, Validators.email],
      ],
      userType: [this.userDetails.role],
    });
  }

  onImageUpload(event: any) {
    let image: File = event.target.files[0];
    this.image = URL.createObjectURL(image);
    if (image) {
      this.editForm.set("image", image);
    }
  }
  changeProfileData() {
    if (this.editProfieForm.valid) {
      this.editForm.set("userName", this.editProfieForm.value.userName);
      this.editForm.set(
        "userEmail",
        this.editProfieForm.controls.userEmail.value
      );
      this.editForm.set("userType", this.editProfieForm.value.userType);
    }
    this.loaderService.loadSpinner()
    this.apiService.updateUser(this.editForm,this.userDetails.id).subscribe({
      next:(value:any)=>{
        this.loaderService.closeSpinner()
        this.snackBarService.successSnackBar(SuccessMessages.USER_UPDATED_SUCCESS)
        this.localstorage.setItem('token',value.token)
        this.router.navigateByUrl(InternalRoutes.PROFILE)
      },
      error:(err:any)=>{
        this.loaderService.closeSpinner()
        this.snackBarService.errorSnackBar(err.error.message)
      }
    })
  }
  cancelProfileUpdate(){
    this.router.navigateByUrl(InternalRoutes.PROFILE)
  }
}

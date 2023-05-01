import { Component, OnInit } from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  editProfile = false;

  constructor(private route: Router) {}
  ngOnInit() {    
    if(this.route.url=='/home/admin/profile'){
      this.editProfile=false
    }
    else{
      this.editProfile=true
    }
    this.route.events.pipe(filter((event:any)=>event instanceof NavigationEnd)).subscribe((event:any)=>{
      if(event.url=='/home/admin/profile'){
        this.editProfile=false
      }
    })
  }

}

import { Component, OnInit } from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { filter } from "rxjs";
import { UserService } from "../services/user-detail-service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  editProfile = false;
  userName: any;
  loggedUserMode = true;
  constructor(private route: Router, private userDetailsService: UserService) {}
  ngOnInit() {
    this.userDetailsService.userName.subscribe((name: any) => {
      this.userName = name;
    });
    if (this.route.url == "/home/admin/profile") {
      this.editProfile = false;
    } else if (this.route.url.includes("user")) {
      this.loggedUserMode = false;
    } else {
      this.editProfile = true;
    }
    this.route.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url == "/home/admin/profile") {
          this.editProfile = false;
        }
      });
  }
}

import { Component } from '@angular/core';
import { SpinnerService } from './service/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LearningResources';
  spinner = false;
  subject : any;

  constructor(
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {
    this.subject = this.spinnerService.spinnerSubject;
    this.subject.subscribe( (data : any) => {
      this.spinner = data;
    });
  }
}

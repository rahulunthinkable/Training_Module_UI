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

  constructor(
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {
    this.spinnerService.spinnerSubject.subscribe( (data) => {
      this.spinner = data;
    });
  }
}

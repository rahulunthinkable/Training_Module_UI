import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  openSnackBar(message: string, time: any, snackType : any) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: snackType,
    },);
    setTimeout(() => {
      this._snackBar.dismiss();
    }, time);
  }
}

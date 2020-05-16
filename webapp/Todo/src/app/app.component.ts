import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo';
  constructor() { }
  show : any;
  // input passed to child components
  showBtn : any = "Add";
  ngOnInit(): void {
  }
  // function to change the showbtn val
  outputemit(x : string){
    this.showBtn = x;
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { IResponse } from '../IResponse';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})
export class ViewallComponent implements OnInit {
  @Input() showBtn: any;
  @Output() show = new EventEmitter<string>();
  constructor(private service: AppServiceService) { 
  }
  viewall: any = [];
  expandView: boolean = false;
  view: any;
  ngOnInit(): void {
    this.getAlltodo();
  }
  // function to gt all the values from backend
  getAlltodo() {
    this.service.get('TD-All').subscribe(x => {
    this.viewall = x;
    this.viewall.reverse();
    });
  }
  emit() {
    this.show.emit("View");
  }
  // func to expand the view
  expand(x: any) {
    this.expandView = true;
    this.view = x;
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  // on click of close btn
  spanClick(){
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  // on click of del btn
  delete(x: IResponse) {
    event.stopPropagation();
    let arr = [];
    arr.push(x.id);
    // del method
    this.service.delete<IResponse>('TD-Del', arr).subscribe(y=>{
      this.getAlltodo();
    });
  }
  // on click of complete btn
  complete(x: any) {
    event.stopPropagation();
    let arr = [];
    arr.push(x.id);
    let body = Object(x);
    body.isCompleted = true;
    // put method
    this.service.put<IResponse>('TD-Put', body, arr).subscribe(y =>{
      body.modifiedDate = y.modifiedDate;
    });
  }
  // on click of incomplete btn
  inComplete(x: any) {
    event.stopPropagation();
    let arr = [];
    arr.push(x.id);
    let body = Object(x);
    body.isCompleted = false;
    // appends the modified datte
    this.service.put<IResponse>('TD-Put', body, arr).subscribe(y =>{
      body.modifiedDate = y.modifiedDate;
    });
  }
}

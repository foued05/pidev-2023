import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/userServices/user.service';

@Component({
  selector: 'app-basicelements',
  templateUrl: './basicelements.component.html',
  styleUrls: ['./basicelements.component.scss']
})
export class BasicelementsComponent implements OnInit {
    simpleSlider = 40;
    doubleSlider = [20, 60];
    state_default: boolean = true;
    focus: any;

    mode = "";
  

    ngOnInit() {
      this.mode = localStorage.getItem('mode');
      console.log(this.mode)

    }
    

}

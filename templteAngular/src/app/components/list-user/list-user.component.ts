import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/userServices/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  improveUser(id: string){
    this.userService.improvedAccount(id).subscribe(() => {
      this.getUsers();
    });
  }

}

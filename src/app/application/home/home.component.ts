import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/providers';
import { IUser } from '@core/interfaces';

@Component({
  selector: 'barbex-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: IUser;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.currentUser;
  }

}

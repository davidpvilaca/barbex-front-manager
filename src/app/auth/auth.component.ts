import { Component, OnInit } from '@angular/core';
import { environment } from '@environments';

@Component({
  selector: 'barbex-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  version = environment.version;

  constructor() { }

  ngOnInit() {
  }

}

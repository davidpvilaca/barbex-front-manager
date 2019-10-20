import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'barbex-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.scss']
})
export class ValidationErrorsComponent implements OnInit {

  @Input() error: string;

  constructor() { }

  ngOnInit() {
  }

}

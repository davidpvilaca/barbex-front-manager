import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { BarbexApiService } from '@core/providers';

@Component({
  selector: 'barbex-barbershop-register',
  templateUrl: './barbershop-register.component.html',
  styleUrls: ['./barbershop-register.component.scss']
})
export class BarbershopRegisterComponent implements OnInit {

  form: FormGroup;
  constructor(private readonly formBuilder: FormBuilder, private readonly api: BarbexApiService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      cep: [''],
      street: [''],
      number: [''],
      complement: [''],
      neighborhood: [''],
      city: [''],
      state: ['']
    });
  }
  
  submit() {
    const { name, cnpj, cep, street, number, complement, neighborhood, city, state } = this.form.value;
    this.api.registerAddress({ name, cnpj, cep, street, number, complement, neighborhood, city, state }).subscribe(
      data => {
        this.api.registerBarbershop(data.id, { name, cnpj }).subscribe(
          data => console.log(data),
          err => console.error(err)
        );
      }
    )
  }

}

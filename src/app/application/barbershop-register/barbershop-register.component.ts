import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, mergeMap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { BarbexApiService, LoadingService } from '@core/providers';

@Component({
  selector: 'barbex-barbershop-register',
  templateUrl: './barbershop-register.component.html',
  styleUrls: ['./barbershop-register.component.scss']
})
export class BarbershopRegisterComponent implements OnInit {

  form: FormGroup;
  constructor(private readonly formBuilder: FormBuilder,
    private readonly api: BarbexApiService,
    private readonly loading: LoadingService,
    private readonly messageService: MessageService,
    private readonly router: Router) { }

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
    this.toutchForm();
    if (this.form.invalid) { return; }
    this.loading.setLoading();
    const { name, cnpj, cep, street, number: num, complement, neighborhood, city, state } = this.form.value;
    this.api.registerAddress({ cnpj, cep, street, number: num, complement, neighborhood, city, state }).pipe(
      finalize(() => this.loading.clearLoading()),
      mergeMap(data => this.api.registerBarbershop({ name, cnpj, address_id: data.id }))
    ).subscribe(
      data => this.onSuccess(data),
      err => this.onError(err)
    );
  }

  back(): void {
    this.router.navigateByUrl('/app/barbershop');
  }

  private onSuccess(data: any): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Tudo certo',
      detail: `Barbearia "${data.name}" cadastrada com sucesso!`
    });
    this.form.reset({});
    this.back();
  }

  private onError(err: any): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Algo deu errado',
      detail: 'Não foi possível cadastrar a barbearia. Verifique as informações e tente novamente!'
    });
  }

  private toutchForm(): void {
    if (this.form.touched) { return; }
    Object.keys(this.form.controls).forEach(key => this.form.controls[key].markAsTouched());
  }

}

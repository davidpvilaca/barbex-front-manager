import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { BarbexApiService, LoadingService } from '@core/providers';

@Component({
  selector: 'barbex-barber-register',
  templateUrl: './barber-register.component.html',
  styleUrls: ['./barber-register.component.scss']
})
export class BarberRegisterComponent implements OnInit {

  form: FormGroup;
  barbershop: any = {};
  constructor(private readonly formBuilder: FormBuilder, private readonly loading: LoadingService,
    private readonly api: BarbexApiService, private readonly messageService: MessageService,
    private readonly router: Router, private readonly route: ActivatedRoute) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      barbershopId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.checkPasswords.bind(this)]],
      repassword: ['', [Validators.required, this.checkPasswords.bind(this)]]
    });

    const password = this.form.get('password');
    const repassword = this.form.get('repassword');
    repassword.valueChanges.subscribe(() => {
      if (password && password.errors && password.errors.repassword) {
        if (Object.keys(password.errors).length === 1) {
          password.reset(password.value);
        }
      }
    });

    const barbershopId = this.route.snapshot.params.barbershopId;
    this.form.get('barbershopId').setValue(barbershopId);
    this.getBarbershops(barbershopId);
  }

  getFormFieldError(formControlName: string): string | null {
    const formControl = this.form.get(formControlName);
    if (formControl && formControl.invalid) {
      if (formControl.hasError('required')) {
        return 'Campo obrigatório';
      }
      if (formControl.hasError('email')) {
        return 'Email inválido';
      }
      if (formControl.hasError('minlength')) {
        return 'Mínimo 6 caracteres';
      }
      if (formControl.hasError('repassword')) {
        return 'Senhas não correspondem';
      }
    }
    return null;
  }

  back(): void {
    this.router.navigateByUrl('/app/barber');
  }

  submit() {
    this.toutchForm();
    if (this.form.invalid) { return; }
    this.loading.setLoading();
    const { barbershopId, name, email, password } = this.form.value;
    this.api.registerBarber(barbershopId, { name, email, password }).pipe(
      finalize(() => this.loading.clearLoading())
    ).subscribe(
      data => this.onSuccess(data),
      err => this.onError(err)
    );
  }

  private onSuccess(data: any): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Tudo certo',
      detail: `Barbeiro "${data.user.name}" cadastrada com sucesso!`
    });
    this.form.reset({});
  }

  private onError(err: any): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Algo deu errado',
      detail: 'Não foi possível cadastrar o barbeiro. Verifique as informações e tente novamente!'
    });
  }

  private checkPasswords() {
    if (!this.form) { return null; }
    const pass = this.form.get('password').value;
    const confirmPass = this.form.get('repassword').value;
    return pass === confirmPass ? null : { repassword: true };
  }

  private toutchForm(): void {
    if (this.form.touched) { return; }
    Object.keys(this.form.controls).forEach(key => this.form.controls[key].markAsTouched());
  }

  private getBarbershops(id: string): void {
    this.loading.setLoading();
    this.api.getBarbershop(id).pipe(
      finalize(() => this.loading.clearLoading())
    ).subscribe(
      data => this.barbershop = data,
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Algo deu errado',
          detail: 'Ocorreu um erro ao tentar buscar as barbearias disponíveis em sua conta. ' +
            'Por favor recarregue a página para tentar novamente.'
        });
      }
    );
  }

}

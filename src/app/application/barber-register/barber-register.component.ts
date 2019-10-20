import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { LoadingService } from '@core/providers';

@Component({
  selector: 'barbex-barber-register',
  templateUrl: './barber-register.component.html',
  styleUrls: ['./barber-register.component.scss']
})
export class BarberRegisterComponent implements OnInit {

  form: FormGroup;
  constructor(private readonly formBuilder: FormBuilder, private readonly loading: LoadingService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
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

  submit() {
    this.toutchForm();
    if (this.form.invalid) { return; }
    this.loading.setLoading();
    setTimeout(() => {
      this.onSuccess(this.form.value);
      this.loading.clearLoading();
    }, 1500);
  }

  private onSuccess(data: any): void {
    console.log(data);
  }

  private onError(err: any): void {
    console.error(err);
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

}

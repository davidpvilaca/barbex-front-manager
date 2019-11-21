import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { LoadingService, AuthService } from '@core/providers';

@Component({
  selector: 'barbex-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  constructor(private readonly formBuilder: FormBuilder, private readonly loading: LoadingService,
    private readonly auth: AuthService, private readonly router: Router) { }

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

  submit() {
    this.toutchForm();
    if (this.form.invalid) { return; }
    this.loading.setLoading();
    this.auth.signup(this.form.value).pipe(
      finalize(() => this.loading.clearLoading())
    ).subscribe(
      () => {
        this.router.navigate(['/auth/login'], { queryParams: { signupSuccess: true } });
      },
      err => {
        console.log(err);
      }
    );
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

  private toutchForm(): void {
    if (this.form.touched) { return; }
    Object.keys(this.form.controls).forEach(key => this.form.controls[key].markAsTouched());
  }

  private checkPasswords() {
    if (!this.form) { return null; }
    const pass = this.form.get('password').value;
    const confirmPass = this.form.get('repassword').value;
    return pass === confirmPass ? null : { repassword: true };
  }

}

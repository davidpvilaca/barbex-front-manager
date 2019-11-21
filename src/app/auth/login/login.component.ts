import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';

import { AuthService, LoadingService } from '@core/providers';

@Component({
  selector: 'barbex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  private redirectTo: string;
  constructor(private readonly formBuilder: FormBuilder, private readonly route: ActivatedRoute,
    private readonly messageService: MessageService, private readonly auth: AuthService,
    private readonly loading: LoadingService, private readonly router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    const signupSuccess = this.route.snapshot.queryParamMap.get('signupSuccess');
    if (signupSuccess === 'true') {
      this.messageService.add({
        severity: 'success',
        summary: 'Tudo certo',
        detail: 'Conta cadastrada com sucesso!'
      });
    }

    this.redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
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
    }
    return null;
  }

  submit() {
    this.toutchForm();
    if (this.form.invalid) { return; }
    this.loading.setLoading();
    const { email, password } = this.form.value;
    this.auth.login(email, password).pipe(
      finalize(() => this.loading.clearLoading())
    ).subscribe(
      () => {
        this.router.navigate(this.redirectTo ? this.redirectTo.split('/').map(a => !a ? '/' : a) : ['/app']);
      },
      err => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Não autorizado',
          detail: 'Usuário ou senha inválido!'
        });
      }
    );
  }

  private toutchForm(): void {
    if (this.form.touched) { return; }
    Object.keys(this.form.controls).forEach(key => this.form.controls[key].markAsTouched());
  }

}

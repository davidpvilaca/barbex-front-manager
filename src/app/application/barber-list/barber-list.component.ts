import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { BarbexApiService, LoadingService } from '@core/providers';

@Component({
  selector: 'barbex-barber-list',
  templateUrl: './barber-list.component.html',
  styleUrls: ['./barber-list.component.scss']
})
export class BarberListComponent implements OnInit {

  barbers: any[] = [];
  cols = [
    { field: 'user.name', header: 'Nome' }
  ];
  barbershops: any[] = [];
  barbershop: any;

  constructor(private readonly api: BarbexApiService,
    private readonly loading: LoadingService,
    private readonly messageService: MessageService,
    private readonly router: Router) { }

  ngOnInit() {
    this.loading.setLoading();
    this.api.getBarbershops().pipe(
      finalize(() => this.loading.clearLoading())
    ).subscribe(
      data => this.barbershops = data,
      () => this.onError()
    );
  }

  getBarbers() {
    if (!this.barbershop) { return; }
    this.loading.setLoading();
    this.api.getBarbers(this.barbershop).pipe(
      finalize(() => this.loading.clearLoading())
    ).subscribe(
      data => this.barbers = data,
      () => this.onError()
    );
  }

  register(id: string): void {
    this.router.navigateByUrl('/app/barber/register/' + id);
  }

  private onError(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Algo deu errado',
      detail: 'Não foi possível carregar suas informações. Tente novamente mais tarde!'
    });
  }

}

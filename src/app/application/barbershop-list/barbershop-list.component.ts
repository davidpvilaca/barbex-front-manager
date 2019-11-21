import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { BarbexApiService, LoadingService } from '@core/providers';

@Component({
  selector: 'barbex-barbershop-list',
  templateUrl: './barbershop-list.component.html',
  styleUrls: ['./barbershop-list.component.scss']
})
export class BarbershopListComponent implements OnInit {

  barbershops: any[] = [];
  cols = [
    { field: 'name', header: 'Nome' },
    { field: 'grade', header: 'Avaliação' }
  ];
  addresses: any[] = [{ label: 'Todos', value: -1 }];
  private barbershopsBkp: any[] = [];

  constructor(private readonly api: BarbexApiService,
    private readonly loading: LoadingService,
    private readonly messageService: MessageService,
    private readonly router: Router) { }

  ngOnInit() {
    this.loading.setLoading();
    this.api.getBarbershops().pipe(
      finalize(() => this.loading.clearLoading())
    ).subscribe(
      data => {
        this.addresses = [...this.addresses, ...data.map(d => ({
          label: `${d.address.city.city} - ${d.address.city.state.state}`,
          value: d.address.city.id
        }))];
        this.barbershops = data;
        this.barbershopsBkp = data.slice(0);
      },
      () => this.onError()
    );
  }

  register(): void {
    this.router.navigateByUrl('/app/barbershop/register');
  }

  filterCity(id: number): void {
    if (id === -1) {
      this.barbershops = this.barbershopsBkp.slice(0);
      return;
    }
    this.barbershops = this.barbershopsBkp.filter(barbershop => barbershop.address.city.id === id);
  }

  private onError(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Algo deu errado',
      detail: 'Não foi possível carregar suas informações. Tente novamente mais tarde!'
    });
  }

}

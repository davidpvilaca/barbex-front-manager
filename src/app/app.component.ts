import { Component } from '@angular/core';
import { LoadingService } from '@core/providers';

@Component({
  selector: 'barbex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading = true;

  constructor(private readonly loading: LoadingService) {
    this.loading.isLoading.subscribe(value => this.isLoading = value);
  }
}

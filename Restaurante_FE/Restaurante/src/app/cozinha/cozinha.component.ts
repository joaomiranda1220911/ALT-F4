import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cozinha',
  standalone: true,
  imports: [],
  templateUrl: './cozinha.component.html',
  styleUrl: './cozinha.component.css'
})
export class CozinhaComponent {
  constructor(private router: Router) { }

  navigateToPratosManagement(): void {
    this.router.navigate(['/cozinha/pratos-management']);
  }

}

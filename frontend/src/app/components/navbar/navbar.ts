import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // <--- Ajoute ça

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink], // <--- Ajoute ça aussi
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {}
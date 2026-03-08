import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth'; // Import

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, // Injecter le service
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login réussi !', response);
          // On stocke l'info que l'utilisateur est connecté (très basique pour l'instant)
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/']); // Redirection vers l'accueil
        },
        error: (err) => {
          console.error('Erreur login', err);
          alert("Email ou mot de passe incorrect !");
        }
      });
    }
  }
}
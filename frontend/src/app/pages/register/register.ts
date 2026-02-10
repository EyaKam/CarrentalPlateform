import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Pour les *ngIf
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Pour le formulaire
import { Router, RouterLink } from '@angular/router'; // Pour la navigation
import { AuthService } from '../../services/auth';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule], // <--- On importe les modules ici
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor( 
    private fb: FormBuilder,
     private router: Router, 
     private authService: AuthService) 
     
     {
    // On crée le formulaire avec des validations
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
          // On prépare les données (on enlève confirmPassword qui ne sert pas au backend)
          const { confirmPassword, ...userData } = this.registerForm.value;

          // On appelle le service
          this.authService.register(userData).subscribe({
            next: (response) => {
              console.log('Succès !', response);
              alert('Compte créé avec succès ! Connectez-vous.');
              this.router.navigate(['/login']); // Redirection vers login
            },
            error: (error) => {
              console.error('Erreur', error);
              this.errorMessage = "Erreur lors de l'inscription (Email déjà pris ?)";
            }
          });
        }
      }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder, private authService: MovieApiServiceService, private router: Router) {
    this.loginForm = this.fb.group({
      name: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    // Vous pouvez effectuer des initialisations ici si nécessaire
  }

  onSubmit(): void {
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe(
      response => {
        // Traitez la réponse du backend ici
        console.log('Login successful', response);

        // Rediriger vers la page d'accueil après une connexion réussie
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login failed', error);

        // Afficher une alerte à l'utilisateur
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
       
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder, private authService: MovieApiServiceService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      this.authService.register(userData).subscribe(
        response => {
          console.log('Registration successful', response);
          // Ajouter ici la logique de redirection ou d'affichage d'un message de succès.
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Registration failed', error);
          // Ajouter ici la logique pour gérer les erreurs d'enregistrement.
          this.errorMessage = 'Registration failed. Please check your details and try again.';
        }
      );
    }
  }
}

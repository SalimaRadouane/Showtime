import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'showtime';
  navbg: any = {};

  constructor(private router: Router) {
    // Écouter les événements de routage
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Mettre à jour le style de la barre de navigation lorsque la navigation est terminée
        this.updateNavbarStyle();
      }
    });
  }

  // Méthode appelée lors du défilement
  @HostListener('window:scroll')
  scrollover() {
    // Appeler la méthode pour mettre à jour le style de la barre de navigation
    this.updateNavbarStyle();
  }

  // Méthode pour mettre à jour le style de la barre de navigation
  updateNavbarStyle() {
    // Ajouter la logique existante de la barre de navigation basée sur le défilement
    if (window.scrollY > 0) {
      this.navbg = {
        'background-color': '#000000'
      };
    } else {
      this.navbg = {};
    }

    // Ajouter la logique de masquage pour les routes login et register
    const currentRoute = this.router.url;
    if (currentRoute === '/' || currentRoute === '/registration') {
      this.navbg = { display: 'none' };
    }
  }
}

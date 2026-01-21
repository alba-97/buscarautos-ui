import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-page">
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
      <a routerLink="/" class="home-link">Volver al inicio</a>
    </div>
  `,
  styles: [`
    .not-found-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 50vh;
      gap: 1.25rem;
      text-align: center;
      padding: 2rem;

      h1 {
        font-family: 'Syne', sans-serif;
        font-size: 7rem;
        font-weight: 800;
        color: var(--accent);
        margin: 0;
        line-height: 1;
        letter-spacing: -0.04em;
        opacity: 0.6;
      }

      p {
        font-family: 'Barlow', sans-serif;
        color: var(--text-muted);
        font-size: 1rem;
        margin: 0;
      }

      .home-link {
        font-family: 'Barlow', sans-serif;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--text-muted);
        text-decoration: none;
        border: 1px solid var(--border);
        padding: 0.6rem 1.5rem;
        border-radius: 0.375rem;
        margin-top: 0.5rem;
        transition: color 0.15s, border-color 0.15s;

        &:hover {
          color: var(--accent);
          border-color: var(--accent);
        }
      }
    }
  `]
})
export class NotFoundComponent {}

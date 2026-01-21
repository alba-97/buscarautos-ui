import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    <div class="loading-container">
      <div class="loader">
        <div class="loader-bar"></div>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 16rem;
    }
    .loader {
      width: 3rem;
      height: 3px;
      background: var(--border);
      border-radius: 2px;
      overflow: hidden;
      position: relative;
    }
    .loader-bar {
      position: absolute;
      height: 100%;
      width: 40%;
      background: var(--accent);
      border-radius: 2px;
      animation: slide 1s ease-in-out infinite alternate;
    }
    @keyframes slide {
      from { left: -40%; }
      to { left: 100%; }
    }
  `]
})
export class LoadingComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Toast } from './shared/components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
/**
 * Root shell component.
 *
 * Renders the shared header, a `<router-outlet>` for page content,
 * the shared footer, and the global toast overlay.
 */
export class App {}

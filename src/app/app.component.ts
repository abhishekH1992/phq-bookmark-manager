import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, AsyncPipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'phq-bookmark-manager-test';

    constructor(public route: ActivatedRoute) {}
}

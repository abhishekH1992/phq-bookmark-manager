import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { OverviewComponent } from './overview/overview.component';

@Component({
    selector: 'app-root',
    imports: [HeaderComponent, OverviewComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'phq-bookmark-manager-test';
}

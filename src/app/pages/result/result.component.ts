import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Bookmark } from '../../model/bookmark.type';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-result',
    imports: [DatePipe],
    templateUrl: './result.component.html',
    styleUrl: './result.component.css'
})

// Result component
export class ResultComponent {
    bookmark: Bookmark | undefined;

    // Constructor
    constructor(private router: Router) {
        this.bookmark = this.router.getCurrentNavigation()?.extras.state?.['bookmark'];
    }

    // Go back to overview page
    goBack() {
        this.router.navigate(['/']);
    }
}

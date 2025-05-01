import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Bookmark } from '../../model/bookmark.type';
import { DatePipe } from '@angular/common';
import { SeederService } from '../../services/seeder.service';

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
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private seederService: SeederService
    ) {
        // Try to get bookmark from navigation state first
        this.bookmark = this.router.getCurrentNavigation()?.extras.state?.['bookmark'];
        
        // If not available in state, get from service using ID
        if (!this.bookmark) {
            const id = this.route.snapshot.params['id'];
            const bookmarks = this.seederService.getBookmarks();
            this.bookmark = bookmarks.find(b => b.id === Number(id));
            
            // If bookmark not found, redirect to overview
            if (!this.bookmark) {
                this.router.navigate(['/']);
            }
        }
    }

    // Go back to overview page
    goBack() {
        this.router.navigate(['/']);
    }
}

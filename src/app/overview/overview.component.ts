import { Component, signal, OnInit } from '@angular/core';
import { Bookmark } from '../model/bookmark.type';
import { SeederService } from '../services/seeder.service';
import { BookmarksComponent } from '../components/bookmarks/bookmarks.component';

@Component({
    selector: 'app-overview',
    imports: [BookmarksComponent],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {
    bookmarks = signal<Bookmark[]>([]);

    constructor(private seederService: SeederService) {}

    ngOnInit(): void {
        this.loadBookmarks();
    }

    loadBookmarks(): void {
        const storedBookmarks = this.seederService.getBookmarks();
        this.bookmarks.set(storedBookmarks);
    }

    seedBookmarks(): void {
        this.seederService.seedBookmarks();
        this.loadBookmarks();
    }

    deleteBookmarks(): void {
        this.seederService.deleteBookmarks();
        this.bookmarks.set([]);
    }
}

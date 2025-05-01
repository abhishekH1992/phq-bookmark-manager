import { Component, signal, OnInit } from '@angular/core';
import { Bookmark } from '../model/bookmark.type';
import { SeederService } from '../services/seeder.service';
import { BookmarksComponent } from '../components/bookmarks/bookmarks.component';
import { FormComponent } from '../components/form/form.component';

@Component({
    selector: 'app-overview',
    imports: [BookmarksComponent, FormComponent],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {
    bookmarks = signal<Bookmark[]>([]);
    showAddForm = signal(false);
    bookmarkToEdit = signal<Bookmark | null>(null);
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

    onBookmarkUpdatedOrAdded(bookmark: Bookmark): void {
        const currentBookmarks = this.bookmarks();
        const urlExists = currentBookmarks.some(b => b.id !== bookmark.id && b.url === bookmark.url);
        
        if (urlExists) {
            alert('This URL already exists in your bookmarks!');
            return;
        }

        const isExistingBookmark = currentBookmarks.some(b => b.id === bookmark.id);

        const updatedBookmarks = isExistingBookmark
            ? currentBookmarks.map(b => b.id === bookmark.id ? bookmark : b)
            : [...currentBookmarks, bookmark];
        
        this.seederService.saveBookmarks(updatedBookmarks);
        this.bookmarks.set(updatedBookmarks);
    }

    onEditBookmark(bookmark: Bookmark) {
        this.bookmarkToEdit.set(bookmark);
        this.showAddForm.set(true);
    }

    onFormCancel() {
        this.showAddForm.set(false);
        this.bookmarkToEdit.set(null);
    }

    trackByFn(index: number, item: Bookmark): number {
        return item.id;
    }
}

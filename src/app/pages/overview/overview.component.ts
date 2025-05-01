import { Component, signal, OnInit } from '@angular/core';
import { Bookmark } from '../../model/bookmark.type';
import { SeederService } from '../../services/seeder.service';
import { BookmarksComponent } from '../../components/bookmarks/bookmarks.component';
import { FormComponent } from '../../components/form/form.component';
import { Router } from '@angular/router';
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
    constructor(private seederService: SeederService, private router: Router) {}

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
        !isExistingBookmark && this.router.navigate(['/result'], { skipLocationChange: true, state: { bookmark } });
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

    onDeleteBookmark(bookmark: Bookmark) {
        const currentBookmarks = this.bookmarks();
        const updatedBookmarks = currentBookmarks.filter(b => b.id !== bookmark.id);
        this.seederService.saveBookmarks(updatedBookmarks);
        this.bookmarks.set(updatedBookmarks);
    }
}

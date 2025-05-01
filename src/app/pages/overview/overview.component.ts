import { Component, signal, OnInit } from '@angular/core';
import { Bookmark } from '../../model/bookmark.type';
import { SeederService } from '../../services/seeder.service';
import { BookmarksComponent } from '../../components/bookmarks/bookmarks.component';
import { FormComponent } from '../../components/form/form.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-overview',
    imports: [BookmarksComponent, FormComponent, FormsModule],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.css'
})

export class OverviewComponent implements OnInit {
    bookmarks = signal<Bookmark[]>([]);
    showAddForm = signal(false);
    bookmarkToEdit = signal<Bookmark | null>(null);
    searchTerm = signal('');
    sortBy = signal('');
    currentPage = signal(1);
    
    constructor(private seederService: SeederService, private router: Router) {}

    // Initialize the component
    ngOnInit(): void {
        this.loadBookmarks();
    }

    // Load the bookmarks
    loadBookmarks(): void {
        const storedBookmarks = this.seederService.getBookmarks();
        this.bookmarks.set(storedBookmarks);
    }

    // Seed the bookmarks
    seedBookmarks(): void {
        this.seederService.seedBookmarks();
        this.loadBookmarks();
    }

    // Delete the bookmarks
    deleteBookmarks(): void {
        this.seederService.deleteBookmarks();
        this.bookmarks.set([]);
    }

    // Bookmark updated or added
    onBookmarkUpdatedOrAdded(bookmark: Bookmark): void {
        const currentBookmarks = this.bookmarks();
        const urlExists = currentBookmarks.some(b => b.id !== bookmark.id && b.url === bookmark.url);
        
        if (urlExists) {
            alert('This URL already exists in your bookmarks!');
            return;
        }

        // Check if the bookmark already exists
        const isExistingBookmark = currentBookmarks.some(b => b.id === bookmark.id);

        // Update the bookmarks
        const updatedBookmarks = isExistingBookmark
            ? currentBookmarks.map(b => b.id === bookmark.id ? bookmark : b)
            : [...currentBookmarks, bookmark];

        // Save the bookmarks
        this.seederService.saveBookmarks(updatedBookmarks);
        this.bookmarks.set(updatedBookmarks);

        if (!isExistingBookmark) {
            // Navigate to result page with bookmark ID in URL
            this.router.navigate(['/result', bookmark.id], { 
                state: { bookmark }
            });
        }
    }

    // Edit the bookmark
    onEditBookmark(bookmark: Bookmark) {
        this.bookmarkToEdit.set(bookmark);
        this.showAddForm.set(true);
    }

    // Cancel the form
    onFormCancel() {
        this.showAddForm.set(false);
        this.bookmarkToEdit.set(null);
    }

    // Track the bookmarks
    trackByFn(index: number, item: Bookmark): number {
        return item.id;
    }

    // Delete the bookmark
    onDeleteBookmark(bookmark: Bookmark) {
        const currentBookmarks = this.bookmarks();
        const updatedBookmarks = currentBookmarks.filter(b => b.id !== bookmark.id);
        this.seederService.saveBookmarks(updatedBookmarks);
        this.bookmarks.set(updatedBookmarks);
    }

    // Sort the bookmarks
    onSortChange(value: string) {
        this.sortBy.set(value);
        this.currentPage.set(1);
    }
}

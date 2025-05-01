import { Component, computed, signal, input, Output, EventEmitter } from '@angular/core';
import { Bookmark } from '../../model/bookmark.type';
import { FilterSortPipe } from '../../pipes/filter-sort.pipe';

@Component({
    selector: 'app-bookmarks',
    imports: [FilterSortPipe],
    templateUrl: './bookmarks.component.html',
    styleUrl: './bookmarks.component.css'
})
export class BookmarksComponent {
    bookmarks = input<Bookmark[]>([]);
    searchTerm = input<string>('');
    currentPage = signal(1);
    itemsPerPage = 20;
    @Output() edit = new EventEmitter<Bookmark>();
    @Output() delete = new EventEmitter<Bookmark>();

    // Filter bookmarks based on search term
    private readonly filteredBookmarks = computed(() => {
        const term = this.searchTerm().toLowerCase();
        return this.bookmarks().filter(bookmark => 
            bookmark.name.toLowerCase().includes(term)
        );
    });

    // Update total pages based on filtered results
    private readonly totalPages = computed(() => 
        Math.ceil(this.filteredBookmarks().length / this.itemsPerPage)
    );

    // Update paginated bookmarks to use filtered results
    private readonly paginatedBookmarks = computed(() => {
        const start = (this.currentPage() - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredBookmarks().slice(start, end);
    });

    // Reset to first page when search term changes
    ngOnChanges() {
        this.currentPage.set(1);
    }

    readonly pageNumbers = computed(() => 
        Array.from({ length: this.totalPages() }, (_, i) => i + 1)
    );

    getTotalPages() {
        return this.totalPages();
    }

    getPaginatedBookmarks() {
        return this.paginatedBookmarks();
    }

    setPage(page: number) {
        if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page);
    }

    trackByFn(index: number, item: Bookmark) {
        return item.id;
    }

    onEditBookmark(bookmark: Bookmark) {
        this.edit.emit(bookmark);
    }

    onDeleteBookmark(bookmark: Bookmark) {
        this.delete.emit(bookmark);
    }
}

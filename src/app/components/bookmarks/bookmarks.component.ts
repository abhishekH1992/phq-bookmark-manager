import { Component, computed, signal, input, Output, EventEmitter } from '@angular/core';
import { Bookmark } from '../../model/bookmark.type';
import { FilterSortPipe } from '../../pipes/filter-sort.pipe';
import { DatePipe } from '@angular/common';
import { SlicePipe } from '@angular/common';

@Component({
    selector: 'app-bookmarks',
    imports: [FilterSortPipe, DatePipe, SlicePipe],
    templateUrl: './bookmarks.component.html',
    styleUrl: './bookmarks.component.css'
})
export class BookmarksComponent {
    bookmarks = input<Bookmark[]>([]);
    searchTerm = input<string>('');
    sortBy = input<string>('name');
    currentPage = signal(1);
    itemsPerPage = 20;
    @Output() edit = new EventEmitter<Bookmark>();
    @Output() delete = new EventEmitter<Bookmark>();

    // Get filtered and sorted bookmarks using the pipe
    private readonly filteredBookmarks = computed(() => {
        const pipe = new FilterSortPipe();
        return pipe.transform(this.bookmarks(), this.searchTerm(), this.sortBy());
    });

    // Get paginated bookmarks
    getPaginatedBookmarks() {
        const start = (this.currentPage() - 1) * this.itemsPerPage;
        return this.filteredBookmarks().slice(start, start + this.itemsPerPage);
    }

    // Get total pages based on filtered results
    getTotalPages() {
        return Math.ceil(this.filteredBookmarks().length / this.itemsPerPage);
    }

    // Update page numbers based on filtered results
    readonly pageNumbers = computed(() => 
        Array.from({ length: this.getTotalPages() }, (_, i) => i + 1)
    );

    // Set the page
    setPage(page: number) {
        if (page >= 1 && page <= this.getTotalPages()) {
            this.currentPage.set(page);
        }
    }

    // Track the bookmarks
    trackByFn(index: number, item: Bookmark) {
        return item.id;
    }

    // Edit the bookmark
    onEditBookmark(bookmark: Bookmark) {
        this.edit.emit(bookmark);
    }

    // Delete the bookmark
    onDeleteBookmark(bookmark: Bookmark) {
        this.delete.emit(bookmark);
    }
}

import { Component, computed, signal, input, Output, EventEmitter } from '@angular/core';
import { Bookmark } from '../../model/bookmark.type';

@Component({
    selector: 'app-bookmarks',
    imports: [],
    templateUrl: './bookmarks.component.html',
    styleUrl: './bookmarks.component.css'
})
export class BookmarksComponent {
    bookmarks = input<Bookmark[]>([]);
    currentPage = signal(1);
    itemsPerPage = 20;
    @Output() edit = new EventEmitter<Bookmark>();
    @Output() delete = new EventEmitter<Bookmark>();

    private readonly totalPages = computed(() => 
        Math.ceil(this.bookmarks().length / this.itemsPerPage)
    );

    readonly pageNumbers = computed(() => 
        Array.from({ length: this.totalPages() }, (_, i) => i + 1)
    );

    private readonly paginatedBookmarks = computed(() => {
        const start = (this.currentPage() - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.bookmarks().slice(start, end);
    });

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

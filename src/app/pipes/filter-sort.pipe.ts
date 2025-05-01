import { Pipe, PipeTransform } from '@angular/core';
import { Bookmark } from '../model/bookmark.type';

@Pipe({
    name: 'filterSort',
    standalone: true
})

export class FilterSortPipe implements PipeTransform {

    transform(bookmarks: Bookmark[], searchTerm: string): Bookmark[] {
        if (!bookmarks || !searchTerm) {
            return bookmarks;
        }

        return bookmarks.filter(bookmark => {
            return bookmark.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }

}

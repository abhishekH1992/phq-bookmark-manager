import { Pipe, PipeTransform } from '@angular/core';
import { Bookmark } from '../model/bookmark.type';

@Pipe({
    name: 'filterSort',
    standalone: true,
    pure: true  // Mark as pure pipe for better performance
})

// Filter and sort bookmarks
export class FilterSortPipe implements PipeTransform {

    // Transform the bookmarks
    transform(bookmarks: Bookmark[], searchTerm: string, sortBy: string): Bookmark[] {
        if (!bookmarks?.length) return [];
        if (!searchTerm && !sortBy) return bookmarks;

        const term = searchTerm?.toLowerCase() || '';
        
        // Filter the bookmarks
        const filtered = term 
            ? bookmarks.filter(bookmark => 
                bookmark.name.includes(term) || 
                bookmark.url.toLowerCase().includes(term)
            )
            : bookmarks;

        if (!sortBy) return filtered;

        // Sort the bookmarks
        return [...filtered].sort((a, b) => {
            switch(sortBy) {
                case 'name': return a.name.localeCompare(b.name);
                case 'url': return a.url.localeCompare(b.url);
                case 'latest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'lastUpdated': return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                default: return 0;
            }
        });
    }

}

import { Injectable } from '@angular/core';
import { Bookmark } from '../model/bookmark.type';

@Injectable({
    providedIn: 'root'
})
export class SeederService {
    // Storage key for bookmarks
    private readonly STORAGE_KEY = 'phq-bookmarks';

    // Capitalize the first letter of a string
    private capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Seed bookmarks
    seedBookmarks(): void {
        const randomString = ['example', 'test', 'sample', 'google', 'instagram', 'facebook', 'twitter', 'linkedin', 'github', 'youtube', 'pinterest', 'vimeo'];
        const bookmarks: Bookmark[] = Array.from({ length: 45 }, (_, index) => {
            const randomName = randomString[Math.floor(Math.random() * randomString.length)];
            return {
                id: Date.now() + index,
                name: `${this.capitalizeFirstLetter(randomName)}${index + 1}`,
                url: `https://${randomName}-${index + 1}.com`,
                createdAt: new Date(Date.now() - (index * 86400000)),
                updatedAt: new Date(Date.now() - (index * 43200000))
            };
        });

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookmarks));
    }

    // Get bookmarks
    getBookmarks(): Bookmark[] {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return [];
    }

    // Delete bookmarks
    deleteBookmarks(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    // Save bookmarks
    saveBookmarks(bookmarks: Bookmark[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookmarks));
    }
} 
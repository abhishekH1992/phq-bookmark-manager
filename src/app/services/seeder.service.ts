import { Injectable } from '@angular/core';
import { Bookmark } from '../model/bookmark.type';

@Injectable({
    providedIn: 'root'
})
export class SeederService {
    private readonly STORAGE_KEY = 'phq-bookmarks';

    seedBookmarks(): void {
        const bookmarks: Bookmark[] = [
            {
                id: 1,
                name: 'Google',
                url: 'https://www.google.com',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                name: 'Facebook',
                url: 'https://www.facebook.com',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3,
                name: 'Twitter',
                url: 'https://www.twitter.com',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 4,
                name: 'Instagram',
                url: 'https://www.instagram.com',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookmarks));
    }

    getBookmarks(): Bookmark[] {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return [];
    }

    deleteBookmarks(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    saveBookmarks(bookmarks: Bookmark[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookmarks));
    }
} 
import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bookmark } from '../../model/bookmark.type';

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css'
})
export class FormComponent {
    @Input() existingBookmarks: Bookmark[] = [];
    @Output() bookmarkAdded = new EventEmitter<Bookmark>();
    @Output() cancel = new EventEmitter<void>();

    // Use signals for form state
    name = signal('');
    url = signal('');
    errors = signal<{ name?: string; url?: string }>({});

    // Computed values for validation
    private readonly trimmedName = computed(() => this.name().trim());
    private readonly trimmedUrl = computed(() => this.url().trim());
    private readonly hasErrors = computed(() => Object.keys(this.errors()).length > 0);

    // URL validation pattern as a constant
    private readonly URL_PATTERN = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    private readonly VALID_CHARS_PATTERN = /^[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+$/;

    onSubmit(): void {
        if (this.validateForm()) {
            const bookmark: Bookmark = {
                id: Date.now(),
                name: this.trimmedName(),
                url: this.trimmedUrl(),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            this.bookmarkAdded.emit(bookmark);
            this.resetForm();
            this.cancel.emit();
        }
    }

    onCancel(): void {
        this.resetForm();
        this.cancel.emit();
    }

    private validateForm(): boolean {
        const newErrors: { name?: string; url?: string } = {};

        // Name validation
        if (!this.trimmedName()) {
            newErrors.name = 'Name is required';
        }

        // URL validation
        if (!this.trimmedUrl()) {
            newErrors.url = 'URL is required';
        } else if (!this.isValidUrl(this.trimmedUrl())) {
            newErrors.url = 'Please enter a valid URL';
        } else if (this.isDuplicateUrl(this.trimmedUrl())) {
            newErrors.url = 'This URL already exists in your bookmarks';
        }

        this.errors.set(newErrors);
        return !this.hasErrors();
    }

    private isValidUrl(url: string): boolean {
        if (!this.URL_PATTERN.test(url)) {
            return false;
        }

        return (
            (url.startsWith('http://') || url.startsWith('https://')) &&
            url.includes('.') &&
            this.VALID_CHARS_PATTERN.test(url)
        );
    }

    private isDuplicateUrl(url: string): boolean {
        const normalizedInputUrl = this.normalizeUrl(url);
        return this.existingBookmarks.some(bookmark => 
            this.normalizeUrl(bookmark.url) === normalizedInputUrl
        );
    }

    private normalizeUrl(url: string): string {
        // Convert to lowercase and remove trailing slashes
        let normalized = url.toLowerCase().replace(/\/+$/, '');
        
        // Remove protocol
        normalized = normalized.replace(/^https?:\/\//, '');
        
        // Remove www. prefix
        normalized = normalized.replace(/^www\./, '');
        
        return normalized;
    }

    private resetForm(): void {
        this.name.set('');
        this.url.set('');
        this.errors.set({});
    }
}
import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export default class SearchComponent {

  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private queryParams = signal(this._route.snapshot.queryParams)

  query = computed(() => this.queryParams()['query'] ?? '')
  searchElement = viewChild<ElementRef>('searchElement')

  search(): void {
    const value = this.searchElement()!.nativeElement.value
    if (value.length) {
      this._router.navigate(['/search'], { queryParams: { query: value } }).then(() => {
         location.reload()
      })
    }
  }
}

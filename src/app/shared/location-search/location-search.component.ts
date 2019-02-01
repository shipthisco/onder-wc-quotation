import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {
  @Input() field;
  @Input() title;
  @Output() fieldChange: EventEmitter<any> = new EventEmitter();
  public keyDown = new Subject<any>();
  query = null;
  show_results;
  items = [];

  constructor(public locationService: LocationService) {
    const observable: any = this.keyDown
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(search => {
          return Observable.create(observer => {
            observer.next(search);
          });
        })
      )
      .subscribe((data: any) => {
        if (!(data.key === 'ArrowUp' || data.key === 'ArrowDown')) {
          this.filterItems(this.query);
        }
      });

  }

  ngOnInit() {
    if (!this.field) {
      this.field = {};
    }
  }

  selectItem(item) {
    console.log('item select');
    this.locationService.getPlace(item['place_id']).then((data: any) => {
      this.field = data;
      console.log(this.field);
      this.show_results = false;
      this.fieldChange.emit(this.field);
    });
  }

  filterItems(val: string) {
    if (typeof val === 'string' && val.length) {
      this.locationService
        .getResults(val, 'city')
        .then((data: any) => {
          this.items = data.items;
        });
    }
    // return this.items;
  }
}

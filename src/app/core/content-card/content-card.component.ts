import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss']
})
export class ContentCardComponent implements OnInit {
  @Input() title: string;
  @Input() isShowShadow = true;
  @Input() isShowDivider = true;
  @Input() subtitle: string;
  @Input() minHeigth = '100';
  @Input() loading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}

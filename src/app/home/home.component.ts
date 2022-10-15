import { Component, OnInit } from '@angular/core';
import { pwaService } from '../shared/services/pwa-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public pwa: pwaService) { }

  ngOnInit(): void {
  }

}

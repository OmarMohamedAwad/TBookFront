import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-subscribe',
  templateUrl: './home-subscribe.component.html',
  styleUrls: ['./home-subscribe.component.css']
})
export class HomeSubscribeComponent implements OnInit {

  userIsLoggedIn: any;
  constructor() {
    this.userIsLoggedIn = sessionStorage.getItem('accessToken');
  }

  ngOnInit(): void {
  }

}

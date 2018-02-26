import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDXMgmtUBlK8AIrnLq88bjXHeksg4jS6SE",
      authDomain: "jta-oraculo.firebaseapp.com",
      databaseURL: "https://jta-oraculo.firebaseio.com",
      projectId: "jta-oraculo",
      storageBucket: "jta-oraculo.appspot.com",
      messagingSenderId: "197193055791"
    };
    firebase.initializeApp(config);
  }
}
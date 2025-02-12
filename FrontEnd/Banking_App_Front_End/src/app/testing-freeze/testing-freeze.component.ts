import { Component } from '@angular/core';

@Component({
  selector: 'app-testing-freeze',
  imports: [],
  templateUrl: './testing-freeze.component.html',
  styleUrl: './testing-freeze.component.css'
})
export class TestingFreezeComponent {

  button(){
    console.log("Logged")
  }

}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {

  @Input() img?: string;
  @Output() EmitEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  emitEvent() {
    console.log("log hijo");
    this.EmitEvent.emit(this.img);
  }

  error() {
    this.img = "assets/img/nofound.png"
  }

}

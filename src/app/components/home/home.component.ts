import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {IDraggableData} from '../../model/IDraggableData';
import {callbackify} from 'util';
import {createBrowserLoggingCallback} from '@angular-devkit/build-angular/src/browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 data: IDraggableData = {
    pendings : [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ],
    inProgress : [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ],
    done : [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ]

  };

  constructor() { }

  ngOnInit() {
    this.setItems();
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      Object.keys(this.data).forEach((key) => {
        localStorage.setItem(key, JSON.stringify(this.data[key]));
        });
    }
  }

  addToDo(todo) {
    this.data.pendings.push(todo.value);
    todo.value = '';
    localStorage.setItem('pendings', JSON.stringify(this.data.pendings));
  }

  setItems() {
    Object.keys(this.data).forEach((key) => {
        if (!localStorage.getItem(key)) {
          localStorage.setItem(key, JSON.stringify(this.data[key]));
        } else {
          this.data[key] = JSON.parse(localStorage.getItem(key));
        }
    });
  }
}

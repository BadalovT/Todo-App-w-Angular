import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {callbackify} from 'util';
import {createBrowserLoggingCallback} from '@angular-devkit/build-angular/src/browser';
import {TodoService} from '../../services/todo.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data = {};

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.getAllTodos();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.updateTodo();
  }

  addTodo(todo) {
    const obj = {todo: todo.value};
    this.todoService.addTodo(obj)
      .subscribe((res: any) => {
        this.openSnackBar(res.message)
        this.getAllTodos();
        todo.value = '';
      }, (err) => {
        console.log('post err' + err);
      });
  }
  getAllTodos() {
    this.todoService.getAllTodos()
      .subscribe((res) => {
        Object.keys(res).forEach(key => {
          this.data[key] = res[key];
        });
      }, (err) => {
        console.log('get err' + err);
      });
  }
  updateTodo() {
    this.todoService.updateTodo(this.data)
      .subscribe((res) => {
          console.log(res);
      }, (err) => {
            console.log(err);
        }
      );
  }
  removeTodo(id) {
    if (confirm ('are yuo sure to delete this todo?')) {
      this.todoService.removeTodo(id)
        .subscribe((res) => {
            this.getAllTodos();
          }, (err) => {
            console.log(err);
          }
        );
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'done', {
      duration: 2000,
    });
  }
}

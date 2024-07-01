import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoList } from './todoList';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  lists: TodoList[] = [
    { title: 'To Do', tasks: [], index: 1 },
    { title: 'In Progress', tasks: [], index: 2 },
    { title: 'Done', tasks: [], index: 3 }
  ];
}
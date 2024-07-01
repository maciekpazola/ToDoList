import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TodoList } from '../todoList';
import { Task } from '../task';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input() lists!: TodoList[];
  @Input() listIndex!: number;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  addTask(title: string): void {
    const list = this.lists.find(x => x.title === title);
    if (!list) return;

    list.tasks.push(new Task(list.tasks.length + 1, null, null));
    this.saveToLocalStorage();
  }

  saveTask(item: Task): void {
    const list = this.lists.find(x => x.tasks.includes(item));
    if (!list) return;

    const titleElement = document.getElementById('taskTitle-' + item.id) as HTMLInputElement;
    const descriptionElement = document.getElementById('task-' + item.id) as HTMLInputElement;

    if (!titleElement || !descriptionElement || !titleElement.value || !descriptionElement.value) {
      return;
    }

    item.title = titleElement.value;
    item.value = descriptionElement.value;
    this.saveToLocalStorage();
  }

  removeTask(item: Task): void {
    const list = this.lists.find(x => x.tasks.includes(item));
    if (!list) return;

    list.tasks = list.tasks.filter(task => task !== item);
    this.saveToLocalStorage();
  }

  changeTaskState(item: Task, direction: 'forward' | 'backward'): void {
    const currentListIndex = this.lists.findIndex(list => list.tasks.includes(item));
    if (currentListIndex === -1) return;

    const newListIndex = direction === 'forward' ? currentListIndex + 1 : currentListIndex - 1;

    if (newListIndex < 0 || newListIndex >= this.lists.length) return;

    this.lists[currentListIndex].tasks = this.lists[currentListIndex].tasks.filter(task => task !== item);
    this.lists[newListIndex].tasks.push(item);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('todoLists', JSON.stringify(this.lists));
    }
  }

  private loadFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('todoLists');
      if (data) {
        this.lists = JSON.parse(data);
      }
    }
  }
}

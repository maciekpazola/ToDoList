export class Task {
    id: number
    title: string| null;
    value: string| null;

    constructor(id: number, title: string | null, value: string | null) {
        this.id = id;
        this.title = title;
        this.value = value;
  }
}
export interface Todo {
  getIsComplete(): boolean;
  getContent(): string;
  getPriority(): number;
  getCreatedAt(): string;
  getLimit(): string;
  setComplete(): void;
}

export class Todo implements Todo {
  private isComplete: boolean;
  private content: string;
  private priority: number;
  private createdAt: string;
  private limit: string;
  constructor(content: string, priority: number, limit: string) {
    this.content = content;
    this.isComplete = false;
    this.priority = priority;
    const date = new Date();
    this.createdAt = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate()}`;
    this.limit = limit;
  }

  getIsComplete(): boolean {
    return this.isComplete;
  }
  getContent(): string {
    return this.content;
  }
  getPriority(): number {
    return this.priority;
  }
  getCreatedAt(): string {
    return this.createdAt;
  }
  getLimit(): string {
    return this.limit;
  }
  setComplete(): void {
    this.isComplete = true;
  }
}

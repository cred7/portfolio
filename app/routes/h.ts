class Nodes {
  readonly value: any;
  next: Nodes | null;
  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

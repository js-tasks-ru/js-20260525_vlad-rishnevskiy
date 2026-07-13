import { createElement } from "../../shared/utils/create-element";

interface Options {
  duration?: number;
  type?: "success" | "error";
}

export default class NotificationMessage {
  element: HTMLElement | null;
  duration: number;
  type: string;

  constructor(message: string = "", {
    duration = 0,
    type = "success"
  }: Options = {}) {
    this.duration = duration;
    this.type = type;

    this.element = createElement(`
      <div class="notification ${this.type}" style="--value: ${this.duration / 1000}s">
        <div class="timer"></div>

        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">${message}</div>
        </div>
      </div>
    `);
  }

  show(parent: HTMLElement = document.body) {
    parent.append(this.element!);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove() {
    this.element?.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}
import { createElement } from "../../shared/utils/create-element";

interface Options {
  data?: number[];
  label?: string;
  value?: number;
  link?: string;
  formatHeading?: (value: number) => string;
}

export default class ColumnChart {
  element!: HTMLElement;
  chartHeight = 50;

  data: number[];
  label: string;
  value: number;
  link: string;
  formatHeading?: (value: number) => string;

  subElements: Record<string, HTMLElement> = {};

  constructor({
    data = [],
    label = '',
    value = 0,
    link = '',
    formatHeading
  }: Options = {}) {

    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;

    this.render();
  }

  get template() {
    return `
      <div class="column-chart ${this.data.length ? '' : 'column-chart_loading'}" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          ${this.label}
          ${this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : ''}
        </div>

        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.formatHeading ? this.formatHeading(this.value) : this.value}
          </div>

          <div data-element="body" class="column-chart__chart">
            ${this.getColumns()}
          </div>
        </div>
      </div>
    `;
  }

  getColumns(): string {
    if (!this.data.length) {
      return '';
    }

    const maxValue = Math.max(...this.data);
    const scale = this.chartHeight / maxValue;

    return this.data
      .map(item => {
        const value = Math.floor(item * scale);

        return `
          <div
            style="--value:${value}"
            data-tooltip="${((item / maxValue) * 100).toFixed(0)}%">
          </div>
        `;
      })
      .join('');
  }

  render() {
    this.element = createElement(this.template);

    this.subElements.body =
      this.element.querySelector('[data-element="body"]') as HTMLElement;
  }

  update(data: number[]) {
    this.data = data;

    if (data.length) {
      this.element.classList.remove('column-chart_loading');
    } else {
      this.element.classList.add('column-chart_loading');
    }

    this.subElements.body.innerHTML = this.getColumns();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // @ts-ignore
    this.element = null;
    this.subElements = {};
  }
}
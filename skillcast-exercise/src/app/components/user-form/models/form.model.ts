export class CustomField {
    attribute: string;
    name: string;
    type: string;
    required: boolean;

    constructor(options: { attribute?: string, name?: string, required?: boolean, type?: string } = {}) {
        this.attribute = options.attribute || '';
        this.name = options.name || '';
        this.required = options.required || false;
        this.type = options.type || '';
    }
  }
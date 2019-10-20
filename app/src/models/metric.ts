export class Metric {
  name: String;
  code: String;
  value: String;
  unit: String;

  constructor(name: String, code: String, value: String, unit: String) {
    this.name = name;
    this.code = code;
    this.value = value;
    this.unit = unit;
  }
}

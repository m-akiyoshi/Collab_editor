import * as Sequelize from "sequelize";

export function makeJSONGetter(property: string) {
  return function getJSON(this: Sequelize.Instance<any>) {
    const val = this.getDataValue(property);
    if (!val) return null;
    return JSON.parse(val);
  };
}

export function makeJSONSetter(property: string) {
  return function setJSON(
    this: Sequelize.Instance<any>,
    value: unknown | null
  ) {
    if (value == null) {
      this.setDataValue(property, null);
    } else {
      this.setDataValue(property, JSON.stringify(value));
    }
  };
}

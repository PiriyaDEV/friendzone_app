export default class Category {
  constructor(category) {
    this.category_id = category.category_id;
    this.category_name = category.category_name;
    this.icon_white = category.icon_white;
    this.icon_black = category.icon_black;
    this.color_code = category.color_code;
    this.created_at = category.created_at;
    this.updated_at = category.updated_at;
  }
}

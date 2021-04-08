export default class Category {
  constructor(category) {
    this.category_id = category.category_id;
    this.category_name = category.category_name;
    this.category_icon = category.category_icon;
    this.created_at = category.created_at;
    this.updated_at = category.updated_at;
  }
}
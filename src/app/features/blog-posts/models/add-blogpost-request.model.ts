import { GetCategoryRequest } from "../../categories/models/get-category-request.models";

export interface AddBlogPostRequest
{
  title: string,
  shortDescription: string,
  content: string,
  featuredImageUrl: string,
  urlHandle: string,
  publishedDate: string,
  author: string,
  isVisible: boolean,
  categories: GetCategoryRequest[];
}

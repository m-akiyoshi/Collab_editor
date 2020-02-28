import Article, { ArticleAttributes } from "../../models/Article";

export async function getAllArticles() {
  const articles = await Article.findAll();
  return { success: true, data: articles };
}

export async function postArticle(article: ArticleAttributes) {
  let newArticle;
  try {
    newArticle = await Article.create(article);
  } catch (err) {
    console.log(err);
  }

  return { success: true, newArticle };
}

export async function updateArticle(article: ArticleAttributes) {
  const updated = Article.update(article);
  return { success: true, updated };
}

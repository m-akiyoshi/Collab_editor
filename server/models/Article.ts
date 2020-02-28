import * as Sequelize from "sequelize";
import db from "../libs/db/index";

export interface ArticleAttributes {
  id?: number;
  title: string;
  body: string;
  views: number;
  upvotes: number;
  downvotes: number;
  edited_at: string;
  topic_id: number;
}

export type ArticleInstance = Sequelize.Instance<ArticleAttributes> &
  ArticleAttributes;

const Article = db.define<ArticleInstance, ArticleAttributes>("article", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },

  title: {
    type: Sequelize.STRING(200),
    allowNull: true
  },

  body: {
    type: Sequelize.TEXT,
    allowNull: true
  },

  views: {
    type: Sequelize.SMALLINT.UNSIGNED,
    allowNull: true
  },

  upvotes: {
    type: Sequelize.SMALLINT.UNSIGNED,
    allowNull: true,
    defaultValue: 0
  },

  downvotes: {
    type: Sequelize.SMALLINT.UNSIGNED,
    allowNull: true,
    defaultValue: 0
  },

  edited_at: {
    type: Sequelize.DATE,
    allowNull: true
  },

  topic_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true
  }
});

export default Article;

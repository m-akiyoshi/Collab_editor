import Sequelize from "sequelize";

const options: Sequelize.Options = {
  logging: false,
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
};

/** Connect to a new database */
export function connectDB(db: string) {
  return new Sequelize(db, options);
}

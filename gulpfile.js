const gulp = require("gulp");
const ts = require("gulp-typescript");
const sass = require("gulp-sass")(require("sass"));

// ソースファイル
const tsSrc = "ts/**/*.ts";
const scssSrc = "scss/**/*.scss";

// TypeScriptプロジェクトを作成
const tsProject = ts.createProject("tsconfig.json");
// TypeScriptのコンパイル
gulp.task("typescript", function () {
  console.log("Compiling TypeScript...");
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest("public/js"));
});

// SCSSのコンパイル
gulp.task("scss", function () {
  console.log("Compiling SCSS...");
  return gulp.src(scssSrc).pipe(sass().on("error", sass.logError)).pipe(gulp.dest("public/css")); // 出力先
});

// ファイルの変更を監視
gulp.task("watch", function () {
  // TypeScriptファイルの監視
  gulp.watch(tsSrc, { usePolling: true, interval: 500 }, gulp.series("typescript"));
  // SCSSファイルの監視
  gulp.watch(scssSrc, { usePolling: true, interval: 500 }, gulp.series("scss"));
});

// デフォルトタスク（"typescript", "scss", "watch"タスクを順番に実行する）
gulp.task("default", gulp.series("typescript", "scss", "watch"));

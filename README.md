# Profile site

プロフィールサイト「SIPs」

※開発環境の作成や、サイト作成時のメモ：[プロフィールサイト作成メモ](https://scrapbox.io/si-til/%E3%83%97%E3%83%AD%E3%83%95%E3%82%A3%E3%83%BC%E3%83%AB%E3%82%B5%E3%82%A4%E3%83%88%E4%BD%9C%E6%88%90%E3%83%A1%E3%83%A2)

## 開発環境

開発環境は Docker を使用しています。

【コンテナの構成】

- Nginx
- PHP
- Node.js（以下インストールされるパッケージ）
  - TypeScript
  - Sass
  - Gulp（TypeScript と Sass の自動コンパイル用）

## 開発環境の構築

前提として Docker がインストールされていること

- (1) 任意の場所にソースコードを clone する
  - ※Windows の WSL ＋ Docker 環境の場合は、WSL のファイルシステム上に配置すること。また、以下のコマンドも WSL のターミナルにて実行する
- (2) 配置したソースコードのルートディレクトリ（compose.yaml があるディレクトリ）にて`docker compose up --build`を実行し、イメージやコンテナを構築・起動します
  - 各コンテナが起動すると http://localhost/ でページが表示できます

## 使い方

※ソースコードのルートディレクトリにて実行する

- 起動： `docker compose up -d`
  - compose.yaml や Dockerfile を変更した場合は`docker compose up --build`で再構築する
- 停止： `docker compose stop`
- ログ確認： `docker compose logs ([サービス名])`

## 初期ディレクトリ・ファイル構成

```
root/
　 ├ public/ -- 静的ファイルを配置（コンパイルされた css や js もこの中に出力される）
　 │   └ index.html
　 ├ src/ -- サーバーサイドのファイル（php など）を配置
　 │   └ index.php
　 ├ scss/ -- コンパイル前の scss ファイルを配置
　 │   └ README.md
　 ├ ts/ -- コンパイル前の typescript ファイルを配置
　 │   └ README.md
　 │
　 ├ compose.yaml -- コンテナ群の定義ファイル
　 ├ Dockerfile -- Node.js をベースとしたコンテナイメージファイル
　 ├ fastcgi-php.conf -- Nginx の PHP 設定に必要なファイル
　 ├ gulpfile.js -- gulp で実行するタスクの定義（Typescript、SCSS ファイルに変更があれば自動でコンパイルする）
　 ├ nginx.conf -- Nginx の設定ファイル
　 ├ package.json
　 ├ package-lock.json
　 ├ README.md
　 └ .gitignore
```

## TypeScript と SCSS のコンパイル

Typescript と SCSS ファイルのコンパイルは、Gulp で自動でコンパイルするようにしています。

- `.ts`ファイルおよび`.scss`ファイルはそれぞれ定められたディレクトリに置くこと
  - `.ts`（TypeScript）： `ts/`ディレクトリ以下
    - ※コンパイル時には`script.js`に集約して出力されます
  - `.scss`（SCSS）： `scss/`ディレクトリ以下
- 自動コンパイルのタイミング
  - コンテナ起動時
  - ファイルに変更があった時
- 手動でのコンパイル（自動でコンパイルされない時など）
  - プロジェクトのルートディレクトリで以下のコマンドを実行することで手動でコンパイルできる
    - `docker compose exec node gulp`

# ベースイメージとしてNode.jsを使用
FROM node:14

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# Gulp CLIをグローバルにインストール
RUN npm install -g gulp-cli

# アプリケーションのソースコードをコピー
COPY . .

# デフォルトのコマンドを設定
CMD ["gulp"]
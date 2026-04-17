# TipTap Editor - watanabe3ti

[English](./README.md) | 日本語版

[Tiptap](https://tiptap.dev/)ベースのシンプルなRich Text Editorです。

![スクリーンショット](./public/IMGSS_dte.jpg)

## 技術スタック

- **フレームワーク**: React 18 + TypeScript
- **ビルドツール**: Vite 6
- **エディタ**: Tiptap (StarterKit, Image拡張含む)
- **スタイリング**: CSS

## 導入方法

```bash
git clone https://github.com/watanabe3ti/tiptap-editor-pe.git
cd tiptap-editor-pe
npm install
```

## 使い方

開発サーバーを起動:

```bash
npm run dev
```

ブラウザで [http://localhost:5173](http://localhost:5173) を開く。

### Toolbar の機能

| ボタン | 機能 |
|--------|------|
| **B** | 太字 |
| **I** | 斜体 |
| **S** | 取り消し線 |
| `</>` | インラインコード |
| H1/H2/H3 | 見出し |
| • リスト | 箇条書き |
| 1. リスト | 番号付きリスト |
| &gt; 引用 | 引用ブロック |
| — | 横線 |
| ↩ | 元に戻す |
| ↪ | やり直し |
| 🖼 画像 | 画像挿入 |
| 📄 ソース | ソース表示切替 |
| 💾 MD | Markdown保存 |
| 💾 HTML | HTML保存 |
| 🗑 リセット | リセット |

### 本番用ビルド

```bash
npm run build
```

## ライセンス

MIT

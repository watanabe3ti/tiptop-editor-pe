# TipTap Editor - watanabe3ti

[日本語版](./README_ja.md) | English

A simple rich text editor powered by [Tiptap](https://tiptap.dev/).

![Screenshot](./public/IMGSS_dte.jpg)

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Editor**: Tiptap (with StarterKit, Image extension)
- **Styling**: CSS

## Installation

```bash
git clone https://github.com/watanabe3ti/tiptap-editor-pe.git
cd tiptap-editor-pe
npm install
```

## Usage

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Toolbar Features

| Button | Function |
|--------|----------|
| **B** | Bold |
| **I** | Italic |
| **S** | Strikethrough |
| `</>` | Inline code |
| H1/H2/H3 | Headings |
| • リスト | Bullet list |
| 1. リスト | Numbered list |
| &gt; 引用 | Blockquote |
| — | Horizontal rule |
| ↩ | Undo |
| ↪ | Redo |
| 🖼 画像 | Insert image |
| 📄 ソース | Toggle source view |
| 💾 MD | Save as Markdown |
| 💾 HTML | Save as HTML |
| 🗑 リセット | Reset content |

### Build for Production

```bash
npm run build
```

## License

MIT

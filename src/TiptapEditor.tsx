import { type ReactElement, useCallback, useRef, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import MarkdownIt from 'markdown-it';
import './TiptapEditor.css';

const TiptapEditor = (): ReactElement => {
  const [sourceContent, setSourceContent] = useState<string>('');
  const [showSource, setShowSource] = useState<boolean>(false);
  
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: '<p>Start writing ✍️</p>',
    onUpdate: ({ editor }) => {
      setSourceContent(editor.getHTML());
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertImage = useCallback((url: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('画像ファイルを選択してください');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('ファイルサイズは5MB以下にしてください');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        insertImage(result);
      }
    };
    reader.onerror = () => {
      alert('画像の読み込みに失敗しました');
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  }, [insertImage]);

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleSaveMarkdown = useCallback(() => {
    if (!editor) return;
    const md = new MarkdownIt();
    const content = editor.getHTML();
    const markdown = md.render(content);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `notes-${timestamp}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [editor]);

  const handleSaveHTML = useCallback(() => {
    if (!editor) return;
    const content = editor.getHTML();
    const fullHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Saved notes</title>
    <style>
        body { max-width: 800px; margin: 40px auto; padding: 0 20px; }
        img { max-width: 100%; height: auto; }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `notes-${timestamp}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [editor]);

  const handleReset = useCallback(() => {
    if (editor) {
      if (window.confirm('エディタの内容をリセットしますか？')) {
        editor.commands.setContent('<p>Start writing ✍️</p>');
        setSourceContent('<p>Start writing ✍️</p>');
      }
    }
  }, [editor]);

  const toggleSource = useCallback(() => {
    setShowSource(prev => !prev);
  }, []);

  if (!editor) return <div>Loading...</div>;

  return (
    <div className="editor-wrapper">
      <div className="toolbar">
        <div className="toolbar-group">
          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active' : ''} title="太字">
            <strong>B</strong>
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active' : ''} title="斜体">
            <em>I</em>
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'active' : ''} title="取り消し線">
            <s>S</s>
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive('code') ? 'active' : ''} title="インラインコード">
            {'</>'}
          </button>
        </div>
        <div className="toolbar-divider" />
        <div className="toolbar-group">
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'active' : ''} title="見出し1">H1</button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'active' : ''} title="見出し2">H2</button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'active' : ''} title="見出し3">H3</button>
        </div>
        <div className="toolbar-divider" />
        <div className="toolbar-group">
          <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'active' : ''} title="箇条書き">• リスト</button>
          <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'active' : ''} title="番号付きリスト">1. リスト</button>
          <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'active' : ''} title="引用">&gt; 引用</button>
        </div>
        <div className="toolbar-divider" />
        <div className="toolbar-group">
          <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} title="横線">—</button>
          <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="元に戻す">↩</button>
          <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="やり直し">↪</button>
        </div>
        <div className="toolbar-divider" />
        <div className="toolbar-group">
          <button type="button" onClick={handleButtonClick} title="画像挿入">🖼 画像</button>
          <button type="button" onClick={toggleSource} className={showSource ? 'active' : ''} title="ソース表示">{showSource ? '📝 エディタ' : '📄 ソース'}</button>
        </div>
        <div className="toolbar-spacer" />
        <div className="toolbar-group">
          <button type="button" onClick={handleSaveMarkdown} title="Markdown保存">💾 MD</button>
          <button type="button" onClick={handleSaveHTML} title="HTML保存">💾 HTML</button>
          <button type="button" onClick={handleReset} className="reset-btn" title="リセット">🗑 リセット</button>
        </div>
      </div>
      <div className="editor-container">
        <div className="editor-main">
          <EditorContent editor={editor} />
        </div>
        {showSource && (
          <div className="editor-source">
            <pre><code>{sourceContent}</code></pre>
          </div>
        )}
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
    </div>
  );
};

export default TiptapEditor;

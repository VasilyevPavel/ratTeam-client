import { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { useAppSelector } from '@/app/lib/redux/hooks';
import { RootState } from '@/app/lib/redux/store';
import TextEditorMenuBar from '../textEditorMenuBar/TextEditorMenuBar';

type TextEditorProps = {
  onChange: (content: string) => void;
};

export default function RichTextEditor({ onChange }: TextEditorProps) {
  const postBody = useAppSelector((state: RootState) => state.postSlice.body);
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: postBody,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'min-h-[150px] cursor-text rounded-md border p-5 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ',
      },
    },
    immediatelyRender: false,
  });

  const cursorPositionRef = useRef<number | null>(null);

  useEffect(() => {
    if (editor) {
      cursorPositionRef.current = editor.state.selection.$head.pos;

      editor.commands.setContent(postBody);
    }
  }, [postBody, editor]);

  useEffect(() => {
    if (editor && cursorPositionRef.current !== null) {
      const position = cursorPositionRef.current;
      editor.view.focus();
      editor.commands.setTextSelection(position);
    }
  }, [editor, postBody]);

  return (
    <div>
      <TextEditorMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

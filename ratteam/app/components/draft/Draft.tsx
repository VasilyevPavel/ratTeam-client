import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { useAppSelector, useAppDispatch } from '@/app/lib/redux/hooks';
import { RootState } from '@/app/lib/redux/store';
import { setCursorPosition, setPostBody } from '@/app/lib/redux/postSlice';
import TextEditorMenuBar from '../textEditorMenuBar/TextEditorMenuBar';

type TextEditorProps = {
  onChange: (content: string) => void;
};

export default function RichTextEditor({ onChange }: TextEditorProps) {
  const postBody = useAppSelector((state: RootState) => state.postSlice.body);
  const dispatch = useAppDispatch();

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: postBody,
    onUpdate: ({ editor }) => {
      const updatedContent = editor.getHTML();
      onChange(updatedContent);

      dispatch(setPostBody(updatedContent));
    },
    editorProps: {
      attributes: {
        class:
          'min-h-[150px] cursor-text rounded-md border p-5 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      editor.on('selectionUpdate', ({ editor }) => {
        const currentCursorPosition = editor.state.selection.$head.pos;

        dispatch(setCursorPosition(currentCursorPosition));
      });
    }

    return () => {
      if (editor) {
        editor.off('selectionUpdate');
      }
    };
  }, [editor, dispatch]);

  useEffect(() => {
    if (editor && postBody !== editor.getHTML()) {
      editor.commands.setContent(postBody);
    }
  }, [postBody, editor]);

  return (
    <div>
      <TextEditorMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

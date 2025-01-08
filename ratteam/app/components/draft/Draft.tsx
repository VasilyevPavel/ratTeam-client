import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { useAppSelector, useAppDispatch } from '@/app/lib/redux/hooks';
import { RootState } from '@/app/lib/redux/store';
import { setCursorPosition, setPostBody } from '@/app/lib/redux/postSlice';
import TextEditorMenuBar from '../textEditorMenuBar/TextEditorMenuBar';
import styles from './draft.module.css';

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
        class: styles.editorBox,
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

  const handleFocus = () => {
    if (editor) {
      editor.view.focus();
    }
  };

  return (
    <div>
      <TextEditorMenuBar editor={editor} />
      <div onClick={handleFocus}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

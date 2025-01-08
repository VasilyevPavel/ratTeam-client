import React from 'react';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatStrikethrough,
  Code,
  FormatListBulleted,
  FormatListNumbered,
  Undo,
  Redo,
} from '@mui/icons-material';
import { Editor } from '@tiptap/react';
import styles from './textEditorMenuBar.module.css';

const Button = ({
  onClick,
  isActive,
  disabled,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`${styles.button} ${isActive ? styles.active : ''}`}
  >
    {children}
  </button>
);

export default function TextEditorMenuBar({
  editor,
}: {
  editor: Editor | null;
}) {
  if (!editor) return null;

  const buttons = [
    {
      icon: <FormatBold fontSize="small" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
    },
    {
      icon: <FormatUnderlined fontSize="small" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
    },
    {
      icon: <FormatItalic fontSize="small" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      icon: <FormatStrikethrough fontSize="small" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      icon: <Code fontSize="small" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive('code'),
      disabled: !editor.can().chain().focus().toggleCode().run(),
    },
    {
      icon: <FormatListBulleted fontSize="small" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    },
    {
      icon: <FormatListNumbered fontSize="small" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
    },
    {
      icon: <Undo fontSize="small" />,
      onClick: () => editor.chain().focus().undo().run(),
      isActive: editor.isActive('undo'),
      disabled: !editor.can().chain().focus().undo().run(),
    },
    {
      icon: <Redo fontSize="small" />,
      onClick: () => editor.chain().focus().redo().run(),
      isActive: editor.isActive('redo'),
      disabled: !editor.can().chain().focus().redo().run(),
    },
  ];

  return (
    <div className={styles.toolbar}>
      {buttons.map(({ icon, onClick, isActive, disabled }, index) => (
        <Button
          key={index}
          onClick={onClick}
          isActive={isActive}
          disabled={disabled}
        >
          {icon}
        </Button>
      ))}
    </div>
  );
}

'use client';

import { Editor, type JSONContent } from '@comp/ui/editor';
import { useGT } from 'gt-next';

interface AdvancedEditorProps {
  initialContent?: JSONContent | JSONContent[];
  onUpdate?: (content: JSONContent) => void;
  onSave?: (content: JSONContent) => Promise<void>;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
  saveDebounceMs?: number;
}

const AdvancedEditor = ({
  initialContent,
  onUpdate,
  onSave,
  readOnly = false,
  placeholder,
  className,
  saveDebounceMs = 500,
}: AdvancedEditorProps) => {
  const gt = useGT();
  const defaultPlaceholder = gt('Start writing...');

  return (
    <Editor
      initialContent={initialContent}
      onUpdate={onUpdate}
      onSave={onSave}
      readOnly={readOnly}
      placeholder={placeholder ?? defaultPlaceholder}
      className={className}
      saveDebounceMs={saveDebounceMs}
      showSaveStatus={true}
      showWordCount={true}
      showToolbar={true}
    />
  );
};

export default AdvancedEditor;

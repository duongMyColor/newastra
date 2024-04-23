import { LinkHandle } from '@repo/types/richTextEditor';
import { SyntheticEvent, useState, KeyboardEvent } from 'react';
import { EditorState } from 'draft-js';
import Button from './Button';
import { styles } from '../styles/styles';
import checkLink from '../utils/checkLink';

const LinkControls = ({
  editorState,
  addLink,
  removeLink,
}: {
  editorState: EditorState;
  addLink: (url: string) => void;
  removeLink: () => void;
}) => {
  const [linkHandle, setLinkHandle] = useState<LinkHandle>({
    showURLInput: false,
    url: '',
  });

  const promptForLink = (e: SyntheticEvent) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      setLinkHandle(() => {
        return { showURLInput: true, url: url };
      });
    }
  };

  const onRemoveLink = (e: SyntheticEvent) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      removeLink();
    }
  };

  const onURLChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setLinkHandle({
      ...linkHandle,
      url: target.value,
    });
  };

  const onLinkInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      confirmLink(e);
    }
  };

  const confirmLink = (e: SyntheticEvent) => {
    e.preventDefault();
    const { url } = linkHandle;
    addLink(url);
    setLinkHandle({ showURLInput: false, url: '' });
  };

  const urlInput = (
    <div className="RichEditor-urlInput">
      <input
        onChange={onURLChange}
        style={styles.urlInput}
        type="text"
        value={linkHandle.url}
        onKeyDown={onLinkInputKeyDown}
      />
      <Button onClick={confirmLink} title="Add" />
      <Button
        onClick={() => {
          setLinkHandle({ showURLInput: false, url: '' });
        }}
        title="Cancel"
      />
    </div>
  );

  const addLinkButton = (
    <div className="RichEditor-styleButton RichEditor-addLinkButton">
      <span onClick={promptForLink} style={{ marginRight: 10 }}>
        <i className="fa-solid fa-link" title="Add link"></i>
      </span>
      {linkHandle.showURLInput && urlInput}
    </div>
  );

  const removeLinkButton = (
    <span className="RichEditor-styleButton" onClick={onRemoveLink}>
      <i className="fa-solid fa-link-slash" title="Remove link"></i>
    </span>
  );

  return (
    <div className="RichEditor-handleLinkWrapper">
      {checkLink(editorState) ? removeLinkButton : addLinkButton}
    </div>
  );
};

export default LinkControls;

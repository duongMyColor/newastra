import React, { useEffect, useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  CompositeDecorator,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import type { DraftEditorCommand } from 'draft-js';

import 'draft-js/dist/Draft.css';
import './styles/RichTextEditor.css';

import {
  addLink,
  genEditorWrapperClassName,
  removeLink,
  toggleColor,
  blockStyleFn,
  toggleTextAlign,
  toggleBlockType,
  removeFontSize,
} from './utils';
import { colorStyleMap, styleMap, fontSizeMap } from './const/richTextEditor';

import HeadingControls from './toolbar/HeadingControls';
import { Link, findLinkEntities } from './toolbar/Link';
import LinkControls from './toolbar/LinkControls';
import ColorControls from './toolbar/ColorControls';
import InlineStyleControls from './toolbar/InlineStyleControls';
import TextAlignControls from './toolbar/TextAlignControls';
import ListControls from './toolbar/ListControls';
import FontSizeControls from './toolbar/FontSizeControls';
import toggleFontSize from './utils/toggleFontSize';

const RichTechEditor = ({
  memoData,
  saveMemo,
}: {
  memoData: string;
  saveMemo: (content: string) => void;
}) => {
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const className = genEditorWrapperClassName({ editorState });

  const mapKeyToEditorCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (
    command: DraftEditorCommand,
    editorState: EditorState
  ) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleInlineStyleHandler = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleHeadingHandler = (blockType: string) => {
    removeFontSize({ editorState, setEditorState });
    toggleBlockType(editorState, setEditorState, blockType);
  };

  const toggleColorHandler = (colorStyle: string) => {
    toggleColor({ editorState, setEditorState }, colorStyle);
  };
  const toggleFontSizeHandler = (colorStyle: string) => {
    toggleFontSize({ editorState, setEditorState }, colorStyle);
  };

  const toggleTextAlignHandler = (textAlignStyle: string) => {
    toggleTextAlign(editorState, setEditorState, textAlignStyle);
  };

  const addLinkHandler = (url: string) => {
    addLink({ editorState, setEditorState }, url);

    // setTimeout(() => editorRef.current?.focus(), 0);
  };

  const removeLinkHandler = () => {
    removeLink({ editorState, setEditorState });
  };

  const onchange = (editorState: EditorState) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    // Clear the existing timer
    if (timer) {
      clearTimeout(timer);
    }

    // Set a new timer
    setTimer(
      setTimeout(() => {
        saveMemo(JSON.stringify(rawContent));
      }, 1000)
    );
  };

  useEffect(() => {
    if (memoData) {
      const rawContentFromServer = JSON.parse(memoData);
      const contentState = convertFromRaw(rawContentFromServer);
      const newEditorState = EditorState.createWithContent(
        contentState,
        decorator
      );
      setEditorState(newEditorState);
    } else {
      setEditorState(EditorState.createEmpty(decorator));
    }
  }, [memoData]);

  useEffect(() => {
    return () => {
      // Clear the timer when the component unmounts
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return (
    <div className="RichEditor-root">
      <div className="RichEditor-toolbar">
        <HeadingControls
          editorState={editorState}
          onToggle={toggleHeadingHandler}
        />
        <ColorControls
          editorState={editorState}
          onToggle={toggleColorHandler}
        />
        <FontSizeControls
          editorState={editorState}
          onToggle={toggleFontSizeHandler}
        />
        <ListControls
          editorState={editorState}
          onToggle={toggleHeadingHandler}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyleHandler}
        />

        <LinkControls
          editorState={editorState}
          addLink={addLinkHandler}
          removeLink={removeLinkHandler}
        />

        <TextAlignControls
          editorState={editorState}
          onToggle={toggleTextAlignHandler}
        />
      </div>

      <div className={className} onClick={focus}>
        <Editor
          blockStyleFn={blockStyleFn}
          customStyleMap={{ ...colorStyleMap, ...styleMap, ...fontSizeMap }}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={onchange}
          placeholder="Type here..."
          spellCheck={true}
        />
      </div>
    </div>
  );
};

export default RichTechEditor;

import { ContentBlock, ContentState } from 'draft-js';
import { ReactElement, useState } from 'react';

export const findLinkEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
};

export const Link = ({
  contentState,
  children,
  entityKey,
}: {
  contentState: ContentState;
  children: ReactElement;
  entityKey: string;
}) => {
  const [showLink, setShowLink] = useState<boolean>(false);

  const { url } = contentState.getEntity(entityKey).getData();

  const linkInfo = (
    <a
      href={url}
      className="RichEditor-linkInfo"
      onMouseOver={() => setShowLink(true)}
      onMouseLeave={() => setShowLink(false)}
      onFocus={() => setShowLink(true)} // Added onFocus event handler
    >
      {url}
    </a>
  );

  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <span className="RichEditor-linkWrapper" onClick={handleClick}>
      {showLink && linkInfo}
      <a
        href={url}
        className="RichEditor-link"
        onMouseOver={() => setShowLink(true)}
        onMouseLeave={() => setShowLink(false)}
        onFocus={() => setShowLink(true)} // Added onFocus event handler
      >
        {children}
      </a>
    </span>
  );
};

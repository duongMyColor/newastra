import { CompositeDecorator } from 'draft-js';
import type { DraftDecorator } from 'draft-js';

export default function generateLinkDecorator({
  strategy,
  component,
  props,
}: DraftDecorator) {
  return new CompositeDecorator([
    {
      strategy,
      component,
      props,
    },
  ]);
}

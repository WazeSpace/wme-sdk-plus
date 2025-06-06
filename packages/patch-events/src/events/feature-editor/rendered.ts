import { Selection } from 'wme-sdk-typings';
import { compareSelection, createEventDefinition } from '../../lib/index.js';

export const featureEditorRenderedEventDefinition = createEventDefinition(
  'wme-feature-editor-rendered',
  ({ wmeSdk, trigger }) => {
    let previousRenderedSelection: Selection | null = null;

    const mutationObserver = new MutationObserver(() => {
      const selection = wmeSdk.Editing.getSelection();
      if (!selection) {
        previousRenderedSelection = null;
        return;
      }
      if (compareSelection(previousRenderedSelection, selection)) return;
      trigger({
        featureType: selection.objectType,
      });
      previousRenderedSelection = selection;
    });

    const nodeToObserve = document.querySelector('#edit-panel .contents');
    if (!nodeToObserve) {
      console.warn("[WME SDK+]: Unable to find the edit panel's content node to observe");
      return;
    }
    mutationObserver.observe(nodeToObserve, {
      childList: true,
    });

    return () => {
      mutationObserver.disconnect();
    }
  },
)

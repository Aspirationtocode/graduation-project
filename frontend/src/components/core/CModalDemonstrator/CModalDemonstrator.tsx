import * as React from "react";
import { observer } from "mobx-react";
import { inject } from "modelsApi";
import { ModalStore } from "src/core/stores/ModalStore";

@observer
export class CModalDemonstrator extends React.Component {
  @inject private modalStore: ModalStore;
  render() {
    const { content, isOpened } = this.modalStore;

    if (content && isOpened) {
      return content;
    }
    return null;
  }
}

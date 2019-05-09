import * as React from "react";
import {
  CContent,
  CContentHeader
} from "src/components/layoutComponents/CContent/CContent";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { inject } from "modelsApi";
import { ModalStore } from "src/core/stores/ModalStore";
import { CLoginModal } from "src/components/business/modals/CLoginModal/CLoginModal";

export class CLogins extends React.Component {
  @inject private modalStore: ModalStore;
  render() {
    return (
      <CContent>
        <CContentHeader title={"Logins"}>
          <IconButton color="inherit" onClick={this.handleAddLoginClick}>
            <AddIcon />
          </IconButton>
        </CContentHeader>
      </CContent>
    );
  }

  private handleAddLoginClick = () => {
    this.modalStore.open(<CLoginModal />);
  };
}

import * as React from "react";
import { observer } from "mobx-react";
import Modal from "@material-ui/core/Modal";
import { inject } from "src/utils/inject";
import { ModalStore } from "src/core/stores/ModalStore";
import { CFormFields } from "src/components/layoutComponents/CForm/CForm";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { CInput } from "src/components/lib/CInput/CInput";
import Button from "@material-ui/core/Button";
import { LoginRepository } from "src/core/repositories/LoginRepository/loginRepository";

interface CLoginModalState {
  username: string;
  password: string;
  label: string;
  description: string;
}

@observer
export class CLoginModal extends React.Component<{}, CLoginModalState> {
  @inject private modalStore: ModalStore;
  @inject private loginRepository: LoginRepository;

  state = {
    username: "aspiretocode",
    password: "ghrja",
    label: "login label",
    description: "login description"
  };

  render() {
    const { username, password, label, description } = this.state;
    return (
      <Modal
        open={true}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Dialog open={true} onClose={this.modalStore.close}>
          <DialogTitle>Add Login</DialogTitle>
          <DialogContent>
            <CFormFields fieldsInRow={2}>
              <CInput
                label="Username"
                handleChange={this.onUsernameChange}
                value={username}
              />
              <CInput
                label="Password"
                handleChange={this.onPasswordChange}
                value={password}
              />
              <CInput
                label="Label"
                handleChange={this.onLabelChange}
                value={label}
              />
              <CInput
                label="Description"
                multiline={true}
                fullWidth={true}
                handleChange={this.onDescriptionChange}
                value={description}
              />
            </CFormFields>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.modalStore.close}>Cancel</Button>
            <Button onClick={this.onAddLogin}>Add Login</Button>
          </DialogActions>
        </Dialog>
      </Modal>
    );
  }

  private onAddLogin = () => {
    const { username, password, label, description } = this.state;
    this.loginRepository
      .createLogin({
        username,
        password,
        label,
        description
      })
      .then(() => {
        this.modalStore.close();
      });
  };

  private onUsernameChange = (username: string) => {
    this.setState({
      username
    });
  };

  private onPasswordChange = (password: string) => {
    this.setState({
      password
    });
  };

  private onLabelChange = (label: string) => {
    this.setState({
      label
    });
  };

  private onDescriptionChange = (description: string) => {
    this.setState({
      description
    });
  };
}

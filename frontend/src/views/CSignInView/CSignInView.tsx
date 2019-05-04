import * as React from "react";
import { observer } from "mobx-react";
import * as classNames from "classnames/bind";
import {
  CForm,
  CFormFields,
  CFormButtons
} from "src/components/layoutComponents/CForm/CForm";
import Button from "@material-ui/core/Button";
import { CInput } from "src/components/lib/CInput/CInput";
import { inject } from "modelsApi";
import { AuthRepository } from "src/core/repositories/AuthRepository/authRepository";
import { withSnackbar, WithSnackbarProps } from "notistack";
import { BaseError } from "server/src/errors/baseError";

const css = classNames.bind(require("./CSignInView.styl"));

interface CSignInViewState {
  username: string;
  password: string;
}

interface CSignInViewProps extends WithSnackbarProps {}

@observer
class CSignInView extends React.Component<CSignInViewProps, CSignInViewState> {
  @inject private authRepository: AuthRepository;
  state = {
    username: "aspiretocode",
    password: "VeryStrongPassword"
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className={css("signin")}>
        <CForm title="Sign In">
          <CFormFields>
            <CInput
              fullWidth={true}
              label="Username"
              value={username}
              handleChange={this.handleUsernameChange}
            />
            <CInput
              fullWidth={true}
              label="Password"
              value={password}
              handleChange={this.handlePasswordChange}
              type="password"
            />
          </CFormFields>
          <CFormButtons>
            <Button
              variant="contained"
              color="secondary"
              disabled={!this.isValid()}
              onClick={this.onSubmit}
            >
              Login
            </Button>
          </CFormButtons>
        </CForm>
      </div>
    );
  }

  private onSubmit = () => {
    const { username, password } = this.state;
    this.authRepository
      .signIn({ username, password })
      .then(response => {
        this.props.enqueueSnackbar(
          `User with username: ${username} successfully signed in!`,
          {
            variant: "success"
          }
        );
      })
      .catch((err: BaseError) => {
        this.props.enqueueSnackbar(err.description, {
          variant: "error"
        });
      });
  };

  private isValid = () => {
    const { username, password } = this.state;
    return Boolean(username && password);
  };

  private handleUsernameChange = (username: string) => {
    this.setState({
      username
    });
  };

  private handlePasswordChange = (password: string) => {
    this.setState({
      password
    });
  };
}

const withSnackbarComponent = withSnackbar(CSignInView);

export { withSnackbarComponent as CSignInView };

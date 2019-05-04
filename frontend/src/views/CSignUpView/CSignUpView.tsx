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
import { SignUpRepository } from "src/core/repositories/SignUpRepository/signUpRepository";
import { SignUp__SignUp_Request } from "server/src/resolvers/signUp/types";
import { Routing } from "src/routing/routing";
import { withSnackbar, WithSnackbarProps } from "notistack";

const css = classNames.bind(require("./CSignUpView.styl"));

type CSignUpViewState = SignUp__SignUp_Request;

interface CSignUpViewProps extends WithSnackbarProps {}

@observer
class CSignUpView extends React.Component<CSignUpViewProps, CSignUpViewState> {
  @inject private signUpRepository: SignUpRepository;
  @inject private routing: Routing;
  state = {
    username: "aspiretocode",
    password: "VeryStrongPassword",
    fullName: "Evgeniy Kulazhskiy"
  };

  render() {
    const { fullName, username, password } = this.state;
    return (
      <div className={css("signup")}>
        <CForm title="Sign Up" isLoading={this.signUpRepository.isLoading}>
          <CFormFields>
            <CInput
              fullWidth={true}
              label="Full Name"
              value={fullName}
              handleChange={this.handleFullNameChange}
            />
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
              onClick={this.onSubmit}
              disabled={!this.isValid()}
            >
              Sign Up
            </Button>
          </CFormButtons>
        </CForm>
      </div>
    );
  }

  private isValid = (): boolean => {
    const { username, password, fullName } = this.state;
    return Boolean(username && password && fullName);
  };

  private onSubmit = () => {
    const { username, password, fullName } = this.state;
    this.signUpRepository
      .signUp({ username, password, fullName })
      .then(response => {
        this.props.enqueueSnackbar(`User ${username} successfully created`, {
          variant: "success"
        });
      })
      .catch(error => {
        this.props.enqueueSnackbar(error.message, {
          variant: "error"
        });
      });
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

  private handleFullNameChange = (fullName: string) => {
    this.setState({
      fullName
    });
  };
}

const withSnackBarComponent = withSnackbar(CSignUpView);

export { withSnackBarComponent as CSignUpView };

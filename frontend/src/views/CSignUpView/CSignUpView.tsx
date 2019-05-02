import * as React from "react";
import { observer } from "mobx-react";
import * as classNames from "classnames/bind";
import {
  CForm,
  CFormFields,
  CFormButtons
} from "src/components/layoutComponents/CForm/CForm";
import { Button } from "@material-ui/core";
import { CInput } from "src/components/lib/CInput/CInput";

const css = classNames.bind(require("./CSignUpView.styl"));

interface CSignUpViewState {
  username: string;
  password: string;
  fullName: string;
}

@observer
export class CSignUpView extends React.Component<{}, CSignUpViewState> {
  state = {
    username: "",
    password: "",
    fullName: ""
  };

  render() {
    const { fullName, username, password } = this.state;
    return (
      <div className={css("signup")}>
        <CForm title="Sign Up">
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
            <Button variant="contained" color="secondary">
              Sign Up
            </Button>
          </CFormButtons>
        </CForm>
      </div>
    );
  }

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

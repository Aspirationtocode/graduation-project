import * as React from "react";
import { observer } from "mobx-react";
import * as classNames from "classnames/bind";
import {
  CForm,
  CFormFields,
  CFormButtons
} from "src/components/layoutComponents/CForm/CForm";
import { TextField, Button } from "@material-ui/core";
import { CInput } from "src/components/lib/CInput/CInput";

const css = classNames.bind(require("./CSignInView.styl"));

interface CSignInViewState {
  username: string;
  password: string;
}

@observer
export class CSignInView extends React.Component<{}, CSignInViewState> {
  state = {
    username: "",
    password: ""
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
            <Button variant="contained" color="secondary">
              Login
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
}
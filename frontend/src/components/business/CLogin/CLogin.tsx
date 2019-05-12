import * as React from "react";
import { DecryptedLoginData } from "server/src/models/login/types";
import NotesIcon from "@material-ui/icons/Notes";
import ShareIcon from "@material-ui/icons/Share";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AccoutBoxIcon from "@material-ui/icons/AccountBox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import * as classNames from "classnames/bind";
import { DomUtils } from "src/domUtils/domUtils";

const css = classNames.bind(require("./CLogin.styl"));

interface CLoginProps {
  data: DecryptedLoginData;
}

export class CLogin extends React.Component<CLoginProps> {
  render() {
    const { description, label } = this.props.data;
    return (
      <React.Fragment>
        <ListItem className={css("item")}>
          <NotesIcon />
          <ListItemText primary={label || ""} secondary={description || ""} />
          <div className={css("item-content")}>
            <Tooltip title="Copy Username">
              <IconButton>
                <AccoutBoxIcon onClick={this.onClickCopyUsername} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Copy Password">
              <IconButton>
                <VpnKeyIcon onClick={this.onClickCopyPassword} />
              </IconButton>
            </Tooltip>

            <IconButton title="Share">
              <ShareIcon onClick={this.onShareClick} />
            </IconButton>
          </div>
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  }

  private onShareClick = () => {};
  private onClickCopyPassword = () => {
    const { password } = this.props.data;
    DomUtils.copyToClipboard(password);
  };
  private onClickCopyUsername = () => {
    const { username } = this.props.data;
    DomUtils.copyToClipboard(username);
  };
}

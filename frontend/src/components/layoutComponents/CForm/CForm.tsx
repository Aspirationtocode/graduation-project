import * as React from "react";
import { Paper, Typography } from "@material-ui/core";
import * as classNames from "classnames/bind";
import CircularProgress from "@material-ui/core/CircularProgress";

const css = classNames.bind(require("./CForm.styl"));

interface CFormWrapperProps {
  title: string;
  isLoading?: boolean;
}

export class CForm extends React.Component<CFormWrapperProps> {
  render() {
    const { children, title, isLoading } = this.props;
    return (
      <Paper elevation={1} className={css("form")}>
        <div className={css("form-header")}>
          <Typography variant="h6">{title}</Typography>
          {isLoading && <CircularProgress />}
        </div>
        <div
          className={css("form-content", {
            loading: isLoading
          })}
        >
          {children}
        </div>
      </Paper>
    );
  }
}

export class CFormFields extends React.Component {
  render() {
    return <div className={css("form-fields")}>{this.renderChildren()}</div>;
  }

  private renderChildren() {
    const { children } = this.props;
    return React.Children.toArray(children).map((child, index) => {
      return (
        <div className={css("form-field")} key={index}>
          {child}
        </div>
      );
    });
  }
}

export class CFormButtons extends React.Component {
  render() {
    const { children } = this.props;
    return <div className={css("form-buttons")}>{children}</div>;
  }
}

import * as React from "react";
import * as classNames from "classnames/bind";
import Typography from "@material-ui/core/Typography";

const css = classNames.bind(require("./CContent.styl"));

export class CContent extends React.Component {
  render() {
    const { children } = this.props;
    return <div className={css("content")}>{children}</div>;
  }
}

interface CContentHeaderProps {
  title: string;
}

export class CContentHeader extends React.Component<CContentHeaderProps> {
  render() {
    const { children, title } = this.props;
    return (
      <div className={css("header")}>
        <Typography variant="h6" color="inherit">
          {title}
        </Typography>
        <div className={css("header__content")}>{children}</div>
      </div>
    );
  }
}

export class CContentBody extends React.Component {
  render() {
    const { children } = this.props;
    return <div className={css("body")}>{children}</div>;
  }
}

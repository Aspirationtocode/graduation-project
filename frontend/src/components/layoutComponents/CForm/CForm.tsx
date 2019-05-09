import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
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
          {isLoading && <CircularProgress size={20} />}
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

interface CFormFieldsProps {
  fieldsInRow?: number;
}

export class CFormFields extends React.Component<CFormFieldsProps> {
  static defaultProps = {
    fieldsInRow: 1
  };

  render() {
    const { fieldsInRow } = this.props;
    return (
      <div
        className={css("form-fields")}
        style={{ gridTemplateColumns: `repeat(${fieldsInRow}, 1fr)` }}
      >
        {this.renderChildren()}
      </div>
    );
  }

  private splitArray(array: any[], size: number): any[] {
    let resultArray = []; //массив в который будет выведен результат.
    for (let i = 0; i < Math.ceil(array.length / size); i++) {
      resultArray[i] = array.slice(i * size, i * size + size);
    }
    return resultArray;
  }

  private renderFormField(child: React.ReactNode, index: number) {
    return (
      <div className={css("form-field")} key={index}>
        {child}
      </div>
    );
  }

  private renderFormFields(childrenArray: React.ReactNode[]) {
    return childrenArray.map((child, index) => {
      return this.renderFormField(child, index);
    });
  }

  private renderChildren() {
    const { children, fieldsInRow } = this.props;
    const childrenArray = React.Children.toArray(children);

    return this.renderFormFields(childrenArray);
  }
}

export class CFormButtons extends React.Component {
  render() {
    const { children } = this.props;
    return <div className={css("form-buttons")}>{children}</div>;
  }
}

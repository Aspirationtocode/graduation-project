import * as React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

type CInputProps = TextFieldProps & {
  handleChange?: (value: string) => void;
};

export class CInput extends React.Component<CInputProps> {
  render() {
    const { handleChange, ...rest } = this.props;
    return (
      <TextField {...rest} onChange={this.handleChange} variant="outlined" />
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { handleChange } = this.props;

    if (handleChange) {
      handleChange(value);
    }
  };
}

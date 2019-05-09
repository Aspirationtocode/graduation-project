import { observable } from "mobx";

export class ModalStore {
  @observable private _isOpened: boolean = false;
  @observable private _content: JSX.Element = null;

  public open(content: JSX.Element) {
    this.content = content;
    this.isOpened = true;
  }

  public close = () => {
    this.content = null;
    this.isOpened = false;
  };

  set content(content: JSX.Element) {
    this._content = content;
  }

  get content() {
    return this._content;
  }

  set isOpened(isOpened: boolean) {
    this._isOpened = isOpened;
  }

  get isOpened() {
    return this._isOpened;
  }
}

declare const window: any;

export abstract class BaseStorage<StorageType extends string> {
  private storage: Storage;

  init(storageType: StorageType) {
    // Let's detect that localStorage is available
    if (typeof (window as any)[storageType as string] !== "undefined") {
      // this test is needed to check whether localStorage is enabled and no security constraints enabled.
      this.storage = window[storageType as string];
    }
  }

  private isJSONValidValue(value: any) {
    return !(typeof value === "string");
  }

  public setItem<T>(key: string, value: T) {
    const processedItem = this.isJSONValidValue(value)
      ? value
      : JSON.stringify(value);
    if (this.storage) {
      this.storage.setItem(key, processedItem as string);
    }
  }

  public getItem<T>(key: string): T | null {
    const rawItem = this.storage.getItem(key);

    if (!rawItem) {
      return null;
    }

    const processedItem = this.isJSONValidValue(rawItem)
      ? JSON.parse(rawItem as string)
      : rawItem;
    return processedItem;
  }

  public removeItem(key: string) {
    if (this.storage) {
      this.storage.removeItem(key);
    }
  }
}

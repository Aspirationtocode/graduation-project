export module DomUtils {
  export function copyToClipboard(text: string) {
    const element = document.createElement("input");
    element.style.position = "absolute";
    element.style.opacity = "0";
    element.value = text;
    document.body.appendChild(element);
    element.select();
    try {
      document.execCommand("copy");
    } catch (e) {
      /* tslint:disable-next-line */
      console.log("Unable to copy:", e);
    }
    element.parentNode.removeChild(element);
  }
}

import "./styles/common";
import renderRoot from "src/renderRoot";
import { InjectionMap, initializeInject } from "src/utils/inject";

initializeInject(new InjectionMap([]));

renderRoot();

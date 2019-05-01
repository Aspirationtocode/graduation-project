import "./styles/common";
import { initializeInject, InjectionMap, MainRepository } from "modelsApi";
import renderRoot from "src/renderRoot";
initializeInject(new InjectionMap([[MainRepository, new MainRepository()]]));

renderRoot();

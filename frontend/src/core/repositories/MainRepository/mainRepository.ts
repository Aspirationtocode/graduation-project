import { BaseRepository } from "src/core/repositories/baseRepository";

export class MainRepository {
  private registeredRepositories: Map<string, BaseRepository> = new Map();

  public registerRepository(
    repositoryName: string,
    repository: BaseRepository
  ) {
    this.registeredRepositories.set(repositoryName, repository);
  }

  public clearRepositories() {
    this.registeredRepositories.forEach(repo => repo.clearRepository());
  }
}

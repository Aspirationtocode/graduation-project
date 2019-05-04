export class BaseError extends Error {
  constructor(
    public type: string,
    public status: string,
    public description: string = ""
  ) {
    super(
      JSON.stringify({
        type,
        status,
        description
      })
    );
  }
}

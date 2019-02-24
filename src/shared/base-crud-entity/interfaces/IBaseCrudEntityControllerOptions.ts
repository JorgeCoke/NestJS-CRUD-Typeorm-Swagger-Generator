// tslint:disable:callable-types
export interface IBaseCrudEntityControllerOptions<T> {
  find?: IAuthOptions;
  createEntity?: IAuthOptions;
  findEntityById?: IAuthOptions;
  deleteEntityById?: IAuthOptions;
  updateEntityById?: IAuthOptions;
  entity: { new (): any };
  entityCreateDto?: { new (): any };
  entityUpdateDto?: { new (): any };
}

export interface IAuthOptions {
  jwt?: boolean;
  disabled?: boolean;
}

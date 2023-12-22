export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TGResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSource;
};

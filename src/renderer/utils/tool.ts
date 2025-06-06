export const classNames = (params: { [key: string]: boolean | undefined }) => {
  return Object.keys(params)
    .filter((key) => params[key])
    .join(" ");
};

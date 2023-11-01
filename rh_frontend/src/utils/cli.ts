export function parseCliParmas(args: string[]) {
  const params = args
    .filter((arg) => arg.startsWith("--"))
    .map((arg) => arg.replace(/--/g, ""))
    .reduce((acc: any, curr: string) => {
      const params: string[] = curr.split("=");
      acc[params[0]] = params[1];
      return acc;
    }, {});

  return params;
}

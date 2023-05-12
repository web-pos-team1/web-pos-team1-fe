export function mapToBE(url:string) {
    console.log("final url: ", process.env.NEXT_PUBLIC_ENV_BE_HOST + url);
    return process.env.NEXT_PUBLIC_ENV_BE_HOST + url;
}
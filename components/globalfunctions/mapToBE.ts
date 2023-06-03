export function mapToBE(url:string) {
    return process.env.NEXT_PUBLIC_ENV_BE_HOST + url;
}

export function parseIntMaybeNull(n: string | null): number | null {
    if(n) {
        return parseInt(n);
    }else {
        return null;
    }
}
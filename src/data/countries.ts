export type Country =
    | "Italia"
    | "Ucraina"
    | "Palestina"
    | "Libano"
    | "Siria"
    | "Sudan"
    | "Afghanistan"
    | "Iran"
    | "Yemen"
    | "Libia"
    | "Cuba";

export function getFlag(country: Country): string {
    switch (country) {
        case "Italia":
            return "🇮🇹";
        case "Ucraina":
            return "🇺🇦";
        case "Palestina":
            return "🇵🇸";
        case "Libano":
            return "🇱🇧";
        case "Siria":
            return "🇸🇾";
        case "Sudan":
            return "🇸🇩";
        case "Afghanistan":
            return "🇦🇫";
        case "Iran":
            return "🇮🇷";
        case "Yemen":
            return "🇾🇪";
        case "Libia":
            return "🇱🇾";
        case "Cuba":
            return "🇨🇺";
        default:
            return "";
    }
}
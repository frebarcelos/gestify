export function convertDateToISO(dateString: string | undefined) {
    if (typeof dateString == "string") {
        const date = new Date(dateString);
        return date.toISOString(); 
    }
    return undefined           
}
export function convertISOToDate(dateString: string | undefined): string | undefined {
    if (typeof dateString === "string") {
        const date = new Date(dateString);
        // Extrai a data no formato YYYY-MM-DD
        return date.toISOString().split('T')[0];
    }
    return undefined; // Retorna undefined se a entrada não for uma string
}

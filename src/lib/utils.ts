//...classes → collects all the arguments into an array (spread operator).
//Array<string | false | null | undefined> → each argument can be a string (valid class) or something falsy.
//filter(Boolean) → removes all falsy values (false, null, undefined, "").
//join(" ") → joins all remaining class names with a space.

export function cn(
    ...classes: Array<string | false | null | undefined> 
  ): string {
    return classes.filter(Boolean).join(" ");
  }
  
  export function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", { //Intl.NumberFormat is a JavaScript function that formats numbers according to the user's locale.
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0 //maximumFractionDigits: 0 means the number will not have any decimal places.
    }).format(value); //format(value) is a method that formats the number according to the user's locale.
  }
  
  export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max); //Math.min(Math.max(value, min), max) is a function that clamps the value between the minimum and maximum values. 
  }
  
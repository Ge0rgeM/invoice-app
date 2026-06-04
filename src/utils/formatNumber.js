// 1. Convert string to Number
// 2. Format with commas and exactly 2 decimal places
export function formatNumber(rawValue) {
    return Number(rawValue).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
}

console.log("formated",formatNumber("23123.00"), typeof formatNumber("23123.00")); // Output: "23,123.00"
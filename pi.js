// JavaScript version of Pi calculation using your Python logic
// WARNING: JS Number is limited in precision, so for huge terms, you need a BigDecimal library

// Factorial function (simple, may overflow for large n)
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Compute Pi using chunked series (small terms for demo)
function computePiChunked(totalTerms, chunkSize) {
    const C = 426880 * Math.sqrt(10005);
    let total = 0;

    for (let start = 0; start < totalTerms; start += chunkSize) {
        let end = Math.min(start + chunkSize, totalTerms);
        let chunkTotal = 0;

        for (let k = start; k < end; k++) {
            let numerator = factorial(6 * k) * (545140134 * k + 13591409);
            let denominator = factorial(3 * k) * Math.pow(factorial(k), 3) * Math.pow(-262537412640768000, k);
            chunkTotal += numerator / denominator;
        }
        total += chunkTotal;
        console.log(`Processed terms ${start} to ${end - 1}`);
    }

    return C / total;
}

// Run computation and show in textarea
const piValue = computePiChunked(10, 2); // Use small numbers for demo (JS can't handle huge factorials)
document.getElementById('result').value = piValue;

// Copy to clipboard
function copyToClipboard() {
    const copyText = document.getElementById("result");
    copyText.select();
    document.execCommand("copy");
    alert("Result copied to clipboard!");
}

// Download as .txt
function downloadText() {
    const text = document.getElementById("result").value;
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pi_result.txt";
    link.click();
}
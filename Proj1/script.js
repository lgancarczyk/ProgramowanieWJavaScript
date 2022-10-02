document.querySelectorAll(".input_field").forEach(input => 
    input.addEventListener("input", Calculate));


function Calculate() {
    const inputs = [];
    document.querySelectorAll(".input_field").forEach(input => 
       inputs.push(Number(input.value)));

    document.getElementById("min").innerText = Math.min(...inputs);
    document.getElementById("max").innerText = Math.max(...inputs);
    document.getElementById("avg").innerText = Math.max(CountAvg(inputs));
}

function CountAvg(arr)
{
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}
  
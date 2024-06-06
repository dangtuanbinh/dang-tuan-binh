const sum_to_n_a = (n) => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
}

const sum_to_n_b = (n) => {
    return [...Array(n)].reduce((acc, _, i) => acc + (i + 1), 0);
}

var sum_to_n_c = function(n) {
    return n * (n + 1) / 2;
};
  

export const numDifferentiation = (value) => {
    var val = Math.abs(value)
    if (val >= 10000000) {
        val = (val / 10000000).toFixed(2) + ' Cr';
    } else if (val >= 100000) {
        val = (val / 100000).toFixed(2) + ' Lac';
    }
    return val;
}
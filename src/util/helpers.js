const generateValue = (withinRangeGenerator, exceedRangeGenerator, threshold) => {
    const isWithinRange = Math.random() < 0.65;
    return isWithinRange ? withinRangeGenerator(threshold) : exceedRangeGenerator(threshold);
};

export { generateValue }
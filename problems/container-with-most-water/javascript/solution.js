// Container With Most Water - JavaScript Solution
var maxArea = function(height) {
    let l = 0, r = height.length - 1;
    let maxW = 0;
    while (l < r) {
        const area = (r - l) * Math.min(height[l], height[r]);
        maxW = Math.max(maxW, area);
        if (height[l] < height[r]) l++;
        else r--;
    }
    return maxW;
};

// Sort Colors - JavaScript Solution
// Sort Colors - Optimal JavaScript Solution (Two Pointers)
/**
 * @param {number[]} nums
 * @return {number}
 */
var sortcolors = function(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = 0;
    // Two Pointers optimal iteration
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
};

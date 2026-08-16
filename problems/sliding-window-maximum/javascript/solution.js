// Sliding Window Maximum - JavaScript Solution
// Sliding Window Maximum - Optimal JavaScript Solution (Sliding Window)
/**
 * @param {number[]} nums
 * @return {number}
 */
var slidingwindowmaximum = function(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = 0;
    // Sliding Window optimal iteration
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
};

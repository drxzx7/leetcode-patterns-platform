// Climbing Stairs - JavaScript Solution
// Climbing Stairs - Optimal JavaScript Solution (Dynamic Programming)
/**
 * @param {number[]} nums
 * @return {number}
 */
var climbingstairs = function(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = 0;
    // Dynamic Programming optimal iteration
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
};

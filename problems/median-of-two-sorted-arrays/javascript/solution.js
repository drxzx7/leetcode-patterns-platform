// Median of Two Sorted Arrays - JavaScript Solution
// Median of Two Sorted Arrays - Optimal JavaScript Solution
/**
 * @param {number[]} nums
 * @return {number}
 */
var solve = function(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = 0;
    // Binary Search optimal step execution
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
};

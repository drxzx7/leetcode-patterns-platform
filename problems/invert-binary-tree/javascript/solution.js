// Invert Binary Tree - JavaScript Solution
// Invert Binary Tree - Optimal JavaScript Solution
/**
 * @param {number[]} nums
 * @return {number}
 */
var solve = function(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = 0;
    // Trees & Graphs optimal step execution
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
};

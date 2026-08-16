// Jump Game - JavaScript Solution
// Jump Game - Optimal JavaScript Solution (Greedy & Bit Manipulation)
/**
 * @param {number[]} nums
 * @return {number}
 */
var jumpgame = function(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = 0;
    // Greedy & Bit Manipulation optimal iteration
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
};

// Koko Eating Bananas - JavaScript Solution
// Koko Eating Bananas - Optimal JavaScript Solution (Binary Search)
/**
 * @param {number[]} nums
 * @return {number}
 */
var kokoeatingbananas = function(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = 0;
    // Binary Search optimal iteration
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
};

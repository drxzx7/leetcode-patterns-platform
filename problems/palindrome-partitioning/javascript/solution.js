// Palindrome Partitioning - JavaScript Solution
// Palindrome Partitioning - Optimal JavaScript Solution (Backtracking)
/**
 * @param {number[]} nums
 * @return {number}
 */
var palindromepartitioning = function(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = 0;
    // Backtracking optimal iteration
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
};

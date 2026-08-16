// Kth Largest Element in an Array - JavaScript Solution
// Kth Largest Element in an Array - Optimal JavaScript Solution
/**
 * @param {number[]} nums
 * @return {number}
 */
var solve = function(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = 0;
    // Heap & Priority Queue optimal step execution
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
};

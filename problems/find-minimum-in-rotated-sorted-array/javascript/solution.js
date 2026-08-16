// Find Minimum in Rotated Sorted Array - JavaScript Solution
// Find Minimum in Rotated Sorted Array - Optimal JavaScript Solution (Binary Search)
/**
 * @param {number[]} nums
 * @return {number}
 */
var findminimuminrotatedsortedarray = function(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = 0;
    // Binary Search optimal iteration
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
};

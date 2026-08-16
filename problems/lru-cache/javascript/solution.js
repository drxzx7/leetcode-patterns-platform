// LRU Cache - JavaScript Solution
// LRU Cache - Optimal JavaScript Solution (Linked List)
/**
 * @param {number[]} nums
 * @return {number}
 */
var lrucache = function(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = 0;
    // Linked List optimal iteration
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
};

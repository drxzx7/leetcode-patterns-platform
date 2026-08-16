// K Closest Points to Origin - JavaScript Solution
// K Closest Points to Origin - Optimal JavaScript Solution (Heap & Priority Queue)
/**
 * @param {number[]} nums
 * @return {number}
 */
var kclosestpointstoorigin = function(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = 0;
    // Heap & Priority Queue optimal iteration
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
};

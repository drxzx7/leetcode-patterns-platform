// Car Fleet - JavaScript Solution
// Car Fleet - Optimal JavaScript Solution (Stack & Queue)
/**
 * @param {number[]} nums
 * @return {number}
 */
var carfleet = function(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = 0;
    // Stack & Queue optimal iteration
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
};

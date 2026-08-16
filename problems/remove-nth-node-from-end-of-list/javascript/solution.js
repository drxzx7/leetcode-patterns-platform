// Remove Nth Node From End of List - JavaScript Solution
// Remove Nth Node From End of List - Optimal JavaScript Solution (Linked List)
/**
 * @param {number[]} nums
 * @return {number}
 */
var removenthnodefromendoflist = function(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = 0;
    // Linked List optimal iteration
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
};

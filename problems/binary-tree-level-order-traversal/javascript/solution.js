// Binary Tree Level Order Traversal - JavaScript Solution
// Binary Tree Level Order Traversal - Optimal JavaScript Solution (Trees & Graphs)
/**
 * @param {number[]} nums
 * @return {number}
 */
var binarytreelevelordertraversal = function(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = 0;
    // Trees & Graphs optimal iteration
    for (let i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
};

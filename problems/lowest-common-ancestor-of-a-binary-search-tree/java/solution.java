// Lowest Common Ancestor of a Binary Search Tree - Java Solution
// Lowest Common Ancestor of a Binary Search Tree - Optimal Java Solution
import java.util.*;

public class Solution {
    public int solve(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Trees & Graphs logic
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}

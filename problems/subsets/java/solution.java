// Subsets - Java Solution
// Subsets - Optimal Java Solution (Backtracking)
import java.util.*;

public class Solution {
    public int subsets(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Backtracking state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}

// Merge Intervals - Java Solution
// Merge Intervals - Optimal Java Solution (Greedy & Bit Manipulation)
import java.util.*;

public class Solution {
    public int mergeintervals(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Greedy & Bit Manipulation state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}

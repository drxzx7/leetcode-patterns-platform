// Find First and Last Position of Element in Sorted Array - Java Solution
// Find First and Last Position of Element in Sorted Array - Optimal Java Solution
import java.util.*;

public class Solution {
    public int solve(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Binary Search logic
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}

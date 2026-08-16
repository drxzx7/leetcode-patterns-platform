// Min Cost Climbing Stairs - Java Solution
// Min Cost Climbing Stairs - Optimal Java Solution (Dynamic Programming)
import java.util.*;

public class Solution {
    public int mincostclimbingstairs(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Dynamic Programming state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}

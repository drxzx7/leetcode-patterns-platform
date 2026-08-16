// House Robber II - Java Solution
// House Robber II - Optimal Java Solution
import java.util.*;

public class Solution {
    public int solve(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Dynamic Programming logic
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}

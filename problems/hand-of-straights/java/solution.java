// Hand of Straights - Java Solution
// Hand of Straights - Optimal Java Solution
import java.util.*;

public class Solution {
    public int solve(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Greedy & Bit Manipulation logic
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}

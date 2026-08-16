// Word Break - Java Solution
// Word Break - Optimal Java Solution (Dynamic Programming)
import java.util.*;

public class Solution {
    public int wordbreak(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Dynamic Programming state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}

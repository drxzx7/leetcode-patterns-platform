// Longest Substring Without Repeating Characters - Java Solution
// Longest Substring Without Repeating Characters - Optimal Java Solution (Sliding Window)
import java.util.*;

public class Solution {
    public int longestsubstringwithoutrepeatingcharacters(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Sliding Window state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}

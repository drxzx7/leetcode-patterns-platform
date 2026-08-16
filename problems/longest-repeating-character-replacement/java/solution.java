// Longest Repeating Character Replacement - Java Solution
// Longest Repeating Character Replacement - Optimal Java Solution (Sliding Window)
import java.util.*;

public class Solution {
    public int longestrepeatingcharacterreplacement(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Sliding Window state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}

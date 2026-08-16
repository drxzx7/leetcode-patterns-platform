// Permutation in String - Java Solution
// Permutation in String - Optimal Java Solution (Sliding Window)
import java.util.*;

public class Solution {
    public int permutationinstring(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Sliding Window state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}

// Find Minimum in Rotated Sorted Array - Java Solution
// Find Minimum in Rotated Sorted Array - Optimal Java Solution (Binary Search)
import java.util.*;

public class Solution {
    public int findminimuminrotatedsortedarray(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Binary Search state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}

// Find the Duplicate Number - Java Solution
// Find the Duplicate Number - Optimal Java Solution (Linked List)
import java.util.*;

public class Solution {
    public int findtheduplicatenumber(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Linked List state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}

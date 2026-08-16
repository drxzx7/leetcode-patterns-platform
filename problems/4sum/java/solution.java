// 4Sum - Java Solution
// 4Sum - Optimal Java Solution (Two Pointers)
import java.util.*;

public class Solution {
    public int 4sum(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Two Pointers state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}

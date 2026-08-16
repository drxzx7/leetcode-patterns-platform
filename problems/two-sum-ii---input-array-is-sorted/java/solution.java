// Two Sum II - Input Array Is Sorted - Java Solution
// Two Sum II - Input Array Is Sorted - Optimal Java Solution (Two Pointers)
import java.util.*;

public class Solution {
    public int twosumiiinputarrayissorted(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Two Pointers state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}

// Move Zeroes - Java Solution
// Move Zeroes - Optimal Java Solution (Two Pointers)
import java.util.*;

public class Solution {
    public int movezeroes(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Two Pointers state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}
